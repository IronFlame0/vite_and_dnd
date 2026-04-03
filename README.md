![Image](https://github.com/user-attachments/assets/4e4d611a-dffa-4277-baaa-1718e6d0d35b)

# Vite + React + Drag and Drop

An interactive demo built with React and TypeScript on Vite, showcasing native HTML5 drag-and-drop. Create colored blocks and freely drag them across the viewport — including across separate browser windows.

## Features

- Create blocks with random colors and positions via a button click
- Drag blocks anywhere within the viewport using native HTML5 DnD
- Cross-window drag-and-drop: drop a block from one browser window into another

## Tech Stack

- **React 19** with TypeScript
- **Vite** (via `rolldown-vite`) with `@vitejs/plugin-react-swc` for fast HMR
- **ESLint** with typescript-eslint and react-hooks rules

## Getting Started

```bash
npm install
npm run dev
```

Other scripts:

| Command | Description |
|---|---|
| `npm run build` | Type-check and bundle for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint all TypeScript files |

## How It Works

All drag-and-drop logic lives in `src/App.tsx`:

1. **Create** — clicking the button spawns a block at a random position with a random HSL color.
2. **Drag** — `onDragStart` records the cursor offset inside the block and writes the block's `id` and `color` to `DataTransfer`.
3. **Drop** — `onDrop` reads the transferred data. If the block exists in state it moves it; if it came from another window it creates a new block at the drop position.
