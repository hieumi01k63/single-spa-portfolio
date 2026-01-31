# Teo's Portfolio - Micro-Frontend Architecture

A portfolio website built using **single-spa** micro-frontend architecture with **Module Federation** for code sharing.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Root Config (9000)                       │
│              Single-spa orchestrator + Import Map            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌──────────────────────────────┐    │
│  │   Navbar MFE    │    │      Main Content MFE        │    │
│  │    (9001)       │    │         (9002)               │    │
│  │                 │    │                              │    │
│  │  - Navigation   │    │  - Hero Section              │    │
│  │  - Theme Toggle │    │  - About Section             │    │
│  │  - Social Links │    │  - Experience Section        │    │
│  │                 │    │  - Projects Section          │    │
│  │                 │    │  - Skills Section            │    │
│  │                 │    │  - Awards Section            │    │
│  │                 │    │  - Education Section         │    │
│  │                 │    │  - Contact Section           │    │
│  └────────┬────────┘    └─────────────┬────────────────┘    │
│           │                           │                     │
│           └───────────┬───────────────┘                     │
│                       ▼                                     │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               Shared Module (9003)                   │    │
│  │           (Module Federation Remote)                 │    │
│  │                                                      │    │
│  │  - Zustand Store (Portfolio State)                   │    │
│  │  - Shadcn-ui Components                              │    │
│  │  - Animation Components (Framer Motion)              │    │
│  │  - Utility Functions                                 │    │
│  │  - Custom Hooks                                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Tech Stack

- **Orchestration**: single-spa 6.x
- **Framework**: React 18
- **State Management**: Zustand (shared via Module Federation)
- **Code Sharing**: Webpack Module Federation
- **Styling**: Tailwind CSS + shadcn-ui inspired components
- **Animations**: Framer Motion
- **Build Tool**: Webpack 5
- **Language**: TypeScript

## Project Structure

```
single-spa-portfolio/
├── packages/
│   ├── root-config/          # Single-spa root config (port 9000)
│   │   ├── src/
│   │   │   ├── index.html    # HTML template with import map
│   │   │   └── index.ts      # Application registration
│   │   ├── webpack.config.js
│   │   └── package.json
│   │
│   ├── shared/               # Shared module (port 9003)
│   │   ├── src/
│   │   │   ├── store/        # Zustand store
│   │   │   ├── components/   # Shadcn-ui components
│   │   │   ├── hooks/        # Custom hooks
│   │   │   └── lib/          # Utilities
│   │   ├── webpack.config.js # Module Federation config
│   │   └── package.json
│   │
│   ├── navbar/               # Navbar micro-frontend (port 9001)
│   │   ├── src/
│   │   │   ├── components/   # Navbar components
│   │   │   └── portfolio-navbar.tsx
│   │   ├── webpack.config.js
│   │   └── package.json
│   │
│   └── main-content/         # Main content micro-frontend (port 9002)
│       ├── src/
│       │   ├── components/
│       │   │   └── sections/ # Portfolio sections
│       │   └── portfolio-main-content.tsx
│       ├── webpack.config.js
│       └── package.json
│
├── package.json              # Root package with workspaces
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install all dependencies (uses npm workspaces)
npm install
```

### Development

```bash
# Start all micro-frontends in parallel
npm start
```

Or start individual packages:

```bash
# Start root config only
npm run start:root-config

# Start shared module only
npm run start:shared

# Start navbar only
npm run start:navbar

# Start main content only
npm run start:main-content
```

### Ports

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
```

## Features

### Dark Mode

- System preference detection
- Manual toggle with persistence
- Smooth transition animations

### Animations

- Framer Motion powered animations
- Scroll-triggered animations
- Staggered list animations
- Smooth page transitions

### Shared State

- Zustand store shared via Module Federation
- Active section tracking
- Dark mode state
- Mobile menu state

### Component Library

- Shadcn-ui inspired components
- Consistent design system
- Tailwind CSS styling

## Key Concepts

### Module Federation

The shared package exposes modules that can be consumed by other micro-frontends:

```javascript
// webpack.config.js in shared package
new ModuleFederationPlugin({
  name: "shared",
  filename: "remoteEntry.js",
  exposes: {
    "./store": "./src/store/index.ts",
    "./components": "./src/components/index.ts",
    "./hooks": "./src/hooks/index.ts",
  },
  shared: {
    react: { singleton: true },
    zustand: { singleton: true },
  },
});
```

### Single-spa Integration

Each micro-frontend exports lifecycle functions:

```typescript
// portfolio-navbar.tsx
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

## CI/CD Considerations

Each micro-frontend can be deployed independently:

1. Build the specific package: `npm run build --workspace=@portfolio/navbar`
2. Deploy to CDN
3. Update import map to point to new bundle

## License

ISC
