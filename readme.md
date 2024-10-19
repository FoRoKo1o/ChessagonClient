# HEXAGON - Hexagonal Chess Game

## Overview

This project is a hexagonal chess game built for the web. The game implements classic chess logic adapted to a hexagonal board, allowing for unique movement dynamics compared to the traditional square board. The game is developed using JavaScript, HTML, and CSS, and it offers players the opportunity to explore how chess pieces move and interact in a hexagonal setting. Inspiration form [
CGP Grey](https://www.youtube.com/watch?v=bgR3yESAEVE).

<p align="center">
    <img src="/Art/Preview/StartingPosition.png" alt="Starting Position" />
  </p>

## Piece Movement

Each piece’s movement is adapted to the hexagonal layout:

### Pawn
Moves forward one step, with optional diagonal attacks. Special movement rules apply for the first move, allowing a two-step forward move.

<p align="center">
    <img src="/Art/Preview/PawnMovement.png" alt="Pawn movement" />
  </p>

When a pawn reaches the last row of the opponent's side, a modal appears for the player to choose a new piece (e.g., queen, rook, bishop, or knight) to replace the pawn.

<p align="center">
    <img src="/Art/Preview/PawnPromotion.png" alt="Pawn promotion" />
  </p>

### Rook
Moves in straight lines across the board's hexagonal axes.
<p align="center">
    <img src="/Art/Preview/RookMovement.png" alt="Rook movement" />
  </p>

### Bishop
Moves diagonally along the hexagonal grid.
<p align="center">
    <img src="/Art/Preview/BishopMovement.png" alt="Bishop movement" />
  </p>

### Queen
Combines the movement capabilities of the rook and bishop, moving both in straight and diagonal lines.
<p align="center">
    <img src="/Art/Preview/QueenMovement.png" alt="Queen movement" />
  </p>

### Knight
Follows an adapted "L"-shaped movement specific to the hexagonal grid, allowing the knight to jump over pieces.
<p align="center">
    <img src="/Art/Preview/KnightMovement.png" alt="Knight movement" />
  </p>

### King
Moves one step in any direction (straight or diagonal).
<p align="center">
    <img src="/Art/Preview/KingMovement.png" alt="King movement" />
  </p>



## Technologies Used

- **JavaScript**: Core logic for the game including piece movement, turns, and game rules.
- **HTML/CSS**: Structure and styling for the hexagonal board and user interface.

# Contributors

<a href="https://github.com/FoRoKo1o/Chessagonclient/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=FoRoKo1o/Chessagonclient" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

**Art**
- [sword icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/sword)
- [chess pieces created by Ajay Karat](http://devilswork.shop/)
