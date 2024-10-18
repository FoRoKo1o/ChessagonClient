import { generatePawnMoves } from './pawnLogic.js';
import { generateRookMoves } from './rookLogic.js';
import { generateBishopMoves } from './bishopLogic.js';
import { generateQueenMoves } from './QueenLogic.js';
import { ShowModal } from '../promotionModalController.js';
const hexagons = document.querySelectorAll('#hexboard .hexagon');
let activePiece = null;
let possibleMoves = [];
const blackPromotionSquares = [85, 98, 99, 112, 113, 126, 115, 116, 105, 106, 95];
const whitePromotionSquares = [25, 26, 15, 16, 5, 6, 7, 20, 21, 34, 35];

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

    // Check for pawn promotion
    const isWhitePawn = activeImg.src.includes('white') && activeImg.src.includes('pawn');
    const isBlackPawn = activeImg.src.includes('black') && activeImg.src.includes('pawn');
    const moveHexId = parseInt(moveHexagon.id);

    //Sotution 1
    // if (isWhitePawn && whitePromotionSquares.includes(moveHexId)) {
    //     ShowModal(moveHexId, 'white');
    // } else if (isBlackPawn && blackPromotionSquares.includes(moveHexId)) {
    //     ShowModal(moveHexId, 'black');
    // }
    
    // //Solution 2
    if(whitePromotionSquares.includes(moveHexId) || blackPromotionSquares.includes(moveHexId)){
        ShowModal(moveHexId);
    }

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
