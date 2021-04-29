import { Timer } from "./Timer.js";

let timer = new Timer(25, 0);

export function __init__() {
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
  timer.countdown(); // Sets timer in countdown mode
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
      timer.toggleTimer();
      break;
  }
  document.addEventListener("keydown", keydownListener);
}
