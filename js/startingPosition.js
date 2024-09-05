
// Clear board
function clearHexboard() {
    const hexagons = document.querySelectorAll('#hexboard .hexagon');
    hexagons.forEach(hex => {
        hex.innerHTML = '';
    });
}

function setPieceImages() {
   // Starting black possition
const blackPieces = {
    5: "black_queen.png",
    6: "black_bishop.png",
    7: "black_king.png",
    15: "black_rook.png",
    16: "black_knight.png",
    18: "black_bishop.png",
    20: "black_knight.png",
    21: "black_rook.png",
    26: "black_pawn.png",
    30: "black_bishop.png",
    27: "black_pawn.png",
    33: "black_pawn.png",
    34: "black_pawn.png",
    40: "black_pawn.png",
    41: "black_pawn.png",
    43: "black_pawn.png",
    44: "black_pawn.png",
    54: "black_pawn.png",
};

const whitePieces = {
    77: "white_pawn.png",
    78: "white_pawn.png",
    79: "white_pawn.png",
    87: "white_pawn.png",
    88: "white_pawn.png",
    92: "white_pawn.png",
    93: "white_pawn.png",
    98: "white_pawn.png",
    99: "white_rook.png",
    102: "white_bishop.png",
    105: "white_rook.png",
    106: "white_pawn.png",
    112: "white_knight.png",
    113: "white_queen.png",
    114: "white_bishop.png",
    115: "white_king.png",
    116: "white_knight.png",
    126: "white_bishop.png",
};

// Note: Testing individual pieces

// const blackPieces = {
//     66: "black_rook.png",
//     //65: "black_rook.png",
// };
// const whitePieces = {
//     // 18: "white_pawn.png",
//     // 46: "white_pawn.png",
//     // 86: "white_pawn.png",
//     // 64: "white_rook.png",
// }

    const allPieces = {...blackPieces, ...whitePieces};

    Object.keys(allPieces).forEach(id => {
        const hexagon = document.getElementById(id);
        const img = document.createElement('img');
        img.src = `../Art/${allPieces[id]}`;
        img.alt = allPieces[id].split('.')[0];
        hexagon.appendChild(img);
    });
}
