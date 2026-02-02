# Deployment Guide

This project uses **GitHub Actions** for CI/CD, deploying to **Cloudflare Pages** (root-config) and **Cloudflare R2** (MFE bundles).

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           GitHub Actions                                 │
├──────────────────┬──────────────────┬──────────────────┬────────────────┤
│   root-config    │     shared       │     navbar       │  main-content  │
│    workflow      │    workflow      │    workflow      │    workflow    │
└────────┬─────────┴────────┬─────────┴────────┬─────────┴───────┬────────┘
         │                  │                  │                 │
         ▼                  ▼                  ▼                 ▼
┌─────────────────┐  ┌────────────────────────────────────────────────────┐
│  Cloudflare     │  │              Cloudflare R2                         │
│  Pages          │  │         portfolio-mfe-assets bucket                │
│                 │  │                                                    │
│  teofe.dev      │  │  assets.teofe.dev                                  │
│  ├── index.html │  │  ├── shared/portfolio-shared.js                    │
│  └── root.js    │  │  ├── navbar/portfolio-navbar.js                    │
│                 │  │  └── main-content/portfolio-main-content.js        │
└────────┬────────┘  └──────────────────────┬─────────────────────────────┘
         │                                  │
         └──────────────┬───────────────────┘
                        ▼
              ┌─────────────────┐
              │  Cloudflare CDN │
              │   (automatic)   │
              └─────────────────┘
```

## Pipeline Triggers

| Workflow                  | Triggers On                                        | Deploys To       |
| ------------------------- | -------------------------------------------------- | ---------------- |
| `deploy-root-config.yml`  | `packages/root-config/**`                          | Cloudflare Pages |
| `deploy-shared.yml`       | `packages/shared/**`                               | R2               |
| `deploy-navbar.yml`       | `packages/navbar/**` OR `packages/shared/**`       | R2               |
| `deploy-main-content.yml` | `packages/main-content/**` OR `packages/shared/**` | R2               |

When `packages/shared/**` changes, **three workflows run in parallel**: shared, navbar, and main-content.

## Initial Setup

### 1. Create Cloudflare Resources

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create R2 bucket for MFE assets
wrangler r2 bucket create portfolio-mfe-assets
```

The Cloudflare Pages project is auto-created on first deployment.

### 2. Configure R2 Custom Domain

1. Go to **Cloudflare Dashboard** → **R2** → `portfolio-mfe-assets`
2. Click **Settings** → **Custom Domains**
3. Add: `assets.teofe.dev` (or your subdomain)
4. Wait for DNS propagation

### 3. Set GitHub Secrets

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**

| Secret                  | Description                         | Where to Find                                                   |
| ----------------------- | ----------------------------------- | --------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | API token with required permissions | Cloudflare Dashboard → My Profile → API Tokens                  |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID          | Cloudflare Dashboard → any page → right sidebar                 |
| `CLOUDFLARE_ZONE_ID`    | Zone ID for your domain             | Cloudflare Dashboard → select domain → Overview → right sidebar |

### 4. API Token Permissions

Create an API token with these permissions:

**Account Permissions:**

- Cloudflare Pages: Edit
- Workers R2 Storage: Edit

**Zone Permissions (for your domain):**

- Cache Purge: Purge

## Cache Strategy

### Cache-Control Headers

MFE bundles are uploaded with:

```
Cache-Control: public, max-age=0, must-revalidate
```

This tells browsers to always revalidate with the CDN, ensuring fresh content while still benefiting from caching when content hasn't changed.

### Automatic Cache Purge

Each workflow automatically purges the Cloudflare CDN cache after deployment:

```yaml
- name: Purge Cloudflare Cache
  run: |
    curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
      -H "Authorization: Bearer $API_TOKEN" \
      --data '{"files":["https://assets.teofe.dev/navbar/portfolio-navbar.js"]}'
```

### Result

- **CDN cache**: Purged on each deploy
- **Browser cache**: Always revalidates (gets fresh content immediately)
- **No manual cache clearing needed**

## Manual Deployment

Trigger any workflow manually:

1. Go to **GitHub** → **Actions** tab
2. Select the workflow
3. Click **"Run workflow"**
4. Select branch and run

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
npm run build --workspace=@portfolio/main-content
npm run build --workspace=@portfolio/shared
```

## Environment Variables

| Variable       | Used In           | Description                                                   |
| -------------- | ----------------- | ------------------------------------------------------------- |
| `CDN_BASE_URL` | root-config build | Base URL for MFE assets (default: `https://assets.teofe.dev`) |

Set in `.github/workflows/deploy-root-config.yml`:

```yaml
- name: Build root-config
  run: npm run build --workspace=@portfolio/root-config
  env:
    CDN_BASE_URL: https://assets.teofe.dev
```

## Troubleshooting

### Cache Issues

If users see stale content:

```bash
# Manually purge all cache for the zone
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### R2 Upload Issues

Ensure you're using `--remote` flag:

```bash
wrangler r2 object put portfolio-mfe-assets/shared/file.js \
  --file=./dist/file.js \
  --remote  # Required for actual Cloudflare R2
```

### Authentication Errors

1. Verify API token has correct permissions
2. Check token hasn't expired
3. Ensure zone ID is correct for cache purge

## Cost Estimate

For a low-traffic portfolio site: Yes, completely free. I love you Cloudflare 😌

| Resource                | Estimated Cost         |
| ----------------------- | ---------------------- |
| Cloudflare Pages        | Free                   |
| Cloudflare R2 (storage) | Free (10GB included)   |
| Cloudflare R2 (egress)  | Free (no egress fees!) |
| Custom domain SSL       | Free                   |
| **Total**               | **$0/month**           |
