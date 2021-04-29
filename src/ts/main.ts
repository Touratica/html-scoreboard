let min: number = 25;
let sec: number = 0;
let millis: number = 0;

type Score = {
  home: number;
  away: number;
};

let score: Score = {
  home: 0,
  away: 0,
};

let date: number = 0;

let stopTime: boolean = true;

export function __init__() {
  const form: HTMLFormElement | null = document.querySelector("#settings");

  if (form)
    form.onsubmit = (e) => {
      e.preventDefault(); // Prevents page from reloading when form is submitted
      const formData = new FormData(form);

      const homeInitials = document.querySelector<HTMLElement>("#home");
      if (homeInitials)
        homeInitials.innerHTML = formData.get("home-team-input") as string;

      score.home = parseInt(formData.get("home-score-input") as string);
      const homeScoreElement = document.querySelector<HTMLElement>(
        "#home-score"
      );
      if (homeScoreElement) homeScoreElement.innerHTML = `${score.home}`;

      const homeColor = document.querySelector<HTMLElement>("#home-colors");
      if (homeColor)
        homeColor.style.backgroundColor = formData.get(
          "home-color-input"
        ) as string;

      const awayTeam = document.querySelector<HTMLElement>("#away");
      if (awayTeam)
        awayTeam.innerHTML = formData.get("away-team-input") as string;

      score.away = parseInt(formData.get("away-score-input") as string);
      const awayScoreElement = document.querySelector<HTMLElement>(
        "#away-score"
      );
      if (awayScoreElement) awayScoreElement.innerHTML = `${score.away}`;

      const awayColor = document.querySelector<HTMLElement>("#away-colors");
      if (awayColor)
        awayColor.style.backgroundColor = formData.get(
          "away-color-input"
        ) as string;

      const timer = document.querySelector<HTMLElement>("#time");
      if (timer) timer.innerHTML = formData.get("timer-input") as string;
      const time = (formData.get("timer-input") as string).split(":");
      min = parseInt(time[0]);
      sec = parseInt(time[1]);
      millis = 0;
    };

  document.addEventListener("keydown", keydownListener);
  countdown(); // Sets timer in countdown mode
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
    case "w": // Increases home score by 1
      increaseScore("home");
      break;
    case "e": // Increases away score by 1
      increaseScore("away");
      break;
    case "s": // Decreases home score by 1
      decreaseScore("home");
      break;
    case "d": // Decreases away score by 1
      decreaseScore("away");
      break;
  }
  document.addEventListener("keydown", keydownListener);
}

function toggleTimer() {
  stopTime = !stopTime;
  date = Date.now();
}

function countdown() {
  if (!stopTime) {
    let timePassed = (Date.now() - date) / 10; // Check for how long it's been since the last time the next line ran
    date = Date.now();

    millis -= timePassed;

    if (millis <= 0) {
      sec -= 1;
      millis += 100;
    }

    if (sec < 0) {
      min -= 1;
      sec = 59;
    }

    if (min < 0) {
      stopTime = true;
      setTimeout(countdown, 10);
      return;
    }

    const timer = document.querySelector<HTMLElement>("#time");
    if (timer) {
      if (min > 0 && sec > 0)
        timer.innerHTML = `${min}:${
          sec >= 10 ? Math.floor(sec) : `0${Math.floor(sec)}`
        }`;
      else
        timer.innerHTML = `${sec}.${
          millis >= 10 ? Math.floor(millis) : `0${Math.floor(millis)}`
        }`;
    }
  }
  setTimeout(countdown, 10);
}

function increaseScore(side: "home" | "away") {
  switch (side) {
    case "home":
      if (score.home < 99) {
        score.home += 1;
        const homeScoreElement = document.querySelector<HTMLElement>(
          "#home-score"
        );
        if (homeScoreElement) homeScoreElement.innerHTML = `${score.home}`;
      }
      return;
    case "away":
      if (score.away < 99) {
        score.away += 1;
        const awayScoreElement = document.querySelector<HTMLElement>(
          "#away-score"
        );
        if (awayScoreElement) awayScoreElement.innerHTML = `${score.away}`;
      }
      return;
  }
}

function decreaseScore(side: "home" | "away") {
  switch (side) {
    case "home":
      if (score.home > 0) {
        score.home -= 1;
        const homeScoreElement = document.querySelector<HTMLElement>(
          "#home-score"
        );
        if (homeScoreElement) homeScoreElement.innerHTML = `${score.home}`;
      }
      return;
    case "away":
      if (score.away > 0) {
        score.away -= 1;
        const awayScoreElement = document.querySelector<HTMLElement>(
          "#away-score"
        );
        if (awayScoreElement) awayScoreElement.innerHTML = `${score.away}`;
      }
      return;
  }
}
