# 🌿 TaviNote — Grow Your Trip, Preserve Your Memories

<p align="center">
  <img src="https://img.shields.io/badge/Status-Beta-7CB69D?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Platform-Web%20%7C%20Android-E8F5EE?style=for-the-badge&logoColor=3D3329" />
  <img src="https://img.shields.io/badge/License-MIT-3D3329?style=for-the-badge" />
</p>

**TaviNote** is a premium trip planning and management application designed to transform the process of preparing for a journey into a rewarding experience. We treat every trip as a "tree" that grows as you complete your preparations, eventually forming a "forest" of your lifetime memories.

---

## ✨ The Concept: Preparation as Growth

Most travel apps focus only on the destination. TaviNote focuses on the **journey of preparation**.

- 🌳 **Seed to Bloom**: Your trip starts as a small sapling. As you complete TODOs and packing lists, your tree grows.
- 🤝 **Collaborative Roots**: Share your Room ID with friends and family to grow your trip together.
- 📖 **The Forest**: After your trip, your grown tree is preserved in your personal "Forest" alongside photos and journals.

---

## 🚀 Experience TaviNote

### Web Landing Page
Our new marketing landing page introduces the brand vision and provides quick access to our legal documents and app downloads.
**👉 [Visit TaviNote Homepage](https://tavinote-app-shota.web.app/)**

### Mobile & App Environment
The core TaviNote application is now optimized for mobile via **Capacitor**.
- **Web App**: Accessible via the "Web版アプリ" link on the landing page or directly at `app.html`.
- **Android**: Native app support with offline-first synchronization.

---

## 🔧 Core Features

### 📋 Planning & Execution
- **Smart Preparation**: Automated TODO and Packing templates for Domestic, International, and specialized trips.
- **Dynamic Itinerary**: Timeline-based scheduling with real-time updates.
- **Collaborative Polls**: Easily decide on destinations or meals with group voting.

### 💰 Management & Tools
- **Expense Tracker**: Real-time bill splitting and budget comparison.
- **Ticket Vault**: Centralized storage for QR codes, reservation IDs, and hotel confirmations.
- **Interactive Maps**: Powered by Leaflet and OpenStreetMap for discovering nearby convenience stores and stations.

---

## 📁 Repository Structure

```
TaviNote/
├── public/
│   ├── index.html       # BRAND NEW: Marketing Landing Page
│   ├── app.html         # CORE: Main Application Interface
│   ├── app.js           # Logic for the core application
│   ├── landing.css      # Styles for the landing page
│   ├── style.css        # Styles for the core application
│   ├── terms.html       # Official Terms of Service
│   └── privacy.html     # Official Privacy Policy
├── android/             # Native Android project files (Capacitor)
├── capacitor.config.json # Mobile application configuration
└── README.md            # This file
```

---

## 🛠️ Technology Stack

| Component | Technology |
|------|------|
| **Core** | HTML5, CSS3, JavaScript (Vanilla) |
| **Backend** | Firebase Auth & Cloud Firestore |
| **Mobile** | Ionic Capacitor |
| **Mapping** | Leaflet.js, OpenStreetMap, Overpass API |
| **Design** | Premium custom design system |

---

## 🤝 Contributing & Legal

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.
This project is released under the [MIT License](./LICENSE).

<p align="center">
  <i>"旅行を計画するワクワクと、振り返る喜びを。"</i><br>
  <b>Made with ❤️ by TaviNote Project</b>
</p>
