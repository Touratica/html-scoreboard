import "./styles/globals.css";
import { Scoreboard, type Settings, type Side } from "./scoreboard";

const scoreboard = new Scoreboard();

function initialize() {
  const form = document.querySelector<HTMLFormElement>("#settings");

  if (form)
    form.onsubmit = (e) => {
      e.preventDefault(); // Prevents page from reloading when form is submitted
      const formData = new FormData(form);

      scoreboard.applySettings(readSettings(formData), performance.now());
      render(performance.now());

      const halfSetting = formData.get("half-input");
      const GOSetting = formData.get("golden_goal");

      const halfElement = document.querySelector<HTMLParagraphElement>("#half");
      if (halfElement) {
        if (GOSetting) halfElement.innerHTML = `GO`;
        else if (halfSetting) halfElement.innerHTML = `${halfSetting}P`;
      }
    };

  document.addEventListener("keydown", keydownListener);

  setInterval(() => {
    const now = performance.now();
    scoreboard.tick(now);
    render(now);
  }, 10);
}

/**
 * Reads the Home, Away and Game Clock settings from the submitted settings
 * form.
 */
function readSettings(formData: FormData): Settings {
  const readTeam = (side: Side) => ({
    name: formData.get(`${side}-team-input`) as string,
    colour: formData.get(`${side}-color-input`) as string,
    score: parseInt(formData.get(`${side}-score-input`) as string),
  });

  return {
    home: readTeam("home"),
    away: readTeam("away"),
    clock: {
      time: formData.get("timer-input") as string,
      direction: formData.get("count") === "up" ? "up" : "down",
    },
  };
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
    case "F13": // Starts/stops the Game Clock
      scoreboard.toggleClock(performance.now());
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
  render(performance.now());
  document.addEventListener("keydown", keydownListener);
}

/**
 * Writes the Scoreboard's display snapshot at the given time into the page.
 */
function render(now: number) {
  const display = scoreboard.display(now);

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

  const clock = document.querySelector<HTMLParagraphElement>("#time");
  if (clock) clock.textContent = display.clock;

  const element = document.querySelector<HTMLDivElement>("#scoreboard");
  if (element) element.style.opacity = display.visible ? "1" : "0";
}

initialize();
