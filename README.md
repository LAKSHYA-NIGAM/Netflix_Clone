# 🎬 Netflix Clone — Streaming UI Platform

[![CI](https://github.com/LAKSHYA-NIGAM/Netflix_Clone/actions/workflows/ci.yml/badge.svg)](https://github.com/LAKSHYA-NIGAM/Netflix_Clone/actions/workflows/ci.yml)
[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A responsive, high-fidelity Netflix streaming interface built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**. Features dynamic movie rows, genre filtering, video preview modals, authentication state management, and real-time catalog search.

---

## 📌 Features

- **Dynamic Catalog Rows**: Categorized streaming collections across Trending, Drama, Crime, Sci-Fi, and Thriller genres.
- **Hero Featured Showcase**: Cinematic billboard hero with autoplay preview and detailed metadata.
- **Real-Time Search**: Substring and keyword search across movie titles and plot descriptions.
- **Interactive Video Modal**: Custom HTML5 video player component with play/pause and fullscreen controls.
- **Authentication Context**: Client-side authentication modal managing user profile and custom watchlists.
- **Responsive Layout**: Tailored viewports optimized for mobile, tablet, and desktop screens.
- **Video Playback State Manager (`src/utils/playerState.ts`):** Calculates watch completion percentages, enforces sanitized playback rate bounds (0.5x to 2.0x), and tracks "Continue Watching" candidate qualification (3% to 92% thresholds).
- **Watchlist & Bookmark Store (`src/utils/watchlistStore.ts`):** In-memory and persistent user watchlist manager with O(1) deduplication, genre filtering, and rating-based sorting.

---

## 🛠 Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript 5.5
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **Routing & State**: React Context API, React Router DOM

---

## 📦 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/LAKSHYA-NIGAM/Netflix_Clone.git
cd Netflix_Clone
npm install
```

### 2. Development Server

```bash
npm run dev
```

### 3. Production Build

```bash
npm run build
```

---

## 🧪 Automated Testing

The project includes an automated test suite verifying catalog schema integrity, genre mapping, and search query filters:

```bash
# Run automated catalog test suite
npm test
```

### Test Coverage:
- **Genre Definitions**: Verifies 18 distinct standard genre IDs and non-empty category names.
- **Movie Catalog Integrity**: Asserts required metadata fields, rating bounds (0-10), and poster URLs.
- **Genre Categorization**: Validates genre filtering across Trending, Drama, Crime, Sci-Fi, and Thriller collections.
- **Search Logic**: Tests title and synopsis keyword filtering for exact and substring matches.

---

## 🙋‍♂️ Author

**Lakshya Nigam**  
GitHub: [@LAKSHYA-NIGAM](https://github.com/LAKSHYA-NIGAM)
