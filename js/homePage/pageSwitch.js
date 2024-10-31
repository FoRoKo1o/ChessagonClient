var previousContainerElement = document.getElementById('homePage');
var animationLength = 500;
var searchedClass = 'fixedElementClass';
function SwitchPages(/*string*/ containerName) {
    let containerElement = document.getElementById(containerName);
    containerElement.getElementsByClassName
    if (containerElement === previousContainerElement)
        return;
    let newElementsToAnimate = getChildElementsByClass(containerElement, searchedClass)
    let oldElementsToAnimate = getChildElementsByClass(previousContainerElement, searchedClass);
    for(let i = 0; i < newElementsToAnimate.length; i++)
    {
        prepareElementToFadeIn(newElementsToAnimate[i]);
    }
    for(let i = 0; i < oldElementsToAnimate.length; i++)
    {
        fadeOut(oldElementsToAnimate[i]);
    }
    for(let i = 0; i < newElementsToAnimate.length; i++)
    {
        fadeIn(newElementsToAnimate[i]);
    }
    // prepareElementToFadeIn(containerElement);
    // fadeOut(previousContainerElement);
    // fadeIn(containerElement);
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
    setTimeout(function () {
        container.classList.add("defaultFadeState");
    }, 5);
    setTimeout(function () {
        container.classList.remove("fadedIn");
    }, animationLength + 5);
}
function prepareElementToFadeIn(/*element*/ container) {
    container.classList.remove("defaultFadeState");
    container.classList.add("fadedIn");
}
function getChildElementsByClass(/*element*/ element, /*string*/ className) {
    let matchedElements = [];
    matchedElements.push(element);
    for (var i = 0; i < element.childNodes.length; i++) {
        if (String(element.childNodes[i].className).includes(className)) {
            matchedElements.push(element.childNodes[i]);
        }
    }
    return matchedElements;
}