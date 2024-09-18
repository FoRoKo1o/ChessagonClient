export function generateBishopMoves(activeHexagon, possibleMoves) {
    const activeId = parseInt(activeHexagon.id);

    const pieceImage = activeHexagon.querySelector('img');
    if (!pieceImage) return;

    // Get piece color
    const isWhitePiece = pieceImage.src.includes('white');

    // Check if movement is within the board limits
    function canMoveTo(hexId) {
        const hex = document.getElementById(hexId);
        return hex && !hex.classList.contains('dissabled');
    }

    // Add diagonal moves
    function addDiagonalMoves(startId, stepOdd, stepEven) {
        let currentId = startId;

        while (true) {
            const isOdd = currentId % 2 !== 0;  // Check if the current hexagon is odd or even
            const nextHexId = currentId + (isOdd ? stepOdd : stepEven);  // Choose next hex based on parity
            
            if (!canMoveTo(nextHexId)) break;  // Stop if the next hexagon is not accessible

            const nextHex = document.getElementById(nextHexId);
            const pieceImg = nextHex.querySelector('img');

            if (pieceImg) {
                // If an enemy piece is found, add it as an attackable hex
                if ((isWhitePiece && pieceImg.src.includes('black')) || 
                    (!isWhitePiece && pieceImg.src.includes('white'))) {
                    possibleMoves.push(nextHexId);
                    nextHex.classList.add('attack');
                }
                break;  // Stop moving in this direction because the hex is occupied
            } else {
                // Add the hexagon as a possible move
                possibleMoves.push(nextHexId);
            }

            currentId = nextHexId;  // Continue moving in the same direction
        }
    }

    // Add horizontal moves (left and right) starting from the active position
    function addHorizontalMoves(startId) {
        let nextHexId = startId;

        // Move left (decrease by 2)
        while (true) {
            nextHexId -= 2;
            if (!canMoveTo(nextHexId)) break;  // Stop if out of bounds or blocked

            const nextHex = document.getElementById(nextHexId);
            const pieceImg = nextHex.querySelector('img');

            // Additional check: ensure the movement stays on the same row
            if (Math.floor(nextHexId / 12) !== Math.floor(startId / 12)) break;

            if (pieceImg) {
                // If enemy piece is found, allow attack
                if ((isWhitePiece && pieceImg.src.includes('black')) || 
                    (!isWhitePiece && pieceImg.src.includes('white'))) {
                    possibleMoves.push(nextHexId);
                    nextHex.classList.add('attack');
                }
                break;  // Stop if we hit a piece
            } else {
                // Add hex to possible moves
                possibleMoves.push(nextHexId);
            }
        }

        // Move right (increase by 2)
        nextHexId = startId;
        while (true) {
            nextHexId += 2;
            if (!canMoveTo(nextHexId)) break;  // Stop if out of bounds or blocked

            const nextHex = document.getElementById(nextHexId);
            const pieceImg = nextHex.querySelector('img');

            // Additional check: ensure the movement stays on the same row
            if (Math.floor(nextHexId / 12) !== Math.floor(startId / 12)) break;

            if (pieceImg) {
                // If enemy piece is found, allow attack
                if ((isWhitePiece && pieceImg.src.includes('black')) || 
                    (!isWhitePiece && pieceImg.src.includes('white'))) {
                    possibleMoves.push(nextHexId);
                    nextHex.classList.add('attack');
                }
                break;  // Stop if we hit a piece
            } else {
                // Add hex to possible moves
                possibleMoves.push(nextHexId);
            }
        }
    }

    // Add diagonal moves (4 directions)
    addDiagonalMoves(activeId, -13, -25);    // Lewo-góra
    addDiagonalMoves(activeId, 23, 11);      // Lewo-dół
    addDiagonalMoves(activeId, 25, 13);      // Prawo-dół
    addDiagonalMoves(activeId, -11, -23);    // Prawo-góra

    // Add horizontal moves (left and right) from the starting position
    addHorizontalMoves(activeId);
}
