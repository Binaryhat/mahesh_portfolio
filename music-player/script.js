
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer= document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const toggleSwitchAutoPlay = document.querySelector('#autoplaySwitch');

let autoplayOption=false;
//Music
const songs=[
    {
        name:'jacinto-1',
        displayName:'Electric Chill Machhine',
        artist:'Jacinto Design'
    },
    {
        name:'jacinto-2',
        displayName:'Seven Nation Army (Remix)',
        artist:'Jacinto Design'
    },
    {
        name:'jacinto-3',
        displayName:'Goodnight, Disco Queen',
        artist:'Jacinto Design'
    },
    {
        name:'metric-1',
        displayName:'Front Row (Remix)',
        artist:'Jacinto Design'
    }
];

//check if playing
let isPlaying=false;
//play
function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}
//pause
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}


// play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong(): playSong()));

//Update Dom
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src =`music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current song
let songIndex=0;

//prev song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//onload select first
loadSong(songs[songIndex]);
// update progress bar and time
function updateProgressBar(e){
    if(isPlaying){
        const{duration, currentTime}=e.srcElement;
        //update progress bar
        const progressPercentage = (currentTime/duration)*100;
        progress.style.width=`${progressPercentage}%`;

        //calculate dispaly for duration
        const durationMunutes = Math.floor(duration/60);
        let durationseconds = Math.floor(duration%60);
        if(durationseconds<10){
            durationseconds = `0${durationseconds}`;
        }
        //delay swithching the duration element to avoid NaN
        if(durationseconds){            
            durationEl.textContent =  `${durationMunutes}: ${durationseconds}`;
        }
        //calculate dispaly for current
        const currentMunutes = Math.floor(currentTime/60);
        let currentseconds = Math.floor(currentTime%60);
        if(currentseconds<10){
            currentseconds = `0${currentseconds}`;
        }
        currentTimeEl.textContent=`${currentMunutes}: ${currentseconds}`
    }
}

//toggle autoplay option
function toggleAutoPlayOption(){
    autoplayOption = !autoplayOption;
}
//autoplay next song
function autoPlayNextSong(){
    if(autoplayOption){
        nextSong();
    }else{
        pauseSong();
    }
}
//set progress bar
function setProgressBar(e){
    const width = this.clientWidth;
    console.log('width',width);
    const clickX = e.offsetX;
    console.log('clickX',clickX);
    const {duration}=music;
    music.currentTime = (clickX /width) * duration;

}
//Event Listners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);
music.addEventListener('ended',autoPlayNextSong);
toggleSwitchAutoPlay.addEventListener('click',toggleAutoPlayOption);


