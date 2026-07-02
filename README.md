# Fitness Training App

A mobile-friendly fitness training application built with **React** and **Tailwind CSS**.
The app helps users quickly browse exercises by body part, view exercise details, and access training notes in a simple and clean interface.

---

## Overview

This project was created to provide a lightweight and easy-to-use fitness reference app.
Instead of searching through complex fitness apps or scattered online resources, users can select a target body part and quickly find relevant exercises, descriptions, images, and training tips.

The app is designed with a simple navigation flow, making it suitable for quick use during workouts.

---

## Features

### Body Part Selection

Users can select the body part they want to train from the home screen. Custom body parts can also be added.

### Exercise List

After selecting a body part, users can browse a list of available exercises for that training area.

### Exercise Detail Page

Each exercise includes:

* Exercise name
* Description
* Image
* Training notes
* Important tips or precautions

### PWA Install (Add to Home Screen)

The app is a **Progressive Web App (PWA)**. After deployment over HTTPS, users can install it directly to their phone home screen from the browser ¡X no app store required.

* **Android (Chrome):** Tap the install banner, or use browser menu ¡÷ *Install app*
* **iPhone/iPad (Safari):** Tap *Share* ¡÷ *Add to Home Screen*
* **Desktop (Chrome/Edge):** Click the install icon in the address bar

### Offline Support

A service worker caches core app assets so the app remains usable in limited network conditions after the first visit.

### Clean and Responsive UI

The interface is built with Tailwind CSS to provide a modern, clean, and mobile-friendly user experience.

---

## Tech Stack

* **React 18** ¡X Frontend framework
* **Tailwind CSS** ¡X Styling framework
* **JavaScript** ¡X Main programming language
* **Workbox** ¡X Service worker and offline caching
* **Netlify** ¡X Deployment platform

---

## Project Structure

```text
src/
¢u¢w¢w components/
¢x   ¢u¢w¢w BodyPartGrid.js
¢x   ¢u¢w¢w ExerciseList.js
¢x   ¢u¢w¢w ExerciseDetail.js
¢x   ¢u¢w¢w AddBodyPartForm.js
¢x   ¢u¢w¢w AddExerciseForm.js
¢x   ¢|¢w¢w InstallPWA.js         # PWA install prompt banner
¢u¢w¢w data/
¢x   ¢|¢w¢w exerciseData.js
¢u¢w¢w service-worker.js           # Workbox service worker (production)
¢u¢w¢w serviceWorkerRegistration.js
¢u¢w¢w App.js
¢u¢w¢w index.js
¢|¢w¢w index.css

public/
¢u¢w¢w manifest.json             # PWA manifest
¢u¢w¢w logo192.png / logo512.png # App icons
¢|¢w¢w _redirects                # Netlify SPA routing
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm start
```

Open `http://localhost:3000` in your browser.

> **Note:** PWA install and the service worker only activate in **production build** over HTTPS. They do not run in `npm start` dev mode.

---

## Usage

1. Select a body part on the home screen.
2. Browse the exercise list for that body part.
3. Click an exercise to view its details.
4. Read the description, image, and training notes.
5. Use the back button to return to the previous page.

---

## Development and Deployment Workflow

### Step 1: Build and Test Locally

```bash
npm run build
npx serve -s build
```

Open the URL shown (e.g. `http://localhost:3000`). For full PWA testing (install prompt, offline), deploy to Netlify first.

### Step 2: Deploy to Netlify

#### Option A ¡X Connect Git Repository (Recommended)

1. Push your code to GitHub.
2. Go to [Netlify](https://www.netlify.com/) and sign in.
3. Click **Add new site** ¡÷ **Import an existing project**.
4. Select your GitHub repository.
5. Build settings (auto-detected from `netlify.toml`):
   * **Build command:** `npm run build`
   * **Publish directory:** `build`
6. Click **Deploy site**.
7. Wait 1¡V2 minutes. Netlify provides a URL like `https://your-app-name.netlify.app`.

#### Option B ¡X Manual Deploy via CLI

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build
```

### Step 3: Install on Mobile (PWA)

After deployment, open the **HTTPS** Netlify URL on your phone.

#### Android (Chrome)

1. Open the deployed URL in Chrome.
2. Tap the **Install App** banner at the bottom, **or**
3. Tap the browser menu (?) ¡÷ **Install app** / **Add to Home screen**.
4. Confirm installation. The app icon appears on your home screen.

#### iPhone / iPad (Safari)

1. Open the deployed URL in **Safari** (required).
2. Tap the **Share** button (¡¼¡ô).
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**. The app icon appears on your home screen.

> iOS does not show a native install prompt. The app displays step-by-step instructions when opened in Safari.

#### Desktop (Chrome / Edge)

1. Open the deployed URL.
2. Click the **install icon** in the address bar, or use menu ¡÷ **Install Fitness Training App**.

### Step 4: Verify PWA Setup

Use Chrome DevTools to confirm:

1. Open the deployed site in Chrome.
2. Press `F12` ¡÷ **Application** tab.
3. Check **Manifest** ¡X icons and name should load correctly.
4. Check **Service Workers** ¡X should show `service-worker.js` as activated.
5. Run Lighthouse PWA audit for a full report.

### Step 5: Commit and Auto-Deploy

```bash
git add .
git commit -m "Add PWA install support"
git push
```

Netlify automatically rebuilds and redeploys on every push.

---

## Current Progress

* [x] Initial UI structure
* [x] Body part selection page
* [x] Exercise list page
* [x] Exercise detail page
* [x] Custom body part and exercise support
* [x] PWA install support (Add to Home Screen)
* [x] Service worker offline caching
* [x] Netlify deployment configuration
* [ ] Add more body parts
* [ ] Add more exercise images
* [ ] Add more exercises
* [ ] Improve offline caching
* [ ] Add multilingual support

---

## Motivation

This project was built as a practical fitness information tool and a frontend development practice project.
It focuses on simplifying the process of finding suitable exercises and checking important training notes, especially for users who want a fast and straightforward workout reference.

---

## Future Improvements

Planned improvements include:

* Expanding the exercise database
* Adding more visual examples
* Improving offline support and cache behavior
* Supporting multiple languages
* Adding workout planning or progress tracking features

---

## License

This project is licensed under the MIT License.
