const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");
const volumeSlider = document.getElementById("volumeSlider");
const volumeIcon = document.querySelector(".fa-volume-high");

const songs = [
  {
    title: "Mockingbird",
    name: "Eminem",
    source:
      "./musics/Eminem-Mockingbird.mp3",
  },
  {
    title: "Falling",
    name: "Trevor Daniel",
    source:
      "./musics/Trevor Daniel-Falling.mp3",
  },
  {
    title: "Goosebumps (HVME Remix)",
    name: "Travis Scott",
    source:
      "./musics/Travis Scott-Goosebumps(Remix).mp3",
  },
  {
    title: "Ride",
    name: "Twenty One Pilots",
    source:
      "./musics/twenty one pilots-Ride.mp3",
  },
  {
    title: "Lovely (Hippie S. Remix)",
    name: "Billie Eilish",
    source:
      "./musics/Billie Eilish & Khalid-lovely.mp3",
  },

  {
    title: "Beautiful Things",
    name: "Benson Boone",
    source:
      "./musics/Benson Boone - Beautiful Things.mp3",
  },
  {
    title: "Dancin (KRONO Remix)",
    name: "Aaron Smith",
    source:
      "./musics/Aaron Smith - Dancin.mp3",
  },
  {
    title: "Alors On Danse - Remix",
    name: "Stromae",
    source: 
      "./musics/Stromae - Alors On Danse Remixed.mp3"
  },
  {
    title: "Sweater Weather - Remix",
    name: "The Neighbourhood",
    source: 
      "./musics/The Neighbourhood - Sweater Weather.mp3"
  }
];

let currentSongIndex = 3;
song.volume = volumeSlider.value;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  song.addEventListener("loadeddata", function () {});
}

song.addEventListener("timeupdate", function () {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", function () {
  song.currentTime = progress.value;
});

progress.addEventListener("change", function () {
  playSong();
});

forwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

backwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

volumeSlider.addEventListener("input", function () {
  song.volume = volumeSlider.value;
});

updateSongInfo();

function updateSwiperModifier() {

  const screenWidth = window.innerWidth;

  if (screenWidth < 600) {
    var swiper = new Swiper(".swiper", {
      effect: "coverflow",
      centeredSlides: true,
      initialSlide: 3,
      slidesPerView: "auto",
      allowTouchMove: false,
      spaceBetween: 100,
      coverflowEffect: {
        rotate: 10,
        stretch: 0,
        depth: 300,
        modifier: 2,
        slideShadows: false,
      },
      navigation: {
        nextEl: ".forward",
        prevEl: ".backward",
      },
    });
  } else {
    var swiper = new Swiper(".swiper", {
      effect: "coverflow",
      centeredSlides: true,
      initialSlide: 3,
      slidesPerView: "auto",
      allowTouchMove: false,
      spaceBetween: 100,
      coverflowEffect: {
        rotate: 10,
        stretch: 0,
        depth: 170,
        modifier: 1.2,
        slideShadows: false,
      },
      navigation: {
        nextEl: ".forward",
        prevEl: ".backward",
      },
    });
  }
}

updateSwiperModifier();

volumeSlider.addEventListener("input", function() {
  const volumeValue = parseFloat(this.value);

  // Remove todas as classes de volume do ícone antes de adicionar a classe apropriada
  volumeIcon.classList.remove("fa-volume-mute");
  volumeIcon.classList.remove("fa-volume-low");
  volumeIcon.classList.remove("fa-volume-high");

  if (volumeValue === 0) {
    volumeIcon.classList.add("fa-volume-mute");
  } else if (volumeValue < 0.6) {
    volumeIcon.classList.add("fa-volume-low");
  } else {
    volumeIcon.classList.add("fa-volume-high");
  }
});
