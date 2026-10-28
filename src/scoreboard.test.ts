import { describe, expect, it } from "vitest";
import { Scoreboard, type Settings } from "./scoreboard";

const settings: Settings = {
  home: { name: "KCC", colour: "#FF0000", score: 3 },
  away: { name: "ALB", colour: "#0000FF", score: 5 },
};

describe("Scoreboard", () => {
  it("shows the Home and Away names, colours and scores from the applied settings", () => {
    const scoreboard = new Scoreboard();

    scoreboard.applySettings(settings);

    const display = scoreboard.display();
    expect(display.home).toEqual({ name: "KCC", colour: "#FF0000", score: 3 });
    expect(display.away).toEqual({ name: "ALB", colour: "#0000FF", score: 5 });
  });

  it("raises only the Home score by one when Home scores", () => {
    const scoreboard = new Scoreboard();
    scoreboard.applySettings(settings);

    scoreboard.incrementScore("home");

    expect(scoreboard.display().home.score).toBe(4);
    expect(scoreboard.display().away.score).toBe(5);
  });

  it("raises only the Away score by one when Away scores", () => {
    const scoreboard = new Scoreboard();
    scoreboard.applySettings(settings);

    scoreboard.incrementScore("away");

    expect(scoreboard.display().home.score).toBe(3);
    expect(scoreboard.display().away.score).toBe(6);
  });

  it("lowers only the Home score by one when Home is corrected", () => {
    const scoreboard = new Scoreboard();
    scoreboard.applySettings(settings);

    scoreboard.decrementScore("home");

    expect(scoreboard.display().home.score).toBe(2);
    expect(scoreboard.display().away.score).toBe(5);
  });

  it("lowers only the Away score by one when Away is corrected", () => {
    const scoreboard = new Scoreboard();
    scoreboard.applySettings(settings);

    scoreboard.decrementScore("away");

    expect(scoreboard.display().home.score).toBe(3);
    expect(scoreboard.display().away.score).toBe(4);
  });

  it("never lowers a score below zero", () => {
    const scoreboard = new Scoreboard();
    scoreboard.applySettings({
      home: { ...settings.home, score: 1 },
      away: { ...settings.away, score: 0 },
    });

    scoreboard.decrementScore("home");
    scoreboard.decrementScore("home");
    scoreboard.decrementScore("away");

    expect(scoreboard.display().home.score).toBe(0);
    expect(scoreboard.display().away.score).toBe(0);
  });

  it("is visible until toggled, then hidden, then visible again", () => {
    const scoreboard = new Scoreboard();
    expect(scoreboard.display().visible).toBe(true);

    scoreboard.toggleVisibility();
    expect(scoreboard.display().visible).toBe(false);

    scoreboard.toggleVisibility();
    expect(scoreboard.display().visible).toBe(true);
  });
});
