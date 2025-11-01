let secondsLeft = 0;
const minute_box = document.getElementById("minutes_cycle");
const minute_box_break = document.getElementById("minutes_break");
const text_blurb = document.getElementById("text_blurb");
const music_system = document.getElementById("musicSystem");
const sound_system = document.getElementById("soundSystem");
const music_toggle = document.getElementById("music_checkbox");

minute_box.value = 50;
minute_box_break.value = 10;
let flip = false;
let studying = false;
const audios = [
  "tracks/1.mp3",
  "tracks/2.mp3",
  "tracks/3.mp3",
  "tracks/4.mp3",
  "tracks/5.mp3",
  "tracks/6.mp3",
  "tracks/7.mp3",
  "tracks/8.mp3",
  "tracks/9.mp3",
  "tracks/10.mp3",
  "tracks/11.mp3",
];
function beginTimer() {
  const randomIndex = Math.floor(Math.random() * audios.length);
  sound_system.src = audios[randomIndex];
  music_system.src = audios[randomIndex];
  music_system.load();
  if (music_toggle && music_toggle.checked) {
    music_system.play().catch((e) => console.warn('audio play prevented:', e));
  }

  document.querySelector(".MainBody").classList.toggle("active");
  document.querySelector(".image_div").classList.toggle("active");
  document.querySelector(".Overlay").classList.toggle("inactive");
  document.querySelector(".Timerlay").classList.toggle("inactive");
  secondsLeft = minute_box_break.value * 60;

  updateTimer();
  setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (music_system.ended) {
    const randomIndex = Math.floor(Math.random() * audios.length);
    music_system.src = audios[randomIndex];
    music_system.load();
    if (music_toggle && music_toggle.checked) {
      music_system.play().catch((e) => console.warn('audio play prevented:', e));
    }
  }
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  document.getElementById("timerClock").textContent =
    hours +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");

  if (secondsLeft > 0) {
    secondsLeft--;
  } else {
    studying = !studying;
    document.getElementById("alarmSystem").play().catch((e) => console.warn('audio play prevented:', e));
    if (studying) {
      secondsLeft = minute_box.value * 60;
      text_blurb.textContent = "- Keep Persisting!";
    } else {
      secondsLeft = minute_box_break.value * 60;
      text_blurb.textContent =
        "- Plan out your Study! Get a Snack/Drink! Tidy Your Desk!";
    }
  }
  document.title =
    hours +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");

  flipImage();
}

function flipImage() {
  const img = document.getElementById("joe");
  if (studying == true) {
    img.src = flip ? "resources/Dos.png" : "resources/Uno.png";
  } else {
    img.src = flip ? "resources/Cofieren2.png" : "resources/Cofieren.png";
  }

  flip = !flip;
}
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('musicSystem');
    const volumeSlider = document.getElementById('volumeSlider');
  if (audio && volumeSlider) {
    audio.volume = parseFloat(volumeSlider.value) || 1;

    volumeSlider.addEventListener('input', function() {
      audio.volume = parseFloat(this.value) || 1;
    });
  }
});