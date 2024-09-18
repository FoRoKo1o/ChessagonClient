export function generateRookMoves(activeHexagon, possibleMoves) {
    const activeId = parseInt(activeHexagon.id);
    const isOddRow = activeId % 2 !== 0;

    const pieceImage = activeHexagon.querySelector('img');
    if (!pieceImage) return;

    // Get piece color
    const isWhitePiece = pieceImage.src.includes('white');

    // Check if not exedding board
    function canMoveTo(hexId) {
        const hex = document.getElementById(hexId);
        return hex && !hex.classList.contains('dissabled');
    }

    // Horizontal moves
    function addMovesInDirection(step) {
        let nextHexId = activeId + step;

        while (true) {
            const nextHex = document.getElementById(nextHexId);
            
            if (!nextHex || nextHex.classList.contains('dissabled')) {
                break;  //stop movement id given direction when we reach the end of the board
            }

            const pieceImg = nextHex.querySelector('img');
            
            if (pieceImg) {
                if ((isWhitePiece && pieceImg.src.includes('black')) || 
                    (!isWhitePiece && pieceImg.src.includes('white'))) {
                    // Add attack move if enemy piece is on the way
                    possibleMoves.push(nextHexId);
                    nextHex.classList.add('attack');
                }
                break;  // Stop movement because field is occupied
            } else {
                // Add new possible move
                possibleMoves.push(nextHexId);
            }

            nextHexId += step;
        }
    }

    // Diagonal moves
    function addDiagonalMoves(startId, directionOdd, directionEven) {
        let currentId = startId;

        while (true) {
            const isOdd = currentId % 2 !== 0;
            const nextHexId = currentId + (isOdd ? directionOdd : directionEven);  // choose direction based on current hexagon
            if (!canMoveTo(nextHexId)) break; 

            const nextHex = document.getElementById(nextHexId);
            const pieceImg = nextHex.querySelector('img');
            
            if (pieceImg) {
                if ((isWhitePiece && pieceImg.src.includes('black')) || 
                    (!isWhitePiece && pieceImg.src.includes('white'))) {
                    // Add attack move if enemy piece is on the way
                    possibleMoves.push(nextHexId);
                    nextHex.classList.add('attack');
                }
                break;
            } else {
                possibleMoves.push(nextHexId);
            }

            currentId = nextHexId;
        }
    }

    // Veritical moves
    addMovesInDirection(-12);  // Up
    addMovesInDirection(12);   // Down

    // Diagonal moves
    addDiagonalMoves(activeId, -1, -13);  // Left-up
    addDiagonalMoves(activeId, 11, -1);   // Left-down
    addDiagonalMoves(activeId, 13, 1);    // Right-down
    addDiagonalMoves(activeId, 1, -11);   // Right-up
}
