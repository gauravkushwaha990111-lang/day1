# 💖 Interactive Birthday Surprise Website 💖

A beautiful and feature-rich interactive website designed to be a memorable birthday gift. It's packed with animations, music, a customizable photo book, and many magical effects to create a special experience.

 <!-- TODO: Replace with a GIF of your website -->

## ✨ Features

This website is built with pure HTML, CSS, and JavaScript, and includes the following features:

- **🎵 Background Music:** Autoplaying background music with a smooth fade-in/fade-out effect on the play/pause control.
- **📖 Interactive 3D Photo Book:**
    - A flippable book to showcase memorable photos.
    - Realistic page-flip sound effects.
    - Magical particle burst effect when the book opens and when pages are flipped.
- **💖 Animated Heart Formation:**
    - At the end of the book, photos fly out and perform a 3D orbit animation.
    - The orbiting photos then smoothly come together to form a beautiful heart shape.
    - The final heart shape has a soft, pulsing glow effect.
    - The heart container is draggable, allowing the user to move it around the screen with a smooth, physics-based feel.
- **✨ Magical Background Effects:**
    - **Matrix Rain:** An initial "hacker-style" matrix rain effect.
    - **Particle Bursts:** Various particle effects for opening the book and flipping pages.
    - **Floating Particles:** After the heart is formed, the background fills with dreamy, floating particles.
- **📱 Mobile Responsive & Orientation Lock:**
    - Fully responsive design.
    - Forces landscape mode on mobile devices for the best experience, with a clear animated instruction.
- **⚙️ Customization Panel (Hidden by default):**
    - A settings modal allows for on-the-fly customization of:
        - Background music
        - Color themes (Pink, Blue, Purple, or Custom)
        - Text for matrix and main sequence
        - Book pages, images, and content
        - And much more!

## 🚀 Getting Started

### Prerequisites

You just need a modern web browser that supports HTML5, CSS3, and JavaScript (ES6).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```
3.  **Open `index.html`:**
    Simply open the `index.html` file in your web browser to run the website locally. No web server is required for basic functionality.

## 🔧 Customization

You can easily customize the website for a specific person by editing the `jscp/settings.js` file.

```javascript
let settings = {
    music: './music/your-song.mp3', // Change the default music
    sequence: 'HAPPY|BIRTHDAY|DEAR|NAME|❤', // Change the main text
    pages: [
        { image: './image/Birthday!/cover.jpg', content: '' },
        { image: './image/Birthday!/photo1.jpg', content: 'A special message for page 1! 💕' },
        // ... add or remove pages as needed
    ],
    // ... other settings
};
```

1.  **Change Music:** Add your `.mp3` file to the `music/` folder and update the `music` path in `settings.js`.
2.  **Change Photos:** Add your photos to the `image/Birthday!/` folder and update the `pages` array in `settings.js`.
3.  **Change Text:** Modify the `sequence` and page `content` in `settings.js`.

For more advanced customization, you can use the on-page settings panel by clicking the gear icon (⚙️).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

---

Made with 💕 for creating special moments.