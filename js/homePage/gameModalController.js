var animationDuration = 500;
var isMultiplayer;
function OpenGameModesModal(/*string*/ modalId, /*bool*/ multiplayer)
{
    isMultiplayer = multiplayer;
    let modalElement = document.getElementById(modalId);
    modalElement.classList.add('fadedIn');
    modalElement.style.display = 'block';
    setTimeout(function() {
        modalElement.classList.add('defaultFadeState');
    },5)
    setTimeout(function() {
        modalElement.classList.remove('fadedIn');
        modalElement.classList.remove('defaultFadeState');
    },animationDuration);
}
function CloseGameModesModal(/*string*/ modalId)
{
    let modalElement = document.getElementById(modalId);
    modalElement.classList.add('fadedOut');
    setTimeout(function(){
        modalElement.style.display = 'none';
        modalElement.classList.remove('fadedOut');
    }, animationDuration);
}
function StartGame(/*string*/ specificGameMode)
{
    sessionStorage.setItem('singlePlayerGameMode', specificGameMode);
    window.location.href = 'board.html';
}