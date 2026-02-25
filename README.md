# beSocial - Unofficial Amity Community Prototype

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

> **⚠️ DISCLAIMER:** This is an **unofficial student-created prototype** built for practice purposes only. It is not affiliated with, endorsed by, or connected to Amity University or its official `beSocial` platform. It does not save, store, or upload any user data. The codebase currently serves entirely **safe, local mock data** to avoid unauthorized API usage. 

## 🌟 Overview

A beautiful, premium, dark-themed UI clone of a university social feed platform. It simulates infinite scrolling feeds, dynamic API-driven community categories, and immersive UI interactions. 

This project aims to demonstrate modern frontend UI/UX practices through the implementation of a complex layout system involving persistent sidebars, responsive navigation, glassmorphism, and live API binding.

## 📸 Live API Integration Previews
*The following screenshots demonstrate the UI when it was connected to the live university REST APIs (before being safely swapped to local mock data for public showcase).*

| Feed & Highlighted Carousel | Community Navigation & Layout |
|:---:|:---:|
| ![](public/Screenshot%202026-02-25%20175907.png) | ![](public/Screenshot%202026-02-25%20175922.png) |
| ![](public/Screenshot%202026-02-25%20175934.png) | ![](public/Screenshot%202026-02-25%20175948.png) |
| ![](public/Screenshot%202026-02-25%20180006.png) | ![](public/Screenshot%202026-02-25%20180015.png) |

## 🏗️ Technical Architecture & How It Works

This prototype features a robust front-end architecture designed for scalability and performance:

### 1. Data Fetching & State Management (React Query)
Instead of relying on fragile `useEffect` calls, the app heavily utilizes **TanStack Query (React Query)** in the `useCommunity.ts` custom hooks.
- **`useGroups`**: Fetches community categories from the live Amity API (`______________`). React Query caches this data, eliminating redundant network requests when switching pages.
- **`useHighlightedPosts`**: Fetches the featured "Carousel" posts data mapped to the top banner.
- **`usePosts` (Infinite Scroll)**: Uses `useInfiniteQuery` combined with `react-intersection-observer` (applied at the bottom of the feed) to automatically trigger `fetchNextPage()` when the user scrolls near the end, providing a seamless "infinite" feed experience.

### 2. Layout System & Responsive Routing
The application uses a persistent **Layout Shell** via `React Router v6`.
- The `<Layout />` wrapper isolates the `TopNavbar`, `LeftSidebar`, and `RightSidebar`, keeping them statically mounted on the screen.
- Only the center column (`<Routes />`) re-renders as the user navigates between pages (`Feed`, `Explore`, `Events`), preventing flashes of white and maintaining the scroll position of the sidebars.
- **Tailwind Grid/Flexbox**: The layout shifts dynamically. On Mobile (`sm`, `md`), sidebars are hidden behind Hamburger menus or bottom sheets, while on Desktop (`lg`, `xl`), they expand into a 3-column architecture.

### 3. Dynamic Styling & Theming (CSS Variables)
To implement the specific Amity brand colors seamlessly, the app utilizes global CSS variables injected directly into Tailwind's configuration (`index.css` & `tailwind.config.ts`). 
- A custom "Premium Dark Theme" is enforced globally (`bg-background` -> `#0f172a`), accented heavily by variables like `--primary` (Amity Blue) and `--secondary` (Amity Orange).
- Custom utility classes like `.glass-card` and `.glow-text` mix raw CSS gradients, `backdrop-filter: blur()`, and `text-shadow` to create depth without overloading JSX classes. 

### 4. Interactive Simulation & Prototype Safety
To simulate application feel without needing a backend database:
- User interaction points (e.g., clicking "Create Post", reacting, or clicking tabs) are intercepted by generic `onClick` handlers.
- These handlers trigger **Sonner Toasts** using `framer-motion` animations to display localized alerts, ensuring the user recognizes it's a simulated prototype. No actual `POST` requests are fired to any servers. 

## ✨ Key Features

- **Amity Premium Dark Theme:** Visually rich deep-blue background with vibrant orange accents mimicking official branding.
- **Dynamic Feed:** Integrates with public API endpoints to fetch Featured Posts and general feed data, supporting pagination and infinite scroll.
- **Smart Grouping (Sidebar):** Left navigation dynamically fetches and filters "Community Groups" (Academics, Masters Feed) and cleverly truncates the list with a dummy login prompt for guest users.
- **Right Sidebar Widgets:** Modular components containing platform guidelines, events/webinar banners, and course advertisements.
- **404 Animated Space:** An engaging "Lost in Space" animated 404 proxy page built with `framer-motion`, effectively catching all stray routes with a clear prototype disclaimer.
- **Focus:** Frontend architecture & UX performance optimization.
## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with arbitrary component abstractions)
- **Routing:** React Router v6
- **Data Fetching:** React Query (@tanstack/react-query)
- **Animations:** Framer Motion
- **Icons:** Lucide-React
- **Alerts:** Sonner (Toast notifications)

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-github-repo-url>
   cd <repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start up the dev server:
   ```bash
   npm run dev
   ```

The application will start locally on your Vite port (usually `localhost:5173` or `8080`).

---

*For Educational Portfolio Purposes Only.*
