export function generatePawnMoves(activeHexagon, possibleMoves) {
    const activeId = parseInt(activeHexagon.id);
    const whitePawnStartPositions = [77, 78, 79, 87, 88, 92, 93, 98, 106];
    const blackPawnStartPositions = [26, 27, 33, 34, 40, 41, 43, 44, 54];

    const pieceImage = activeHexagon.querySelector('img');

    if (!pieceImage) return; // If there is no image, return

    const isWhite = pieceImage.src.includes('white');
    const isOddRow = activeId % 2 !== 0;

    let moveOneStep, moveTwoSteps, attackLeft, attackRight;

    if (isWhite) {
        moveOneStep = activeId - 12;
        moveTwoSteps = activeId - 24;
    } else {
        moveOneStep = activeId + 12;
        moveTwoSteps = activeId + 24;
    }

    if (isOddRow) {
        attackLeft = isWhite ? activeId - 1 : activeId + 13;
        attackRight = isWhite ? activeId + 1 : activeId + 11;
    } else {
        attackLeft = isWhite ? activeId - 11 : activeId + 1;
        attackRight = isWhite ? activeId - 13 : activeId - 1;
    }

    // 1 step move
    if (document.getElementById(moveOneStep) &&
        !document.getElementById(moveOneStep).querySelector('img') &&
        !document.getElementById(moveOneStep).classList.contains('dissabled')) {
        possibleMoves.push(moveOneStep);
    }

    // 2 steps move from start position
    const startPositions = isWhite ? whitePawnStartPositions : blackPawnStartPositions;
    if (startPositions.includes(activeId) &&
        document.getElementById(moveTwoSteps) &&
        !document.getElementById(moveTwoSteps).querySelector('img') &&
        !document.getElementById(moveOneStep).querySelector('img') &&
        !document.getElementById(moveTwoSteps).classList.contains('dissabled')) {
        possibleMoves.push(moveTwoSteps);
    }

    // attack diagonally left
    if (document.getElementById(attackLeft) &&
        document.getElementById(attackLeft).querySelector('img') &&
        document.getElementById(attackLeft).querySelector('img').src.includes(isWhite ? 'black' : 'white') &&
        !document.getElementById(attackLeft).classList.contains('dissabled')) {
        possibleMoves.push(attackLeft);
        document.getElementById(attackLeft).classList.add('attack');
    }

    // attack diagonally right
    if (document.getElementById(attackRight) &&
        document.getElementById(attackRight).querySelector('img') &&
        document.getElementById(attackRight).querySelector('img').src.includes(isWhite ? 'black' : 'white') &&
        !document.getElementById(attackRight).classList.contains('dissabled')) {
        possibleMoves.push(attackRight);
        document.getElementById(attackRight).classList.add('attack');
    }
}
