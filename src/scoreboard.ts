export type Side = "home" | "away";

export type Team = {
  name: string;
  colour: string;
  score: number;
};

type Teams = Record<Side, Team>;

export type Settings = Teams;

export type Display = Teams & { visible: boolean };

function copyTeams(teams: Teams): Teams {
  return { home: { ...teams.home }, away: { ...teams.away } };
}

/**
 * Holds the state of a Match. Never reads the system clock or touches the DOM:
 * the browser shell turns key presses and the settings form into commands, and
 * renders the display snapshot.
 */
export class Scoreboard {
  private teams: Teams = {
    home: { name: "HOME", colour: "#dc2626", score: 0 },
    away: { name: "AWAY", colour: "#dc2626", score: 0 },
  };

  private visible = true;

  applySettings(settings: Settings) {
    this.teams = copyTeams(settings);
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

  display(): Display {
    return { ...copyTeams(this.teams), visible: this.visible };
  }
}
