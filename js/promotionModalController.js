const modal = document.getElementsByClassName("myModal")[0];
const whiteColor = "white";
const blackColor = "black";
const collectionOfPromotedPieces = ["bishop","rook","knight","queen"];
export function ShowModal(/*type: number*/hexId)
{
    var color = GetChessPieceColor(hexId);
    modal.style.display = "block";
    LoadImages(color);
}
function PiecePromotionChoosed(/*img*/ pieceType)
{
    PromotePiece(GetChessPieceType(pieceType));
    modal.style.display = "none";
}
function PromotePiece()
{
    throw new Error("NotImplementedException");
}
function LoadImages(/*string*/color) //HTMLCollection imageBorders does not support forEach
{
    var imageBorders = document.getElementsByClassName("ImageForSelection");
    for (let i = 0; i < imageBorders.length; i++) {
        var element = imageBorders[i];
        var imageName = "../art/" + color + "_" + collectionOfPromotedPieces[i] + ".png";
        var image = document.createElement("img");
        image.src = imageName;
        element.appendChild(image);
    }
}

window.PiecePromotionChoosed = PiecePromotionChoosed; //Fixing the issue with the function not being found in the html file (importing file as a module)