# Deployment Guide

This project uses **GitHub Actions** for CI/CD, deploying to **Cloudflare Pages** (root-config) and **Cloudflare R2** (MFE bundles).

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         GitHub Actions                           │
├─────────────────┬─────────────────┬─────────────────┬───────────┤
│  root-config    │    shared       │    navbar       │   main    │
│  workflow       │    workflow     │    workflow     │  content  │
└────────┬────────┴────────┬────────┴────────┬────────┴─────┬─────┘
         │                 │                 │              │
         ▼                 ▼                 ▼              ▼
┌─────────────────┐  ┌──────────────────────────────────────────┐
│ Cloudflare      │  │           Cloudflare R2                  │
│ Pages           │  │  portfolio-mfe-assets bucket             │
│                 │  │  ├── shared/portfolio-shared.js          │
│ index.html      │  │  ├── navbar/portfolio-navbar.js          │
│ root-config.js  │  │  └── main-content/portfolio-main.js      │
└────────┬────────┘  └──────────────────┬───────────────────────┘
         │                              │
         └──────────────┬───────────────┘
                        ▼
              ┌─────────────────┐
              │  Cloudflare CDN │
              │  portfolio.dev  │
              └─────────────────┘
```

## Pipeline Triggers

| Workflow                  | Triggers On                                        | Deploys To               |
| ------------------------- | -------------------------------------------------- | ------------------------ |
| `deploy-root-config.yml`  | `packages/root-config/**`                          | Cloudflare Pages         |
| `deploy-shared.yml`       | `packages/shared/**`                               | R2 + triggers dependents |
| `deploy-navbar.yml`       | `packages/navbar/**` OR `packages/shared/**`       | R2                       |
| `deploy-main-content.yml` | `packages/main-content/**` OR `packages/shared/**` | R2                       |

## Initial Setup

### 1. Create Cloudflare Resources

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create R2 bucket for MFE assets
wrangler r2 bucket create portfolio-mfe-assets

# Create Cloudflare Pages project (first deployment will create it)
# Or create manually in Cloudflare dashboard
```

### 2. Configure Custom Domain for R2

1. Go to Cloudflare Dashboard → R2 → your bucket
2. Click "Settings" → "Public access"
3. Add custom domain: `assets.portfolio.dev`
4. Enable public access

### 3. Set GitHub Secrets

Go to your GitHub repo → Settings → Secrets and variables → Actions

Add these secrets:

| Secret                  | Description                           | How to Get                                      |
| ----------------------- | ------------------------------------- | ----------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | API token with R2 + Pages permissions | Cloudflare Dashboard → My Profile → API Tokens  |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID            | Cloudflare Dashboard → Overview (right sidebar) |

**API Token Permissions Required:**

- Account: Cloudflare Pages (Edit)
- Account: R2 (Edit)

### 4. Update CDN Base URL

In `.github/workflows/deploy-root-config.yml`, the build step uses `CDN_BASE_URL`:

```yaml
- name: Build root-config
  run: npm run build --workspace=@portfolio/root-config
  env:
    CDN_BASE_URL: https://teofe.dev
```

Update this to match your R2 custom domain.

## Manual Deployment

You can manually trigger any workflow from GitHub:

1. Go to Actions tab
2. Select the workflow
3. Click "Run workflow"

## Local Development

```bash
# Install dependencies
npm install

# Start all MFEs in parallel
npm run dev

# Access at http://localhost:9000
```

## Production Build

```bash
# Build all packages
npm run build

# Build individual packages
npm run build --workspace=@portfolio/root-config
npm run build --workspace=@portfolio/navbar
```

## Environment Variables

| Variable       | Used In           | Description                                |
| -------------- | ----------------- | ------------------------------------------ |
| `CDN_BASE_URL` | root-config build | Base URL for MFE assets (R2 custom domain) |

## Rollback

To rollback a deployment:

1. Go to GitHub → Actions
2. Find the last successful deployment
3. Re-run that workflow

Or redeploy from a specific commit:

```bash
git checkout <commit-sha>
# Trigger workflow manually
```

## Cache Invalidation

Cloudflare CDN caches assets. To invalidate:

```bash
# Via Wrangler
wrangler pages deployment delete <deployment-id>

# Or via API
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"files":["https://teofe.dev/navbar/portfolio-navbar.js"]}'
```

## Monitoring

- **Cloudflare Analytics**: Dashboard → Analytics
- **GitHub Actions**: Repo → Actions (deployment logs)
- **R2 Metrics**: Dashboard → R2 → bucket → Metrics
