export function generatePawnMoves(activeHexagon, possibleMoves) {
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
