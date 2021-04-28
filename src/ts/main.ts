let min: number = 1;
let sec: number = 20;
let millis: number = 99;

let date: number;

let stopTime = true;

function __init__() {
  const form: HTMLFormElement | null = document.querySelector("#settings");

  if (form)
    form.onsubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      const homeInitials = document.querySelector("#home");
      if (homeInitials)
        homeInitials.innerHTML = formData.get("home-team-input") as string;

      const homeScore = document.querySelector("#home-score");
      if (homeScore)
        homeScore.innerHTML = formData.get("home-score-input") as string;

      const awayTeam = document.querySelector("#away");
      if (awayTeam)
        awayTeam.innerHTML = formData.get("away-team-input") as string;

      const awayScore = document.querySelector("#away-score");
      if (awayScore)
        awayScore.innerHTML = formData.get("away-score-input") as string;
    };
  document.addEventListener("keydown", keydownListener);
  timerCycle();
}

function keydownListener(e: KeyboardEvent) {
  document.removeEventListener("keydown", keydownListener);
  switch (e.key) {
    case "p":
      toggleTimer();
      break;
  }
  document.addEventListener("keydown", keydownListener);
}

function toggleTimer() {
  document.removeEventListener("keydown", keydownListener);
  stopTime = !stopTime;
  date = Date.now() - (sec % 1) * 1000;
  document.addEventListener("keydown", keydownListener);
}

function timerCycle() {
  if (!stopTime) {
    let timePassed = (Date.now() - date) / 1000;
    date = Date.now();

    sec -= timePassed;

    if (sec <= 0) {
      min -= 1;
      sec += 60;
    }

    const timer = document.querySelector("#time");
    if (timer)
      timer.innerHTML = `${min}:${
        sec >= 10 ? Math.floor(sec) : `0${Math.floor(sec)}`
      }`;
  }
  setTimeout(timerCycle, 10);
}
