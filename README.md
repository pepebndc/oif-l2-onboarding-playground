# OIF L2 Onboarding Demo

A demo application showcasing the OIF (OpenZeppelin Intent Framework) L2 onboarding process. This React application demonstrates the UI components for onboarding new L2 chains, managing solver instances, and enabling users to bridge assets using intent-based bridging.

![OIF L2 Onboarding](https://img.shields.io/badge/OIF-Milestone%202-blue)
![React](https://img.shields.io/badge/React-18.2-61DAFB)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)

## Features

### 🚀 Network Onboarding UI
- Step-by-step wizard for onboarding new L2 chains
- Network configuration with HUB chain selection
- Contract deployment status tracking
- Solver instance setup and funding flow

### 📊 Solver Dashboard
- Real-time solver statistics and performance metrics
- Token management (add, edit, delete supported tokens)
- Balance monitoring across L2 and HUB chains
- Transaction history and status tracking
- Liquidity rebalancing controls

### 🌉 User Bridge Interface
- Clean, intuitive bridge UI for token transfers
- Chain and token selection
- Real-time quote generation
- Transaction status tracking
- Recent bridge history

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── public/
│   └── favicon.svg         # App favicon
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main app with routing
    ├── index.css           # Global styles
    └── pages/
        ├── Landing.jsx             # Home page
        ├── NewNetworkOnboarding.jsx # Network onboarding wizard
        ├── SolverDashboard.jsx     # Solver management dashboard
        └── UserBridge.jsx          # User bridge interface
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with overview |
| `/onboarding` | New network onboarding wizard |
| `/dashboard` | Solver management dashboard |
| `/bridge` | User bridge interface |

## Tech Stack

- **React 18** - UI framework
- **React Router 6** - Client-side routing
- **Vite 5** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## Design System

The UI follows OpenZeppelin's design language with:
- Dark theme with blue/purple accent colors
- Minimalistic and elegant components
- Consistent spacing and typography
- Subtle animations and transitions
- Glass morphism effects

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Blue | `#4E5EE4` | Primary accent |
| Purple | `#6366F1` | Secondary accent |
| Dark | `#0A0B0D` | Background |
| Card | `#111318` | Card backgrounds |
| Border | `#1E2028` | Borders |
| Text | `#A1A1AA` | Secondary text |

## Notes

This is a **demo application** for UI showcase purposes. It does not include:
- Real wallet connections
- Actual blockchain interactions
- API integrations
- Backend services

The UI is designed to demonstrate the user experience and flow for the OIF L2 onboarding process before implementing the actual functionality.

## Related Documentation

For more details on the OIF L2 onboarding architecture and flow, see the [notion.md](./notion.md) specification document.

## License

MIT © OpenZeppelin
