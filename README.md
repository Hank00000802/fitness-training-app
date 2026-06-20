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

Users can select the body part they want to train from the home screen.

### Exercise List

After selecting a body part, users can browse a list of available exercises for that training area.

### Exercise Detail Page

Each exercise includes:

* Exercise name
* Description
* Image
* Training notes
* Important tips or precautions

### Offline Support

The app is designed with Progressive Web App concepts in mind, allowing users to access core content even in limited network conditions.

### Clean and Responsive UI

The interface is built with Tailwind CSS to provide a modern, clean, and mobile-friendly user experience.

---

## Tech Stack

* **React 18** — Frontend framework
* **Tailwind CSS** — Styling framework
* **JavaScript** — Main programming language
* **PWA Builder** — Packaging as a mobile installable app
* **Netlify** — Deployment platform

---

## Project Structure

```text
src/
├── components/
│   ├── BodyPartGrid.js       # Body part selection grid
│   ├── ExerciseList.js       # Exercise list page
│   └── ExerciseDetail.js     # Exercise detail page
├── data/
│   └── exerciseData.js       # Exercise data
├── App.js                    # Main app entry and page navigation
├── index.js                  # React entry point
└── index.css                 # Global styles
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

Then open the app in your browser:

```text
http://localhost:3000
```

---

## Usage

1. Select a body part on the home screen.
2. Browse the exercise list for that body part.
3. Click an exercise to view its details.
4. Read the description, image, and training notes.
5. Use the back button to return to the previous page.

---

## Development and Deployment Workflow

### 1. Build and Test Locally

```bash
npm run build
serve -s build
```

### 2. Commit Changes

```bash
git add .
git commit -m "Add new exercises and tips"
git push
```

### 3. Deploy

This project is deployed using **Netlify**.

After pushing to the repository, Netlify automatically builds and deploys the latest version of the app.
Deployment usually takes about 1–2 minutes.

### 4. Package as a Mobile App

The deployed Netlify URL can be used with **PWA Builder** to package the app for mobile installation.

General workflow:

1. Deploy the app to Netlify.
2. Copy the Netlify app URL.
3. Paste the URL into PWA Builder.
4. Generate the Android or iOS package.
5. Open the generated package link on a mobile device.
6. Install the app.

---

## Current Progress

* [x] Initial UI structure
* [x] Body part selection page
* [x] Exercise list page
* [x] Exercise detail page
* [x] Basic installation and startup flow
* [x] Netlify deployment workflow
* [x] PWA packaging workflow
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
* Adding user-customized exercise notes
* Adding workout planning or progress tracking features

---

## License

This project is licensed under the MIT License.
