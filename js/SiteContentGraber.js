function GetChessPieceColor(hexId)
{
    var boardPiece = document.getElementById(hexId);
    var chessPieceImage = boardPiece.childNodes[0].src;
    var regexWhite = /white+/gi;
    var regexBlack = /black+/gi;
    if(chessPieceImage.match(regexWhite))
    {
        //console.log("white")
        return "white"
    }
    else if(chessPieceImage.match(regexBlack))
    {
        //console.log("black")
        return "black"
    }
    else
        throw new Error("Image name does not match common prefixes rule");
}
function GetChessPieceType(/*img*/ img)
{
    //"bishop","rook","knight","queen"
    if(img.src.includes("bishop"))
        return "bishop";
    if(img.src.includes("rook"))
        return "rook";
    if(img.src.includes("knight"))
        return "knight";
    if(img.src.includes("queen"))
        return "queen";
}

function GetBoardPossition(){
    var boardState = [];

    document.querySelectorAll('#hexboard .hexagon').forEach(hex => {
        const pieceImg = hex.querySelector('img');
        if (pieceImg) {
            const pieceColor = pieceImg.src.includes('white') ? 'white' : 'black';
            const pieceType = pieceImg.src.includes('pawn') ? 'pawn' :
                              pieceImg.src.includes('rook') ? 'rook' :
                              pieceImg.src.includes('bishop') ? 'bishop' :
                              pieceImg.src.includes('queen') ? 'queen' :
                              pieceImg.src.includes('knight') ? 'knight' : null;

            boardState.push({
                position: parseInt(hex.id),
                piece: pieceType,
                color: pieceColor
            });
        }
    });
    return boardState;
}