# MOOS UI OS - Production Ready

A full-featured macOS-inspired web operating system built with Next.js and React.

## Features

- **macOS-like UI**: Top menu bar with Apple-style items, draggable windows with traffic light controls, bottom dock
- **Desktop**: Desktop icons, wallpaper backgrounds with animated bubbles
- **Apps**: Calculator, Calendar, To-Do List, Spreadsheet, PDF Reader/Editor
- **Window Management**: Draggable, resizable windows with minimize/maximize/close
- **App Drawer**: Application launcher accessible from the dock
- **Login System**: User login with local storage persistence
- **Widget Panel**: Quick settings and wallpaper selection

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: CSS Modules
- **State Management**: Zustand
- **Icons**: React Icons

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. It will auto-detect Next.js and deploy

No Docker required!

## Project Structure

- `src/components/` - UI components (Desktop, Taskbar, AppDrawer, etc.)
- `src/windowmgr/` - Window management system
- `src/apps/` - Built-in applications
- `src/store/` - Zustand state management
- `pages/api/` - API routes (merged backend)