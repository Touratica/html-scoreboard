import { GameClock, type ClockSettings } from "./game-clock";

export type Side = "home" | "away";

export type Team = {
  name: string;
  colour: string;
  score: number;
};

type Teams = Record<Side, Team>;

export type Period = 1 | 2 | 3 | 4;

export type Settings = Teams & {
  clock: ClockSettings;
  period: Period;
  goldenGoal: boolean;
};

export type Display = Teams & {
  clock: string;
  period: string;
  visible: boolean;
};

function copyTeams(teams: Teams): Teams {
  return { home: { ...teams.home }, away: { ...teams.away } };
}

/**
 * Holds the state of a Match. Never reads the system clock or touches the DOM:
 * the browser shell turns key presses and the settings form into commands,
 * passes in the current time, and renders the display snapshot.
 */
export class Scoreboard {
  private teams: Teams = {
    home: { name: "HOME", colour: "#dc2626", score: 0 },
    away: { name: "AWAY", colour: "#dc2626", score: 0 },
  };

  private clock = new GameClock({ time: "12:30", direction: "down" });

  private period: Period = 1;

  private goldenGoal = false;

  private visible = true;

  /**
   * Takes the current time like every other command, though resetting the
   * Game Clock to a stopped clock doesn't need it yet.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applySettings(settings: Settings, _now: number) {
    this.teams = copyTeams(settings);
    this.clock = new GameClock(settings.clock);
    this.period = settings.period;
    this.goldenGoal = settings.goldenGoal;
  }

  toggleClock(now: number) {
    this.clock.toggle(now);
  }

  tick(now: number) {
    this.clock.tick(now);
  }

  incrementScore(side: Side) {
    this.teams[side].score += 1;
  }

  decrementScore(side: Side) {
    this.teams[side].score = Math.max(0, this.teams[side].score - 1);
  }

  toggleVisibility() {
    this.visible = !this.visible;
  }

  display(now: number): Display {
    return {
      ...copyTeams(this.teams),
      clock: this.clock.text(now),
      period: this.goldenGoal ? "GO" : `${this.period}P`,
      visible: this.visible,
    };
  }
}
