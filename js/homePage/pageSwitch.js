var previousContainerElement = document.getElementById('homePage');
var animationLength = 500;
function SwitchPages(/*string*/ containerName) {
    let containerElement = document.getElementById(containerName);
    if(containerElement === previousContainerElement)
        return;
    prepareElementToFadeIn(containerElement);
    fadeOut(previousContainerElement);
    fadeIn(containerElement);
    previousContainerElement = containerElement;
}
function fadeOut(/*element*/ container) {
    container.classList.remove("defaultFadeState");
    container.classList.add("fadedOut");
    setTimeout(function () {
        container.style.display = 'none';
        container.classList.remove("fadedOut");
        container.classList.add("defaultFadeState");
    }, animationLength);
}
function fadeIn(/*element*/ container) {
    container.style.display = 'block';
    setTimeout(function(){
        container.classList.add("defaultFadeState");
    }, 5);
    setTimeout(function(){
        container.classList.remove("fadedIn");
    }, animationLength + 5);
}
function prepareElementToFadeIn(/*element*/ container)
{
    container.classList.remove("defaultFadeState");
    container.classList.add("fadedIn");
}