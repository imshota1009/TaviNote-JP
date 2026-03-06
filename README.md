# 🗺️ TaviNote — Make Trip Planning More Fun

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

**TaviNote** is a trip planning app that allows you to manage everything from "planning -> preparation -> the day of" all in one place.  
It works entirely in the browser, powered by **Firebase**. Data is safely synced to the cloud, allowing multiple users to share and collaborate on trip plans using a Room ID.

---

## ✨ Key Features

### 📋 Trip Planning
| Feature | Description |
|------|------|
| 🗺️ **Create Trips** | Register trip name, dates, members, and budget. Includes a countdown display. |
| 📖 **Diary** | Record memories during the trip as a diary. |
| 📍 **Places List** | Manage places you want to visit with a map. Includes category search and favorites. |
| ✅ **TODO List** | List things to do. Add items in bulk using templates (Domestic, International). |
| 🕐 **Schedule** | Display daily plans in a timeline. |
| 🗳️ **Polls** | "Where should we go for lunch?" Vote together. Results are easily visible with a bar chart. |

### 🧳 Trip Preparation
| Feature | Description |
|------|------|
| 👜 **Packing Checklist** | Automatically add items using 4 templates (Domestic, International, Day Trip, Camping). |
| 🎫 **Tickets & Reservations** | Centrally manage reservation numbers and QR images for bullet trains, flights, and hotels. |
| ⏰ **Reminders** | Prevent forgotten items with notifications like "Pack 3 days before departure". |
| 📄 **Itinerary** | Generate a printable itinerary summarizing trip information with a single button. |

### 🚶 Useful During the Trip
| 💰 **Money Management** | Record expenses -> Compare with budget -> Automatically calculate bill splitting. |
| 📸 **Photo Gallery** | Upload and manage photos from your trip to look back on your memories. |
| 📊 **Trip Review** | Rate your trip out of 5 stars and add memories and notes for future trips. |

### 🛠️ Others
| Feature | Description |
|------|------|
| 📌 **Memo Board** | Corkboard-style pin memos. Colorful sticky notes available in 6 colors. |
| 🚄 **Transit & Accommodation Links** | A collection of links to 12 categories. |
| 🌙 **Dark Mode** | Switch to a darker color scheme that is gentle on the eyes. |

---

## 🚀 How to Use

### Start Using Instantly

You can access the live application directly from any modern browser:

**👉 [TaviNote on Firebase](https://tavinote-app-shota.web.app/)**

> **💡 Hint:** Since data is saved to the cloud, you can access your travel plans from any device!

### Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- Internet connection (Used for map display and nearby searches)

---

## 📁 File Structure

```
TaviNote/
├── index.html       # Main HTML file
├── style.css        # All style definitions
├── app.js           # Application logic
├── README.md        # This file
├── CONTRIBUTING.md  # Contribution guide
├── LEARN.md         # Learning guide
└── LICENSE          # MIT License
```

---

## 🔧 Technologies Used

| Technology | Purpose |
|------|------|
| **HTML5 / CSS3 / JavaScript** | Core structure, design, and logic |
| **Firebase Firestore** | Real-time database for storing trips and sharing via Room ID |
| **Firebase Hosting** | Application hosting and deployment |
| **Leaflet.js** | Map display (Places list, Nearby search) |
| **OpenStreetMap** | Map tiles, Address search (Nominatim API) |
| **Overpass API** | Searching nearby convenience stores, stations, etc. |

---

## 📸 Screenshots

> Access the live app at [tavinote-app-shota.web.app](https://tavinote-app-shota.web.app/), and you can start using it immediately!

---

## 📝 License

This project is released under the [MIT License](./LICENSE).

---

## 🤝 Contributing

Bug reports and feature proposals are very welcome!  
For details, please see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

<p align="center">
  Made with ❤️ for travelers everywhere 🌍
</p>
