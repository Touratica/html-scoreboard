let min: number = 25;
let sec: number = 0;
let centiseconds: number = 0;

type Score = {
  home: number;
  away: number;
};

let score: Score = {
  home: 0,
  away: 0,
};

let half: { [key: string]: string } = {
  first: "1P",
  second: "2P",
};

let date: number = 0;

let stopTime: boolean = true;
let timeIncrement: -1 | 1 = -1;

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
      centiseconds = 0;

      const halfSetting = form.querySelector<HTMLElement>(
        "input[name='half']:checked"
      );
      const halfElement = document.querySelector<HTMLElement>("#half");
      if (halfSetting && halfElement)
        halfElement.innerHTML =
          half[halfSetting.getAttribute("value") as string];

      const countSetting = form.querySelector<HTMLElement>(
        "input[name='count']:checked"
      );
      if (countSetting) {
        switch (countSetting.getAttribute("value") as string) {
          case "down":
            timeIncrement = -1;
            countdown(); // Sets timer in countdown mode
            break;
          case "up":
            timeIncrement = 1;
            countUp(); // Sets timer in count up mode
            break;
        }
      }
    };

  countdown(); // Sets timer in countdown mode by default
  document.addEventListener("keydown", keydownListener);
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
      increaseScore("home");
      break;
    case "F15": // Increases away score by 1
      increaseScore("away");
      break;
    case "F16": // Decreases home score by 1
      decreaseScore("home");
      break;
    case "F17": // Decreases away score by 1
      decreaseScore("away");
      break;
    case "F18":
      toggleScoreboardVisibility();
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

    centiseconds -= timePassed;

    if (centiseconds <= 0) {
      sec -= 1;
      centiseconds += 100;
    }

    if (sec < 0) {
      min -= 1;
      sec = 59;
    }

    if (min < 0) {
      stopTime = true;
      // The next few lines guarantee that the timer shows 0.00 when it reaches the end
      min = 0;
      sec = 0;
      centiseconds = 0;
    }

    const timer = document.querySelector<HTMLElement>("#time");
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
  if (timeIncrement === -1) setTimeout(countdown, 10);
}

function countUp() {
  if (!stopTime) {
    let timePassed = (Date.now() - date) / 10; // Check for how long it's been since the last time the next line ran
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

    const timer = document.querySelector<HTMLElement>("#time");
    if (timer) {
      // The timer always shows minutes and seconds in count up mode
      timer.innerHTML = `${min >= 10 ? min : `0${min}`}:${
        sec >= 10 ? sec : `0${sec}`
      }`;
    }
  }
  if (timeIncrement === 1) setTimeout(countUp, 10);
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

function hideElement(element: HTMLElement) {
  element.style.visibility = "hidden";
}

function showElement(element: HTMLElement) {
  element.style.visibility = "visible";
}

function toggleScoreboardVisibility() {
  console.log("test");
  const scoreboard = document.querySelector<HTMLElement>("#scoreboard");
  if (scoreboard) {
    if (scoreboard.style.visibility === "visible") {
      hideElement(scoreboard);
      return;
    }
    showElement(scoreboard);
  }
}
