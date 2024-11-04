var initialTimerValueMinutes = 0;
var initialTimerValueSeconds = 0;
var timerIncrementSeconds = 0;
var whitePlayerTimerElement = document.getElementById('playerWhiteTimer');
var blackPlayerTimerElement = document.getElementById('playerBlackTimer');
export var whiteMoves = true;
window.onload = loadTimers();
window.onload = startTimers(whitePlayerTimerElement, whiteTimeInMilisecounds);
function startTimers(/*element*/ playerTimerElement, /*number*/ playerTimeInMiliseconds) {
    timeOfLastTurnEnd = Date.now();
    activeTimerIntervalID = setInterval(function () {
        playerTimerElement.innerText =
            ParseMilisecondsToTimerTime(playerTimeInMiliseconds - (Date.now() - timeOfLastTurnEnd));
    }, 100)
}
var whiteTimeInMilisecounds;
var blackTimeInMilisecounds;
var timeOfLastTurnEnd;
var activeTimerIntervalID;
export function changePlayerTurn() {
    changeActiveTimer();
    whiteMoves = !whiteMoves;
}
function changeActiveTimer() {
    clearInterval(activeTimerIntervalID);
    let timeOfLastMove = Date.now() - timeOfLastTurnEnd;
    if (whiteMoves) {
        whiteTimeInMilisecounds = whiteTimeInMilisecounds - timeOfLastMove;
        whiteTimeInMilisecounds += parseInt(timerIncrementSeconds) * 1000;
        whitePlayerTimerElement.innerText = ParseMilisecondsToTimerTime(whiteTimeInMilisecounds);
        startTimers(blackPlayerTimerElement, blackTimeInMilisecounds);
    }
    else {
        blackTimeInMilisecounds = blackTimeInMilisecounds - timeOfLastMove;
        blackTimeInMilisecounds += parseInt(timerIncrementSeconds) * 1000;
        blackPlayerTimerElement.innerText = ParseMilisecondsToTimerTime(blackTimeInMilisecounds);
        startTimers(whitePlayerTimerElement, whiteTimeInMilisecounds);
    }
    timeOfLastTurnEnd = Date.now();
}
function loadTimers() {
    let gamemode = sessionStorage.getItem('singlePlayerGameMode');
    let gamemodeValues = gamemode.split('|');
    initialTimerValueMinutes = gamemodeValues[0];
    if (gamemodeValues.length == 2)
        timerIncrementSeconds = gamemodeValues[1];
    whiteTimeInMilisecounds = initialTimerValueMinutes * 60 * 1000;
    blackTimeInMilisecounds = initialTimerValueMinutes * 60 * 1000;
    let formattedTimeMinutes = String(initialTimerValueMinutes).padStart(2, '0');
    let formattedTimeSeconds = String(initialTimerValueSeconds).padStart(2, '0');
    whitePlayerTimerElement.innerText = formattedTimeMinutes + ':' + formattedTimeSeconds;
    blackPlayerTimerElement.innerText = formattedTimeMinutes + ':' + formattedTimeSeconds;
}
function ParseMilisecondsToTimerTime(/*number*/ miliseconds) {
    checkAndExecuteTimeWinCondition(miliseconds);
    let timerMiliseconds = parseInt((miliseconds % 1000) / 100);
    let timerSeconds = parseInt((miliseconds / 1000) % 60);
    let timerMinutes = parseInt(miliseconds / 1000 / 60);
    let timerValue = '';
    if (timerMinutes != 0) {
        timerValue += String(timerMinutes).padStart(2, '0');
        timerValue += ':';
    }
    timerValue += String(timerSeconds).padStart(2, '0');
    if (timerMinutes == 0) {
        timerValue += '.';
        timerValue += timerMiliseconds;
    }
    return timerValue;
}
function checkAndExecuteTimeWinCondition(miliseconds) {
    if (0 < miliseconds)
        return;
    clearInterval(activeTimerIntervalID);
    let popupWindow = document.getElementById('winnersPopup');
    var winnerTextDiv = document.getElementById('winner');
    if (whiteMoves)
        winnerTextDiv.innerText = 'Black is the winner!'
    else
        winnerTextDiv.innerText = 'White is the winner!';
    popupWindow.style.opacity = 1;
    popupWindow.style.display = 'block';
}