const audio = document.getElementById("audioPlayer");
const playlist = document.getElementById("playlist");
const songs = document.getElementsByTagName("li");
// 播放音源的名称
const currentSongName = document.getElementsByClassName(
  "currentPlayingTrackName"
)[0];

// 初始化播放音源的索引
let currentSong = 0;

// 设置初始歌曲源
audio.src = songs[currentSong].getAttribute("song");
currentSongName.innerHTML = songs[currentSong].textContent;

/**
 *
 * @param {Number} index 歌曲索引值
 */
function setPlaying(index) {
  for (const song of songs) {
    song.classList.remove("playing");
  }
  songs[index].classList.add("playing");
  const songSrc = songs[index].getAttribute("song");

  // 设置播放源名称
  currentSongName.innerHTML = songs[index].textContent;

  audio.src = songSrc;
  audio.play();
}

playlist.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const nextSongIndex = Array.from(songs).indexOf(e.target);

    if (currentSong !== nextSongIndex) {
      currentSong = nextSongIndex;
      setPlaying(currentSong);
    } else {
      audio.paused ? audio.play() : audio.pause();
    }
  }
});

audio.addEventListener("ended", function () {
  currentSong++;
  if (currentSong === songs.length) {
    currentSong = 0;
  }
  setPlaying(currentSong);
});