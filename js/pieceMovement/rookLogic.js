export function generateRookMoves(activeHexagon, possibleMoves) {
    const activeId = parseInt(activeHexagon.id);
    const isOddRow = activeId % 2 !== 0;

    const pieceImage = activeHexagon.querySelector('img');
    if (!pieceImage) return;

    // Ustal kolor aktywnej wieży
    const isWhitePiece = pieceImage.src.includes('white');

    // Funkcja pomocnicza sprawdzająca, czy można kontynuować ruch w danym kierunku
    function canMoveTo(hexId) {
        const hex = document.getElementById(hexId);
        return hex && !hex.classList.contains('dissabled');
    }

    // Funkcja dodająca ruchy w pionie (góra-dół)
    function addMovesInDirection(step) {
        let nextHexId = activeId + step;

        while (true) {
            const nextHex = document.getElementById(nextHexId);
            
            if (!nextHex || nextHex.classList.contains('dissabled')) {
                break;  // Jeśli pole nie istnieje lub jest zablokowane, zatrzymaj ruch w tym kierunku
            }

            const pieceImg = nextHex.querySelector('img');
            
            if (pieceImg) {
                if ((isWhitePiece && pieceImg.src.includes('black')) || 
                    (!isWhitePiece && pieceImg.src.includes('white'))) {
                    // Jeśli na tym polu stoi pionek przeciwnika, dodaj możliwość ataku
                    possibleMoves.push(nextHexId);
                    nextHex.classList.add('attack');
                }
                break;  // Zatrzymaj ruch, ponieważ pole jest zajęte (nie można kontynuować)
            } else {
                // Dodaj pole jako możliwy ruch, jeśli jest puste
                possibleMoves.push(nextHexId);
            }

            nextHexId += step;
        }
    }

    // Funkcja dodająca ruchy po przekątnych
    function addDiagonalMoves(startId, directionOdd, directionEven) {
        let currentId = startId;

        while (true) {
            const isOdd = currentId % 2 !== 0;  // Czy rząd nieparzysty czy parzysty
            const nextHexId = currentId + (isOdd ? directionOdd : directionEven);  // Wybieramy właściwy kierunek
            if (!canMoveTo(nextHexId)) break;  // Jeśli ruch nie jest możliwy, przerwij pętlę

            const nextHex = document.getElementById(nextHexId);
            const pieceImg = nextHex.querySelector('img');
            
            if (pieceImg) {
                if ((isWhitePiece && pieceImg.src.includes('black')) || 
                    (!isWhitePiece && pieceImg.src.includes('white'))) {
                    // Jeśli na tym polu stoi pionek przeciwnika, dodaj możliwość ataku
                    possibleMoves.push(nextHexId);
                    nextHex.classList.add('attack');
                }
                break;  // Zatrzymaj ruch, ponieważ pole jest zajęte (nie można kontynuować)
            } else {
                // Dodaj pole jako możliwy ruch, jeśli jest puste
                possibleMoves.push(nextHexId);
            }

            currentId = nextHexId;
        }
    }

    // Ruchy pionowe
    addMovesInDirection(-12);  // Ruch w górę
    addMovesInDirection(12);   // Ruch w dół

    // Ruchy po przekątnych zależne od parzystości rzędu
    addDiagonalMoves(activeId, -1, -13);  // Przekątna lewo-góra
    addDiagonalMoves(activeId, 11, -1);   // Przekątna lewo-dół
    addDiagonalMoves(activeId, 13, 1);    // Przekątna prawo-dół
    addDiagonalMoves(activeId, 1, -11);   // Przekątna prawo-góra
}
