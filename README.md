# Random Spin Wheel Game

A simple, colorful web-based Spin Wheel game built with pure JavaScript. Created for the **Jahnavigame01** repository.

## Project Purpose
To provide a fun, interactive way to select random outcomes or prizes using a digital wheel with smooth physics-based animations.

## Features
- 🎨 Colorful, responsive wheel design
- 🔄 Smooth CSS-based spin animations
- 🎯 Arrow pointer indicating the winning segment
- 📱 Mobile-friendly layout
- 🕹️ Pure JavaScript (No external frameworks)

## How to Run Locally

1. **Clone or Download** this repository.
   ```bash
   git clone https://github.com/jahnavi0057/Jahnavigame01.git
   ```
2. **Navigate** to the folder.
3. **Open** `index.html` in any modern web browser (Chrome, Firefox, Safari).
   - No server installation is required.

## File Structure

- `index.html`: Main HTML structure containing the canvas and UI controls.
- `style.css`: Styling for the wheel, responsiveness, and animations.
- `script.js`: Game logic, including drawing the wheel on Canvas and handling spin physics.
- `README.md`: Project documentation.

## Customization
You can easily change the wheel segments in `script.js`:

```javascript
const segments = [
    { label: "Tacos", color: "#FF6384" },
    { label: "Pizza", color: "#36A2EB" },
    // Add more...
];
```