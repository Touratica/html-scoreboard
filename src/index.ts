import "./styles/globals.css";
import { Scoreboard, type Settings, type Side } from "./scoreboard";

const scoreboard = new Scoreboard();

let min: number = 25;
let sec: number = 0;
let centiseconds: number = 0;

let halfMin: number;
let halfSec: number;
let halfCentiseconds: number;

let hasTTO: boolean;

let date: number = 0;

let stopTime: boolean = true;

let timerFunction: NodeJS.Timer;

function initialize() {
  const form = document.querySelector<HTMLFormElement>("#settings");

  if (form)
    form.onsubmit = (e) => {
      e.preventDefault(); // Prevents page from reloading when form is submitted
      const formData = new FormData(form);

      scoreboard.applySettings(readSettings(formData));
      render();

      const timer = document.querySelector<HTMLParagraphElement>("#time");
      if (timer) timer.innerHTML = formData.get("timer-input") as string;
      const time = (formData.get("timer-input") as string).split(":");
      min = parseInt(time[0]!);
      sec = parseInt(time[1]!);
      centiseconds = 0;

      const halfSetting = formData.get("half-input");
      const GOSetting = formData.get("golden_goal");

      const halfElement = document.querySelector<HTMLParagraphElement>("#half");
      if (halfElement) {
        if (GOSetting) halfElement.innerHTML = `GO`;
        else if (halfSetting) halfElement.innerHTML = `${halfSetting}P`;
      }

      // const countSetting = form.querySelector<HTMLInputElement>(
      //   "input[name='count']:checked",
      // );
      const countSetting = formData.get("count");
      console.log(countSetting);

      if (countSetting) {
        clearInterval(timerFunction);
        switch (countSetting) {
          case "down":
            timerFunction = setInterval(countdown, 10); // Sets timer in countdown mode
            break;
          case "up":
            timerFunction = setInterval(countUp, 10); // Sets timer in count up mode
            break;
        }
      }
    };

  document.addEventListener("keydown", keydownListener);
}

/**
 * Reads the Home and Away settings from the submitted settings form.
 */
function readSettings(formData: FormData): Settings {
  const readTeam = (side: Side) => ({
    name: formData.get(`${side}-team-input`) as string,
    colour: formData.get(`${side}-color-input`) as string,
    score: parseInt(formData.get(`${side}-score-input`) as string),
  });

  return { home: readTeam("home"), away: readTeam("away") };
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
    case "F13": // Starts/stops the countdown timer
      toggleTimer();
      break;
    case "F14": // Increases home score by 1
      scoreboard.incrementScore("home");
      break;
    case "F15": // Increases away score by 1
      scoreboard.incrementScore("away");
      break;
    case "F16": // Decreases home score by 1
      scoreboard.decrementScore("home");
      break;
    case "F17": // Decreases away score by 1
      scoreboard.decrementScore("away");
      break;
    case "F18": // Shows/hides the scoreboard
      scoreboard.toggleVisibility();
      break;
  }
  render();
  document.addEventListener("keydown", keydownListener);
}

function toggleTimer() {
  stopTime = !stopTime;
  date = Date.now();
}

function countdown() {
  if (!stopTime) {
    const timePassed = (Date.now() - date) / 10; // Check for how long it's been since the last time the next line ran
    date = Date.now();

    centiseconds -= timePassed;

    if (centiseconds <= 0) {
      sec -= 1;
      centiseconds += 100;
    }

    if (sec < 0) {
      min -= 1;
      sec = 59;
    }
    if (
      hasTTO &&
      ((min == halfMin && sec == halfSec && centiseconds <= halfCentiseconds) ||
        (min == halfMin && sec < halfSec) ||
        min < halfMin)
    ) {
      hasTTO = false;
      stopTime = true;
      min = halfMin;
      sec = halfSec;
      centiseconds = halfCentiseconds;
    }

    if (min < 0) {
      clearInterval(timerFunction);
      stopTime = true;
      // The next few lines guarantee that the timer shows 0.00 when it reaches the end
      min = 0;
      sec = 0;
      centiseconds = 0;
    }

    const timer = document.querySelector<HTMLDivElement>("#time");
    if (timer) {
      if (min > 0)
        // If theres a minute or more on the timer, it shows minutes and seconds
        timer.innerHTML = `${min}:${sec >= 10 ? sec : `0${sec}`}`;
      // If theres less then a minute on the timer, it only shows the seconds with two decimal places
      else
        timer.innerHTML = `${sec}.${
          centiseconds >= 10
            ? Math.floor(centiseconds)
            : `0${Math.floor(centiseconds)}`
        }`;
    }
  }
}

function countUp() {
  if (!stopTime) {
    const timePassed = (Date.now() - date) / 10; // Check for how long it's been since the last time the next line ran
    date = Date.now();

    centiseconds += timePassed;

    if (centiseconds >= 100) {
      sec += 1;
      centiseconds -= 100;
    }

    if (sec > 59) {
      min += 1;
      sec = 0;
    }

    const timer = document.querySelector<HTMLDivElement>("#time");
    if (timer) {
      // The timer always shows minutes and seconds in count up mode
      timer.innerHTML = `${min >= 10 ? min : `0${min}`}:${
        sec >= 10 ? sec : `0${sec}`
      }`;
    }
  }
}

/**
 * Writes the Scoreboard's display snapshot into the page.
 */
function render() {
  const display = scoreboard.display();

  for (const side of ["home", "away"] as const) {
    const team = display[side];

    const name = document.querySelector<HTMLParagraphElement>(`#${side}`);
    if (name) name.textContent = team.name;

    const score = document.querySelector<HTMLParagraphElement>(
      `#${side}-score`,
    );
    if (score) score.textContent = `${team.score}`;

    const colour = document.querySelector<HTMLDivElement>(`#${side}-colors`);
    if (colour) colour.style.backgroundColor = team.colour;
  }

  const element = document.querySelector<HTMLDivElement>("#scoreboard");
  if (element) element.style.opacity = display.visible ? "1" : "0";
}

initialize();
