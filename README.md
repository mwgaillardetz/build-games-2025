# Pacman 2077

A minimal Pacman game built for the AWS Build Games Challenge using HTML5 Canvas and JavaScript!

## Features

- Classic Pacman gameplay with 4 colorful ghosts
- Power pellets for ghost hunting mode
- Sound effects for eating, power pellets, and ghost encounters
- Multiple rounds with increasing difficulty
- Lives system (3 lives)
- Slower, more controlled movement
- Royal blue and deep purple color scheme

## How to Play

1. Open `index.html` in your web browser
2. Use arrow keys to move Pacman
3. Collect all yellow dots to win
4. Avoid walls (blue blocks)

## Game Controls

- ↑ Arrow Up: Move up
- ↓ Arrow Down: Move down  
- ← Arrow Left: Move left
- → Arrow Right: Move right

## Scoring

- Regular dots = 10 points
- Power pellets = 50 points  
- Eating scared ghosts = 200 points
- Complete rounds to advance and increase score multiplier

## Files

- `index.html` - Main game page with canvas setup
- `game.js` - Core game logic and rendering
- `README.md` - This documentation

Built with ❤️ for the AWS Build Games Challenge!

======================

## 🎮 Why I Chose Pac-Man
I picked Pac-Man because it’s one of my favorite classic arcade games. It was inexpensive to play solo, which meant I played it a lot growing up. The nostalgia and the challenge of trying to recreate a timeless favorite made it the perfect choice.

## 🤖 Prompting Techniques That Worked
To get better results from the AI, I asked it to explain its code like a senior engineer would. This helped me understand the logic behind its decisions and allowed me to troubleshoot more effectively when I hit a wall. It also encouraged me to explore alternate solutions when the initial ones didn’t pan out.

## 💾 How AI Tackled Classic Game Development
Using Claude Sonnet 4, I was able to build a near-perfect Pac-Man clone with just two files: index.html and game.js. The AI handled the base logic surprisingly well. I then challenged myself to scale difficulty and improve level dynamics. With everything working smoothly, I containerized the project using Docker and Docker Compose, allowing the game to run reliably across environments.

## ⚙️ Automation That Saved Time
What would have taken days of manual coding was condensed into minutes with the help of AI. Claude’s ability to scaffold functional game logic saved hours, letting me focus on polish and deployment.

## 🛡️ Safe, AI-Generated Code
The final AI-generated solution was low-risk and secure:

Static files only (HTML/CSS/JS served via NGINX)

No server-side code, databases, or user inputs

No file uploads

Fully containerized

Read-only content
