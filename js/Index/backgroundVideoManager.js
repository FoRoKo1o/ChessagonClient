var videoElement = document.getElementById('backgroundVideo');
videoElement.addEventListener('ended', playNextVideo, false);
setInterval(animateVideoSwitch, 50);
var videoPlaying = 0;
//js cannot search its own assets so it is hard coded. Will be not done in Webassembly
const videos =
    [
        '../art/backgroundVideos/vecteezy_chess-bishop-particles-cinematic-background-video-hd-free_4475284.mp4',
        '../art/backgroundVideos/vecteezy_chess-knight-particles-cinematic-background-video_6435547.mp4',
        '../art/backgroundVideos/vecteezy_rook-chess-strategy-game-cinematic-particles-motion_4475279.mp4'
    ]
function playNextVideo(e) {
    videoPlaying++;
    if (videos.length <= videoPlaying)
        videoPlaying = 0;
    var videoFile = videos[videoPlaying];
    videoElement.setAttribute('src', videoFile);
}
var fadeOut = 0;
var mainContainer = document.getElementById('mainContainer');
var a = 0.5; //opacity of bgColor
function animateVideoSwitch() {
    let opacity = parseFloat(videoElement.style.opacity) || 0;
    if (videoElement.currentTime < 2 && 0.5 < a) {
        a = a - 0.03;
        //float problems
        if (a < 0.5)
            a = 0.5;
        console.log(a);
        changeBackgroundColorOpacity(mainContainer, a);
    }
    if (videoElement.duration - 1 < videoElement.currentTime && a < 1) {
        a = a + 0.05;
        //float problems
        if (1 < a)
            a = 1;
        console.log(a);
        changeBackgroundColorOpacity(mainContainer, a);
    }
}
function changeBackgroundColorOpacity(/*element*/ element, /*float*/ a) {
    match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(getComputedStyle(element).getPropertyValue("background-color"))
    a = a > 1 ? (a / 100) : a;
    element.style.backgroundColor = "rgba(" + [match[1], match[2], match[3], a].join(',') + ")";
}