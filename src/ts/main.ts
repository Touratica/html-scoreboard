let min: number = 1;
let sec: number = 20;
let millis: number = 99;

let date: number;

let stopTime = true;

function __init__() {
  const form: HTMLFormElement | null = document.querySelector("#settings");

  if (form)
    form.onsubmit = (e) => {
      e.preventDefault(); // Prevents page from reloading when form is submitted
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

/**
 * Disables listener for keydown event, triggers the pressed key's corresponding
 * function and enables the event listener again.
 *
 * @param {KeyboardEvent} e - The event used to extract the pressed key
 */
function keydownListener(e: KeyboardEvent) {
  document.removeEventListener("keydown", keydownListener);
  switch (e.key) {
    case "p": // Starts/stops the countdown timer
      toggleTimer();
      break;
  }
  document.addEventListener("keydown", keydownListener);
}

function toggleTimer() {
  stopTime = !stopTime;
  date = Date.now();
}

function timerCycle() {
  if (!stopTime) {
    let timePassed = (Date.now() - date) / 1000; // Check for how long it's been since the last time the next line ran
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
