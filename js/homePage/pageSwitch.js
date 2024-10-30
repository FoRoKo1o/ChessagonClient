var previousContainerElement = document.getElementById('homePage');
function SwitchPages(/*string*/ containerName)
{
    let containerElement = document.getElementById(containerName);
    previousContainerElement.style.display = 'none';
    containerElement.style.display = 'block';
    previousContainerElement = containerElement;
}