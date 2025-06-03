# Transcendence - Ping Pong Game

A modern ping pong game built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- Modern login screen with animated elements
- Custom Jersey 25 font for the main title
- Animated bouncing dots
- Responsive design
- 42 OAuth integration ready
- Email login option

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Jersey 25, Orbitron, Roboto Slab)
- **Icons**: Lucide React
- **Animations**: Framer Motion + Custom CSS animations

## Project Structure

```
ft_transcendence/
├── app/
│   ├── components/
│   │   ├── AnimatedDots.tsx
│   │   └── LoginButtons.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Development

The login page includes:
- Welcome message at top center
- Login buttons at top right
- Large "TRANSCENDENCE" title in center using Jersey 25 font
- "made by a7a" credit at bottom left
- Animated dots at bottom right with bouncing effects

## Next Steps

- Implement 42 OAuth authentication
- Add email login functionality
- Create game interface
- Add user registration
- Implement ping pong game logic "# transcendence" 
