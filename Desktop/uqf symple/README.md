# UFUQ 2026 — Science & Technology Fest

A modern React application for the UFUQ 2026 Science & Technology Festival website.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── public/
│   ├── icons/          # Logo and icons
│   ├── images/         # Event and speaker images
│   └── styles/         # Additional style assets
├── src/
│   ├── components/     # React components
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── Stats.jsx
│   │   ├── Objectives.jsx
│   │   ├── Events.jsx
│   │   ├── Speakers.jsx
│   │   ├── RecentActivity.jsx
│   │   ├── CTA.jsx
│   │   └── Footer.jsx
│   ├── hooks/          # Custom React hooks
│   │   └── useReveal.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.js   # PostCSS configuration
```

## Features

- **Modern React Architecture**: Built with React 18 and Vite
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Scroll Animations**: Smooth reveal animations using Intersection Observer
- **Component-Based**: Modular, reusable components
- **Performance Optimized**: Fast build times and optimized bundle size

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- PostCSS
- Autoprefixer

## Notes

- The app uses Tailwind CSS via CDN in the original HTML, but in this React version, Tailwind is properly configured via npm
- All scroll animations are handled through a custom `useReveal` hook
- Images are served from the `public` directory and can be referenced with `/` prefix

