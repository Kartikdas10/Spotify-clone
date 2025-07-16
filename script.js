console.log("Lets write some javasript");

let currentSong = new Audio();
let songs;
function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
  return [
    "PEHLI NAZAR MAIN-Atif Aslam .mp3",
    "TrackTribe - Blue Ribbons.mp3",
    "Wavy Kartik.mp3",
    "Satranga.mp3",
    "Satranga.mp3",
    "Satranga.mp3",
    "Satranga.mp3",
    "Satranga.mp3",
    "Satranga.mp3",
  ];
}

const playMusic = (track, pause = false) => {
  currentSong.src = "/songs/" + encodeURIComponent(track);
  if (!pause) {
    currentSong.play();
    play.src = "pause.svg";
  }

  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
  // Get the list of songs
  songs = await getSongs();
  playMusic(songs[0], true);

  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML += `
      <li><img class="invert" src="music.svg" alt="">     
        <div class="info">
          <div>${song.replaceAll("%20", " ")}</div>
          <div>Kartik</div>
        </div>
        <div class="playnow">
          <span>Play Now</span>
          <img class=" invert"  src="play.svg" alt="">
        </div> 
      </li>`;
  }

  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      const audio = e.querySelector(".info").firstElementChild.innerHTML.trim();
      playMusic(audio);
    });
  });

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });

  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )}/${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });

  const next = document.getElementById("next");

next.addEventListener("click", () => {
  let current = decodeURIComponent(currentSong.src.split("/songs/")[1]);
  let index = songs.indexOf(current);

  if (index + 1 < songs.length) {
    playMusic(songs[index + 1]);
  } else {
    // Optional: restart from the beginning
    playMusic(songs[0]);
  }
});

  const previous = document.getElementById("previous");

previous.addEventListener("click", () => {
  let current = decodeURIComponent(currentSong.src.split("/songs/")[1]);
  let index = songs.indexOf(current);

  if (index > 0) {
    playMusic(songs[index - 1]);
  } else {
    // Optional: go to last song if already at the first
    playMusic(songs[songs.length - 1]);
  }
});


  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      currentSong.volume = parseInt(e.target.value) / 100;
    });
}


  document.querySelector(".signupbtn").addEventListener("click", () => {
  window.location.href = "signup.html"; // this will load signup.html
  });


main();