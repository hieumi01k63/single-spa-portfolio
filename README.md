# Teo's Portfolio - Micro-Frontend Architecture

A portfolio website built using **single-spa** micro-frontend architecture with **native ES Modules + Import Maps** for code sharing.

**Live Site:** [teofe.dev](https://teofe.dev)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        teofe.dev (Cloudflare Pages)                      │
│                    Root Config - Single-spa Orchestrator                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────┐    ┌────────────────────────────────────────┐  │
│  │     Navbar MFE      │    │          Main Content MFE              │  │
│  │                     │    │                                        │  │
│  │  - Navigation       │    │  - Hero Section                        │  │
│  │  - Theme Toggle     │    │  - About Section                       │  │
│  │  - Social Links     │    │  - Experience Section                  │  │
│  │  - Scroll Spy       │    │  - Projects Section                    │  │
│  │                     │    │  - Skills Section                      │  │
│  │                     │    │  - Awards Section                      │  │
│  │                     │    │  - Education Section                   │  │
│  │                     │    │  - Contact Section                     │  │
│  └──────────┬──────────┘    └───────────────────┬────────────────────┘  │
│             │                                   │                        │
│             └─────────────┬─────────────────────┘                        │
│                           ▼                                              │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                    Shared Module (ESM)                             │  │
│  │                                                                    │  │
│  │  - Zustand Store (Portfolio State)                                 │  │
│  │  - Shadcn-ui Components (Button, Card, Badge, etc.)                │  │
│  │  - Animation Components (FadeIn, SlideIn, Stagger)                 │  │
│  │  - Utility Functions (cn, utils)                                   │  │
│  │  - Custom Hooks (useScrollSpy, useMediaQuery)                      │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

                    Hosted on: assets.teofe.dev (Cloudflare R2 + CDN)
```

## Tech Stack

| Category             | Technology                          |
| -------------------- | ----------------------------------- |
| **Orchestration**    | single-spa 6.x                      |
| **Module Loading**   | Native ES Modules + Import Maps     |
| **Framework**        | React 18                            |
| **State Management** | Zustand (shared via ESM)            |
| **Styling**          | Tailwind CSS + shadcn-ui components |
| **Animations**       | Framer Motion                       |
| **Build Tool**       | Webpack 5                           |
| **Language**         | TypeScript                          |
| **Hosting**          | Cloudflare Pages + R2               |
| **CI/CD**            | GitHub Actions                      |

## Project Structure

```
single-spa-portfolio/
├── .github/workflows/        # CI/CD pipelines
│   ├── deploy-root-config.yml
│   ├── deploy-shared.yml
│   ├── deploy-navbar.yml
│   └── deploy-main-content.yml
│
├── packages/
│   ├── root-config/          # Single-spa root (Cloudflare Pages)
│   │   ├── src/
│   │   │   ├── index.ejs     # HTML template with import map
│   │   │   └── index.ts      # Application registration
│   │   ├── public/           # Static assets (favicon)
│   │   └── webpack.config.js
│   │
│   ├── shared/               # Shared module (Cloudflare R2)
│   │   ├── src/
│   │   │   ├── store/        # Zustand store
│   │   │   ├── components/   # UI components
│   │   │   ├── hooks/        # Custom hooks
│   │   │   └── lib/          # Utilities
│   │   └── webpack.config.js
│   │
│   ├── navbar/               # Navbar micro-frontend (Cloudflare R2)
│   │   ├── src/
│   │   │   ├── components/   # Navbar components
│   │   │   └── portfolio-navbar.tsx
│   │   └── webpack.config.js
│   │
│   └── main-content/         # Main content MFE (Cloudflare R2)
│       ├── src/
│       │   ├── components/
│       │   │   └── sections/ # Portfolio sections
│       │   └── portfolio-main-content.tsx
│       └── webpack.config.js
│
├── package.json              # Root package with workspaces
├── .prettierrc               # Code formatting config
└── DEPLOYMENT.md             # Deployment guide
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/single-spa-portfolio.git
cd single-spa-portfolio

# Install all dependencies (uses npm workspaces)
npm install
```

### Development

```bash
# Start all micro-frontends in parallel (recommended)
npm run dev

# Or use npm-run-all
npm start
```

Access the site at **http://localhost:9000**

### Development Ports

| Package       | Port | URL                   |
| ------------- | ---- | --------------------- |
| Root Config   | 9000 | http://localhost:9000 |
| Navbar        | 9001 | http://localhost:9001 |
| Main Content  | 9002 | http://localhost:9002 |
| Shared Module | 9003 | http://localhost:9003 |

### Build

```bash
# Build all packages
npm run build

# Build individual packages
npm run build --workspace=@portfolio/root-config
npm run build --workspace=@portfolio/navbar
```

### Format Code

```bash
# Format all files with Prettier
npm run format

# Check formatting (CI)
npm run format:check
```

## Features

### Dark Mode

- System preference detection
- Manual toggle with localStorage persistence
- Smooth CSS transition animations

### Animations

- Framer Motion powered animations
- Scroll-triggered section animations
- Staggered list animations
- Hover interactions

### Shared State (Zustand)

- Active section tracking (scroll spy)
- Dark mode state
- Mobile menu state
- Shared across all micro-frontends

### Component Library

- Shadcn-ui inspired components
- Consistent design system
- Tailwind CSS styling
- Accessible and responsive

## Key Concepts

### Native ES Modules + Import Maps

Dependencies are loaded via browser-native import maps, not bundled:

```html
<script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@18.2.0",
      "zustand": "https://esm.sh/zustand@4.5.0",
      "@portfolio/navbar": "https://assets.teofe.dev/navbar/portfolio-navbar.js",
      "@portfolio/shared": "https://assets.teofe.dev/shared/portfolio-shared.js"
    }
  }
</script>
```

### Single-spa Lifecycle

Each micro-frontend exports lifecycle functions:

```typescript
import singleSpaReact from "single-spa-react";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Navbar,
  errorBoundary(err) {
    return <div>Error: {err.message}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
```

### Webpack Externals

Shared dependencies are externalized and loaded via import map:

```javascript
// webpack.config.js
externalsType: "module",
externals: {
  "react": "react",
  "zustand": "zustand",
  "@portfolio/shared": "@portfolio/shared",
}
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full deployment guide.

### Quick Overview

| Component   | Hosting             | Domain           |
| ----------- | ------------------- | ---------------- |
| Root Config | Cloudflare Pages    | teofe.dev        |
| MFE Bundles | Cloudflare R2 + CDN | assets.teofe.dev |

### CI/CD Triggers

| Change In                  | Workflows Triggered          |
| -------------------------- | ---------------------------- |
| `packages/root-config/**`  | root-config only             |
| `packages/shared/**`       | shared, navbar, main-content |
| `packages/navbar/**`       | navbar only                  |
| `packages/main-content/**` | main-content only            |

## License

ISC
