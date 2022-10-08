
let audio = null
const VOLUME = 0.15

function Play()
{
    audio = new Audio("asset/music.mp3");
    audio.volume = VOLUME
    audio.play()
}

function Stop()
{
    audio.pause()
}

function PlayDeathSound()
{
    let deathsound = new Audio("asset/deathsound.mp3");
    deathsound.volume = VOLUME
    deathsound.play()
}



export {Play, Stop, PlayDeathSound}