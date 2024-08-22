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

    activePiece = clickedHexagon.id;

    GeneratePossibleMoves(clickedHexagon);
    showPossibleMoves();
}

function GeneratePossibleMoves(activeHexagon) {
    const activeId = parseInt(activeHexagon.id);
    const whitePawnStartPositions = [77, 78, 79, 87, 88, 92, 93, 98, 106];

    const isOddRow = activeId % 2 !== 0;

    const moveOneStep = activeId - 12;
    const moveTwoSteps = activeId - 24;

    let attackLeft, attackRight;

    if (isOddRow) {
        attackLeft = activeId - 1;
        attackRight = activeId + 1;
    } else {
        attackLeft = activeId - 11;
        attackRight = activeId - 13;
    }

    // If white pawn is selected
    if (activeHexagon.querySelector('img').src.includes('white_pawn')) {

        // 1 step move
        if (document.getElementById(moveOneStep) && 
            !document.getElementById(moveOneStep).querySelector('img') &&
            !document.getElementById(moveOneStep).classList.contains('dissabled')) {
            possibleMoves.push(moveOneStep);
        }

        // 2 steps move from start position
        if (whitePawnStartPositions.includes(activeId) &&
            document.getElementById(moveTwoSteps) &&
            !document.getElementById(moveTwoSteps).querySelector('img') &&
            !document.getElementById(moveOneStep).querySelector('img') &&
            !document.getElementById(moveTwoSteps).classList.contains('dissabled')) {
            possibleMoves.push(moveTwoSteps);
        }

        // attack diagonally left
        if (document.getElementById(attackLeft) &&
            document.getElementById(attackLeft).querySelector('img') &&
            document.getElementById(attackLeft).querySelector('img').src.includes('black') &&
            !document.getElementById(attackLeft).classList.contains('dissabled')) {
            possibleMoves.push(attackLeft);
            document.getElementById(attackLeft).classList.add('attack');
        }

        // attack diagonally right
        if (document.getElementById(attackRight) &&
            document.getElementById(attackRight).querySelector('img') &&
            document.getElementById(attackRight).querySelector('img').src.includes('black') &&
            !document.getElementById(attackRight).classList.contains('dissabled')) {
            possibleMoves.push(attackRight);
            document.getElementById(attackRight).classList.add('attack');
        }
    }
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

    // Active piece reset
    clearActivePiece();
    clearPossibleMoves();
    
    // Add new click handlers
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
    });
}

window.onload = function() {
    clearHexboard();     
    setPieceImages();    
    addHexagonClickHandlers();
};
