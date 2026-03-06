# 📚 Learn with TaviNote (LEARN.md)

TaviNote is an app created using only HTML, CSS, and JavaScript.  
This file explains the mechanics of the app in an easy-to-understand way. Please use it as an entry point for reading the code!

---

## 🏗️ App Overview

```
Browser
├── index.html  -> The "skeleton" of the screen (buttons, input fields, menus, etc.)
├── style.css   -> The "appearance" of the screen (colors, sizes, animations, etc.)
└── app.js      -> The "behavior" of the screen (what happens when a button is pressed)
```

> 💡 **As an analogy:** HTML is the "blueprint" of a house, CSS is the "interior design", and JavaScript is the "electrical wiring".

---

## 📦 How Data is Saved

TaviNote uses a mechanism called **localStorage**.  
This is a feature that allows data to be saved within the browser, meaning no server is required.

```
How saving works:
1. The user writes a memo.
2. app.js converts the data into a format called JSON.
3. Saves it to localStorage (it doesn't disappear even if you close the browser).
4. The next time you open the app, it loads the data from localStorage.
```

> ⚠️ **Warning:** If you clear your browser's data, your TaviNote data will also be deleted.

---

## 🧩 Mechanisms by Feature

### 📍 Nearby Search (GPS)
1. Acquires current location (latitude and longitude) using the browser's **Geolocation API**.
2. Requests the **Overpass API** (OpenStreetMap database) to "find convenience stores within 1km around these coordinates".
3. Displays the found locations with markers on a map using **Leaflet.js**.

### 👜 Packing Checklist
1. When a template is selected, a pre-prepared list of items is added.
2. When checked, it changes to `checked: true`, and a strikethrough is displayed.
3. The progress bar is calculated by `Checked items ÷ Total items × 100`.

### 💰 Splitting Bills
1. Member names have been inputted separated by commas (when creating the trip).
2. When recording an expense, input "who paid".
3. The app calculates automatically:
   - `Total ÷ Number of members = Amount per person`
   - `Amount actually paid - Amount per person = Difference`
   - If positive, "Person to receive"; if negative, "Person to pay".

### 🗳️ Polls
1. Create a poll by entering a question and choices.
2. Tapping a choice adds +1 to `votes`.
3. The width of the bar chart is calculated by `Votes ÷ Total votes × 100%`.

### 📄 Itinerary
1. When the button is pressed, HTML is automatically generated from the trip data.
2. Opens in a new window -> Output to PDF or paper using the browser's print function.

---

## 🎨 Design Mechanics

### CSS Custom Properties
Colors and sizes are managed as "variables":
```css
--accent: #7CB69D;     /* Main green color */
--bg-card: #ffffff;     /* Card background */
--radius: 12px;         /* Corner roundness */
```
> In dark mode, simply changing the values of these variables changes the overall colors.

### Animations
The "pinning animation" on the memo board is realized with CSS `@keyframes`:
```
1. Memo drops from above (translateY)
2. Shakes slightly (rotate)  
3. Settles into its regular position
```

---

## 🔰 To Those Reading Code for the First Time

1. **First, read `index.html`** — Understand what buttons and screens exist.
2. **Read the `init()` function in `app.js`** — What gets called when buttons are pressed.
3. **Read the functions of features you're interested in** — Ex: understand how polls are displayed with `renderPolls()`.
4. **Check the appearance in `style.css`** — Searching by class name will find the corresponding styles.

---

## 📖 To Those Who Want to Learn More

| Topic | Recommended Resources |
|---------|---------------|
| HTML/CSS/JS Basics | [MDN Web Docs](https://developer.mozilla.org/en-US/) |
| Leaflet.js (Maps) | [Leaflet Official Tutorials](https://leafletjs.com/examples.html) |
| localStorage | [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) |
| CSS Animations | [MDN CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations) |
| Geolocation API | [MDN Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) |

---

Let's enjoy learning! 🎓✨
