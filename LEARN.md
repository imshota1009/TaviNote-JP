# 📚 Learn with TaviNote (LEARN.md)

TaviNote is a modern web application built with a focus on premium user experience and "Preparation as Growth". This guide explains the technical architecture and how the app works under the hood.

---

## 🏗️ Architecture Overview

The project is structured into two main parts: a **Marketing Landing Page** and the **Core Application**.

```
Project Root
├── public/
│   ├── index.html       -> Landing Page (Marketing, Introduction, SEO)
│   ├── app.html         -> The App "Skeleton" (The functional UI)
│   ├── app.js           -> The "Behavior" (Logic, Firebase, State Management)
│   ├── landing.css      -> Landing page styles (Hero animations, typography)
│   └── style.css        -> Application core styles (Theming, Layouts)
└── android/             # Capacitor project for Android support
```

> 💡 **The Dual-File Approach**: Separating `index.html` (landing) and `app.html` (app) allows us to optimize the landing page for speed and SEO while keeping the heavy application logic isolated and ready for Capacitor-based native environments.

---

## 📦 Data Management: From Local to Cloud

Originally based on `localStorage`, TaviNote has evolved to use **Google Firebase** for real-time synchronization.

### 1. Data Flow
1. **Input**: User creates a Trip or adds a TODO.
2. **Local State**: `app.js` updates the internal `appData` object.
3. **Cloud Sync**: The app uses `Firestore` to persist data. If a Room ID exists, data is shared instantly across all devices in that room.
4. **Offline Resilience**: Even if the connection is lost, Capacitor and browser caching help maintain basic functionality.

### 2. Room Sharing
TaviNote uses the "Room ID" concept. Each room is a separate document in Firestore, containing arrays for `todos`, `packingItems`, `schedules`, etc. Using `onSnapshot`, the UI updates automatically when someone else in the room makes a change.

---

## 🧩 Advanced Mechanics

### 🌳 The Growth Engine
The "Tree Growth" visualization is driven by percentage logic:
- Calculation: `(Completed TODOs + Completed Packing) ÷ (Total Items) × 100`.
- The UI listens for changes in this percentage and switches images/animations to represent different stages of growth.

### 🗺️ Geospatial Integration
- **Nominatim API**: Converts human-readable addresses into latitude/longitude.
- **Overpass API**: Performs complex queries against OpenStreetMap data to find convenience stores or stations near your trip destination.
- **Leaflet.js**: Handles the rendering of markers and interactive map layers.

### 📱 Native Integration (Capacitor)
By using Ionic Capacitor, we wrap the web app in a native container.
- **Redirection**: `index.html` detects the Capacitor environment and automatically forwards users to `app.html` for a seamless mobile experience.
- **Permissions**: Leverages native APIs for Geolocation more reliably than standard browser APIs.

---

## 🎨 Design System

TaviNote uses a custom CSS utility system built on:
- **CSS Variables**: Easy theme switching (Light/Dark mode) and brand color management.
- **Glassmorphism**: Subtle blurs and semi-transparent backgrounds for a premium feel.
- **Animations**: Using `@keyframes` for micro-interactions (e.g., subtle shakes when pinning a memo).

---

## 🔰 Code Reading Guide

1. **Start with `app.js`**: Look for the `init()` function to see how the application wakes up.
2. **Explore `t()`**: This is our localization function. See how it pulls strings from the `translations` object for multi-language support.
3. **Check `fbHelpers`**: This set of functions manages the interaction with Firebase.

---

## 📖 Recommended Learning
- [Firebase Documentation](https://firebase.google.com/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Leaflet.js Tutorials](https://leafletjs.com/examples.html)

---

Happy Coding! 🌍🧪
