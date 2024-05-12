// Get UI

const getaudioscreen = document.getElementById('audioscreen');
const playbtn = document.getElementById('play'),
    prevbtn = document.getElementById('prev'),
    nextbtn = document.getElementById('next'),
    stopbtn = document.getElementById('stop');
const getprogress = document.getElementById('progress'),
    getprogressbar = document.getElementById('progress-bar');
const getvolprogress = document.getElementById('volumeprogress');
const getdisplaytime = document.getElementById('displaytime');

// add value in src in audio tag
const audios = ['sample1', 'sample2', 'sample3'];
// length 3
// index 0 1 2

let curridx = 0;
// console.log(audios[curridx]); //sample1

// loadaudio(audios[curridx]);

function loadaudio(audio) {
    getaudioscreen.src = `./source/${audio}.mp3`;
}

function playaudio() {
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    getaudioscreen.play(); // default html function
}

function pauseaudio() {
    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');

    getaudioscreen.pause(); // default html function
}

function playandpauseaudio() {
    // paused html default keywords for audio/video
    if (getaudioscreen.paused) {
        // getaudioscreen.play();

        playaudio();
    } else {
        // getaudioscreen.pause();

        pauseaudio();
    }
}

function nextaudio() {
    curridx++;

    // 0 1 2    3-1=2
    if (curridx > audios.length - 1) {
        curridx = 0;
    }

    // console.log(curridx);

    loadaudio(audios[curridx]);
    playaudio();
}

function previousaudio() {
    curridx--;

    // 0 1 2    3-1=2
    if (curridx < 0) {
        curridx = audios.length - 1;
    }

    console.log(curridx);

    loadaudio(audios[curridx]);
    playaudio();
}

function updateprogress(e) {
    // console.log(e.target);       // getaudioscreen's element

    // console.log(e.target.duration);
    // console.log(e.target.currentTime);

    // const getduration = e.target.duration;
    // const getcurrenttime = e.target.currentTime;
    // console.log(getduration,getcurrenttime);

    // const {duration,currentTime} = e.target;
    // console.log(duration,currentTime);

    const { duration } = e.target;
    const { currentTime } = e.target;
    // console.log(duration, currentTime);

    if (currentTime === 0) {
        getprogressbar.style.width = '0%';
    } else {
        // 0 to 100
        const progresspercent = (currentTime / duration) * 100;
        //console.log(progresspercent);

        getprogressbar.style.width = `${progresspercent}%`;
    }

    //  forward
    // const mins = Math.floor(currentTime/60);
    // const secs = Math.floor(currentTime%60);

    //backward
    const mins = Math.floor((duration - currentTime) / 60);
    const secs = Math.floor((duration - currentTime) % 60);
    // console.log(mins);
    // console.log(typeof mins); //number

    // method 1
    // if (secs < 10) {
    //     return `0${secs}`;
    // }
    // getdisplaytime.innerText = `${mins}:${secs}`;

    // method 2
    // console.log(typeof mins); //number
    const minutevalue = mins.toString().padStart(2, '0'); // if you use padStart() concat number must string.
    // console.log(minutevalue);
    const secondvalue = secs.toString().padStart(2, '0'); // if you use padStart() concat number must string.

    getdisplaytime.innerText = `-${minutevalue}:${secondvalue}`;
}

function stopaudio() {
    getaudioscreen.currentTime = 0;
    getprogressbar.style.width = '0%';

    pauseaudio();
}

function volumecontrol() {
    // console.log(getvolprogress.value); //   range 0 - 100
    // console.log(getaudioscreen.volume); //      1  default, 0 mute

    // volume defaul key from audio/video
    getaudioscreen.volume = getvolprogress.value / 100;

    // 1 to default (100%)
    // 0.5 half volume (50%)
    // 0 mute (0%)
}

function progressaudioclick(e) {
    // console.log(e.target);
    // console.log(this);

    const width = this.clientWidth;
    // console.log(width);

    const clickx = e.offsetX;
    // console.log(clickx);

    const getduration = getaudioscreen.duration;
    // console.log(getduration);

    getaudioscreen.currentTime = (clickx / width) * getduration;
    // console.log(getaudioscreen.currentTime);
}

getaudioscreen.addEventListener('timeupdate', updateprogress); // progressbar changing
getaudioscreen.addEventListener('play', playaudio);
getaudioscreen.addEventListener('pause', pauseaudio);

playbtn.addEventListener('click', playandpauseaudio);
nextbtn.addEventListener('click', nextaudio); // 0 1 2 0 1 2
prevbtn.addEventListener('click', previousaudio); // 2 1 0 2 1 0
stopbtn.addEventListener('click', stopaudio);
getvolprogress.addEventListener('change', volumecontrol);
getprogress.addEventListener('click', progressaudioclick);
