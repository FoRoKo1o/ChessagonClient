const modal = document.getElementsByClassName("myModal")[0];
const whiteColor = "white";
const blackColor = "black";
const collectionOfPromotedPieces = ["bishop","rook","knight","queen"];

var promotionPieceLocation = null;

export function ShowModal(/*type: number*/hexId)
{
    promotionPieceLocation = hexId;
    var color = GetChessPieceColor(hexId);
    LoadImages(color);
    modal.style.display = "block";
}
function PiecePromotionChoosed(/*img*/ pieceType)
{
    PromotePiece(GetChessPieceType(pieceType));
    modal.style.display = "none";
}
function PromotePiece(pieceType)
{
    //console.log("Promoting pawn at location: " + promotionPieceLocation + " to " + pieceType);
    let promotionHex = document.getElementById(promotionPieceLocation);
    let color = GetChessPieceColor(promotionPieceLocation);
    promotionHex.innerHTML = ""; //remove piece from the board
    let image = document.createElement("img");
    image.src = "../art/" + color + "_" + pieceType + ".png";
    promotionHex.appendChild(image); //add new piece to the board
}
function LoadImages(/*string*/color) //HTMLCollection imageBorders does not support forEach
{
    
    var imageBorders = document.getElementsByClassName("ImageForSelection");
    for (let i = 0; i < imageBorders.length; i++) {
        var element = imageBorders[i];
        element.innerHTML = '';
        var imageName = "../art/" + color + "_" + collectionOfPromotedPieces[i] + ".png";
        var image = document.createElement("img");
        image.src = imageName;
        image.classList.add("imageFitter");
        element.appendChild(image);
    }
}

window.PiecePromotionChoosed = PiecePromotionChoosed; //Fixing the issue with the function not being found in the html file (importing file as a module)