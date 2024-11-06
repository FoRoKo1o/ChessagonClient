var firstPageToLoad = 'homePage';
var previousContainerElement = document.getElementById(firstPageToLoad);
var animationLength = 500;
var searchedClass = 'animatedElementClass';
var fadeOutTimerMap = new Map();
window.onload(pageinit(firstPageToLoad))
function pageinit(/*string*/ containerName)
{
    let containerElement = document.getElementById(containerName);
    let newElementsToAnimate = getChildElementsByClass(containerElement, searchedClass)
    for (let i = 0; i < newElementsToAnimate.length; i++) {
        prepareElementToFadeIn(newElementsToAnimate[i], i);
    }
    for (let i = 0; i < newElementsToAnimate.length; i++) {
        fadeIn(newElementsToAnimate[i]);
    }
    previousContainerElement = containerElement;
}
function switchPages(/*string*/ containerName) {
    let containerElement = document.getElementById(containerName);
    if (containerElement === previousContainerElement)
        return;
    let newElementsToAnimate = getChildElementsByClass(containerElement, searchedClass)
    let oldElementsToAnimate = getChildElementsByClass(previousContainerElement, searchedClass);
    for (let i = 0; i < newElementsToAnimate.length; i++) {
        prepareElementToFadeIn(newElementsToAnimate[i], i);
    }
    for (let i = 0; i < oldElementsToAnimate.length; i++) {
        fadeOut(oldElementsToAnimate[i]);
    }
    for (let i = 0; i < newElementsToAnimate.length; i++) {
        fadeIn(newElementsToAnimate[i]);
    }
    previousContainerElement = containerElement;
}
function fadeOut(/*element*/ container) {
    container.classList.remove("defaultFadeState");
    container.classList.add("fadedOut");
    fadeOutTimerMap.set(container.id, setTimeout(function () {
        container.style.display = 'none';
        container.classList.remove("fadedOut");
        fadeOutTimerMap.set(container.id, 0);
    }, animationLength));
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
function prepareElementToFadeIn(/*element*/ container, /*int*/ i) {
    if (fadeOutTimerMap.get(container.id)) {
        clearTimeout(fadeOutTimerMap.get(container.id));
        container.style.display = 'none';
        container.classList.remove("fadedOut");
    }
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