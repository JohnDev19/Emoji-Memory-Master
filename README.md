# Emoji Memory Master

Emoji Memory Master is a memory game built with HTML, CSS, and JavaScript. Test your memory skills by matching pairs of emoji cards!

## Features

- 🎮 Interactive memory game with emojis
- 🌈 Multiple themes: Nature, Space, and Candy
- 🏆 Difficulty levels: Easy, Normal, and Hard
- 🕒 Timed gameplay with score tracking
- 🔊 Sound effects and background music (with mute option)
- 🎚️ Adjustable game levels

## Getting Started

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript (for developers)

### Installation

1. Clone the repository or download the ZIP file:
   ```
   git clone https://github.com/JohnDev19/emoji-memory-master.git
   ```

2. Navigate to the project directory:
   ```
   cd emoji-memory-master
   ```

3. Open the `index.html` file in your web browser.

That's it! You're ready to play Emoji Memory Master.

## How to Play

1. Click "New Game" to start.
2. Click on cards to flip them over.
3. Try to find matching pairs of emojis.
4. Match all pairs before the time runs out!
5. Progress through levels to increase your score.

## Customization

- **Theme**: Choose between Nature, Space, and Candy themes.
- **Difficulty**: Select Easy, Normal, or Hard mode.
- **Level**: Use the slider to set your starting level (1-10).

## Development

If you want to modify or extend the game:

1. The main game logic is in `main.js`.
2. Styles and responsive design are in the `styles.css`.
3. Game structure and layout are in the HTML body of `index.html`.

### Adding New Features

- To add new emojis, extend the `emojis` array in `main.js`.
- For new themes, add options to the theme select and update the `getBackgroundStyle` function.
- To modify difficulty, adjust the `timeLeft` values in the `initializeGame` function.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Emojis provided by Unicode Consortium
- Sound effects from (https://pixabay.com/music/)

Enjoy playing Emoji Memory Master!
