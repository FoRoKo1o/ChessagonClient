function GetChessPieceColor(hexId)
{
    var boardPiece = document.getElementById(hexId);
    var chessPieceImage = boardPiece.childNodes[0].src;
    var regexWhite = /white+/gi;
    var regexBlack = /black+/gi;
    if(chessPieceImage.match(regexWhite))
    {
        console.log("white")
        return "white"
    }
    else if(chessPieceImage.match(regexBlack))
    {
        console.log("black")
        return "black"
    }
    else
        throw new Error("Image name does not match common prefixes rule");
}