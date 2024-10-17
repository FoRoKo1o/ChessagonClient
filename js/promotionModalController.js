const modal = document.getElementsByClassName("myModal")[0];
const whiteColor = "white";
const blackColor = "black";
const collectionOfPromotedPieces = ["bishop","rook","knight","queen"];
function ShowModal(/*type: number*/hexId)
{
    var color = GetChessPieceColor(hexId);
    modal.style.display = "block";
    LoadImages(color);
}
function CloseModal()
{
    modal.style.display = "none";
}
function LoadImages(/*string*/color)
{
    var imageBorders = document.getElementsByClassName("ImageForSelection");
    var i = 0;
    imageBorders.forEach(element => {
        var imageName = color;
        imageName += "_" + collectionOfPromotedPieces[i] + ".png";
        var image = document.createElement("img")
        image.src = imageName;
        element.AppendChild(image);
        i++;
    });
}