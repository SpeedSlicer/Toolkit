let secondsLeft = 0;
const minute_box = document.getElementById("minutes_cycle")
const minute_box_break = document.getElementById("minutes_break")
minute_box.value = 50
minute_box_break.value = 10

let studying = true;
function beginTimer() {
    document.querySelector('.MainBody').classList.toggle('active');
    document.querySelector('.MainBody2').classList.toggle('active');

    document.querySelector('.Overlay').classList.toggle('inactive');
    document.querySelector('.Timerlay').classList.toggle('inactive');
    secondsLeft = minute_box_break.value * 60;
    updateTimer();
    setInterval(updateTimer, 1000);
}

function updateTimer() {
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;
    console.log(hours)
    document.getElementById("timerClock").textContent =
        hours + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");

    if (secondsLeft > 0) {
        secondsLeft--;
    }
}
