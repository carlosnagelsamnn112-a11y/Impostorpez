# IMPOSTOR - Multiplayer Deduction Game

## Overview
A multiplayer party game where players try to identify the impostor among them. Similar to social deduction games, players receive a secret word except for the impostor(s), who must blend in without knowing the word.

## Project Structure
- `server.js` - Express + Socket.io backend server
- `index.html` - Main HTML file with all game screens
- `script.js` - Client-side game logic
- `styles.css` - Game styling

## Game Modes
1. **Local Game** - Play on a single device, passing it between players
2. **Multiplayer Online** - Connect with friends using room codes

## Technical Stack
- Node.js with Express
- Socket.io for real-time multiplayer
- Vanilla JavaScript frontend

## Running the App
- Development: `npm run dev` (uses nodemon)
- Production: `npm start`
- Server runs on port 5000

## Categories
The game includes word categories:
- Futbolistas (Soccer players)
- Países (Countries)
- Objetos (Objects)
