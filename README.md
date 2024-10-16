# Color Lines Game

Welcome to **Color Lines**, a popular online ball game where you align balls of the same color in rows to clear them from the board. This implementation is written in TypeScript and uses modern web technologies.

## Game Overview

In **Color Lines**, the goal is to arrange balls of the same color in a straight line either horizontally, vertically, or diagonally. Once you align at least five balls of the same color, they disappear, and you score points. The game ends when the board is full and no more moves can be made.

## Features

- Intuitive, click-based interface
- Random ball spawning after each move
- Dynamic difficulty as the board fills up
- Scoring system based on the number of lines cleared

## Installation

To run the game locally, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd color-lines
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the game in your browser at `http://localhost:8080`.

## Building for Production

To build the game for production, run the following command:
```bash
npm run build
```
The build output will be located in the `dist/` folder.

## Project Structure

- **src/**: Contains the TypeScript source code for the game.
  - **comps/**: Components that handle different parts of the game's functionality.
  - `script.ts`: The main script for the game logic.
- **dist/**: Compiled output files for production.
- **docs/**: Documentation generated for the project.
- `package.json`: Project configuration and dependencies.
- `webpack.config.js`: Configuration file for Webpack, used for bundling the game.

## Gameplay Instructions

1. The game starts with a grid and several randomly placed colored balls.
2. Click on a ball, then click on an empty cell to move it. The ball will move if there is a clear path.
3. After every move, new balls will appear.
4. Align five or more balls of the same color to clear them from the board and earn points.
5. The game ends when the board is full and no more moves are possible.

## License

This project is open-source and available under the MIT License.

## Contributions

Contributions to improve the game are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have suggestions for new features.
