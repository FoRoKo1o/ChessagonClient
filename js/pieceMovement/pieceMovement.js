import { generatePawnMoves } from './pawnLogic.js';
import { generateRookMoves } from './rookLogic.js';
import { generateBishopMoves } from './bishopLogic.js';
import { generateQueenMoves } from './QueenLogic.js';
const hexagons = document.querySelectorAll('#hexboard .hexagon');
let activePiece = null;
let possibleMoves = [];

function clearActivePiece() {
    activePiece = null;
}

function onHexagonClick(event) {
    const clickedHexagon = event.currentTarget;

    if (activePiece) {
        clearActivePiece();
        clearPossibleMoves();
    }

    // If pawn is clicked
    const pieceImage = clickedHexagon.querySelector('img');
    if (pieceImage && pieceImage.src.includes('pawn')) {
        activePiece = clickedHexagon.id;

        generatePawnMoves(clickedHexagon, possibleMoves);
    }
    // If bishop is clicked
    if (pieceImage && pieceImage.src.includes('bishop')) {
        activePiece = clickedHexagon.id;

        generateBishopMoves(clickedHexagon, possibleMoves);
    }
    // If rook is clicked
    if (pieceImage && pieceImage.src.includes('rook')) {
        activePiece = clickedHexagon.id;

        generateRookMoves(clickedHexagon, possibleMoves);
    }
    // if Queen is clicked
    if (pieceImage && pieceImage.src.includes('queen')) {
        activePiece = clickedHexagon.id;

        generateQueenMoves(clickedHexagon, possibleMoves);
    }    
    showPossibleMoves();
}

function showPossibleMoves() {
    possibleMoves.forEach(moveId => {
        const moveHexagon = document.getElementById(moveId);

        if (moveHexagon) {
            const img = document.createElement('img');

            if (moveHexagon.classList.contains('attack')) {
                img.src = `../Art/attack.png`;
                img.classList.add('attack-icon');
            } else {
                img.src = `../Art/possibleMove.png`;
            }

            img.alt = 'possible move';
            moveHexagon.appendChild(img);

            moveHexagon.onclick = onPossibleMoveClick;
        }
    });
}

function onPossibleMoveClick(event) {
    const moveHexagon = event.currentTarget;

    const activeHexagon = document.getElementById(activePiece);
    const activeImg = activeHexagon.querySelector('img');

    const moveIdIndex = possibleMoves.indexOf(parseInt(moveHexagon.id));
    if (moveIdIndex > -1) {
        possibleMoves.splice(moveIdIndex, 1);
    }

    moveHexagon.innerHTML = '';
    moveHexagon.appendChild(activeImg);

    clearActivePiece();
    clearPossibleMoves();
    
    addHexagonClickHandlers();
}

function clearPossibleMoves() {
    possibleMoves.forEach(moveId => {
        const moveHexagon = document.getElementById(moveId);

        if (moveHexagon) {
            const possibleMoveImg = moveHexagon.querySelector('img[alt="possible move"]');
            const attackImg = moveHexagon.querySelector('.attack-icon');
            
            if (possibleMoveImg) {
                possibleMoveImg.remove();
            }

            if (attackImg) {
                attackImg.remove();
                moveHexagon.classList.remove('attack');
            }
            moveHexagon.onclick = null;
        }
    });

    possibleMoves = [];
}

function addHexagonClickHandlers() {
    hexagons.forEach(hex => {
        if (!hex.classList.contains('dissabled') && hex.querySelector('img')) {
            hex.onclick = onHexagonClick;
        } else {
            hex.onclick = null;
        }
        hex.classList.remove('attack');
    });
}

window.onload = function() {
    clearHexboard();     
    setPieceImages();    
    addHexagonClickHandlers();
};
