import { describe, expect, it } from "vitest";
import { Scoreboard, type Settings } from "./scoreboard";

const settings: Settings = {
  home: { name: "KCC", colour: "#FF0000", score: 3 },
  away: { name: "ALB", colour: "#0000FF", score: 5 },
  clock: { time: "12:30", direction: "down" },
  period: 1,
  goldenGoal: false,
};

describe("Scoreboard", () => {
  it("shows the Home and Away names, colours and scores from the applied settings", () => {
    const scoreboard = new Scoreboard();

    scoreboard.applySettings(settings, 0);

    const display = scoreboard.display(0);
    expect(display.home).toEqual({ name: "KCC", colour: "#FF0000", score: 3 });
    expect(display.away).toEqual({ name: "ALB", colour: "#0000FF", score: 5 });
  });

  it("raises only the Home score by one when Home scores", () => {
    const scoreboard = new Scoreboard();
    scoreboard.applySettings(settings, 0);

    scoreboard.incrementScore("home");

    expect(scoreboard.display(0).home.score).toBe(4);
    expect(scoreboard.display(0).away.score).toBe(5);
  });

  it("raises only the Away score by one when Away scores", () => {
    const scoreboard = new Scoreboard();
    scoreboard.applySettings(settings, 0);

    scoreboard.incrementScore("away");

    expect(scoreboard.display(0).home.score).toBe(3);
    expect(scoreboard.display(0).away.score).toBe(6);
  });

  it("lowers only the Home score by one when Home is corrected", () => {
    const scoreboard = new Scoreboard();
    scoreboard.applySettings(settings, 0);

    scoreboard.decrementScore("home");

    expect(scoreboard.display(0).home.score).toBe(2);
    expect(scoreboard.display(0).away.score).toBe(5);
  });

  it("lowers only the Away score by one when Away is corrected", () => {
    const scoreboard = new Scoreboard();
    scoreboard.applySettings(settings, 0);

    scoreboard.decrementScore("away");

    expect(scoreboard.display(0).home.score).toBe(3);
    expect(scoreboard.display(0).away.score).toBe(4);
  });

  it("never lowers a score below zero", () => {
    const scoreboard = new Scoreboard();
    scoreboard.applySettings(
      {
        ...settings,
        home: { ...settings.home, score: 1 },
        away: { ...settings.away, score: 0 },
      },
      0,
    );

    scoreboard.decrementScore("home");
    scoreboard.decrementScore("home");
    scoreboard.decrementScore("away");

    expect(scoreboard.display(0).home.score).toBe(0);
    expect(scoreboard.display(0).away.score).toBe(0);
  });

  it("is visible until toggled, then hidden, then visible again", () => {
    const scoreboard = new Scoreboard();
    expect(scoreboard.display(0).visible).toBe(true);

    scoreboard.toggleVisibility();
    expect(scoreboard.display(0).visible).toBe(false);

    scoreboard.toggleVisibility();
    expect(scoreboard.display(0).visible).toBe(true);
  });

  describe("Period label", () => {
    it.each([
      [1, "1P"],
      [2, "2P"],
      [3, "3P"],
      [4, "4P"],
    ] as const)(
      "shows Period %i as %s when settings are applied",
      (period, label) => {
        const scoreboard = new Scoreboard();

        scoreboard.applySettings({ ...settings, period }, 0);

        expect(scoreboard.display(0).periodLabel).toBe(label);
      },
    );

    it.each([1, 2, 3, 4] as const)(
      "shows the Golden Goal label when Golden Goal is ticked, even with Period %i",
      (period) => {
        const scoreboard = new Scoreboard();

        scoreboard.applySettings({ ...settings, period, goldenGoal: true }, 0);

        expect(scoreboard.display(0).periodLabel).toBe("GO");
      },
    );
  });

  describe("Game Clock", () => {
    function startedAtZero(clock: Settings["clock"]) {
      const scoreboard = new Scoreboard();
      scoreboard.applySettings({ ...settings, clock }, 0);
      scoreboard.toggleClock(0);
      return scoreboard;
    }

    it("counts down as minutes and seconds while one minute or more is left", () => {
      const scoreboard = startedAtZero({ time: "1:30", direction: "down" });

      expect(scoreboard.display(0).clock).toBe("1:30");
      expect(scoreboard.display(25_000).clock).toBe("1:05");
      expect(scoreboard.display(30_000).clock).toBe("1:00");
    });

    it("counts down as seconds and hundredths in the last minute", () => {
      const scoreboard = startedAtZero({ time: "1:00", direction: "down" });

      expect(scoreboard.display(930).clock).toBe("59.07");
      expect(scoreboard.display(59_580).clock).toBe("0.42");
    });

    it("stops counting down at 0.00 and never goes negative", () => {
      const scoreboard = startedAtZero({ time: "0:05", direction: "down" });

      expect(scoreboard.display(5_000).clock).toBe("0.00");
      expect(scoreboard.display(600_000).clock).toBe("0.00");
    });

    it("stays at 0.00 once a tick has reached the end, even when toggled again", () => {
      const scoreboard = startedAtZero({ time: "0:05", direction: "down" });

      scoreboard.tick(7_000);
      scoreboard.toggleClock(8_000);

      expect(scoreboard.display(20_000).clock).toBe("0.00");
    });

    it("counts up as zero-padded minutes and seconds from the entered time", () => {
      const scoreboard = startedAtZero({ time: "00:00", direction: "up" });

      expect(scoreboard.display(0).clock).toBe("00:00");
      expect(scoreboard.display(30_990).clock).toBe("00:30");
      expect(scoreboard.display(195_000).clock).toBe("03:15");
    });

    it("keeps counting up past the entered time", () => {
      const scoreboard = startedAtZero({ time: "12:30", direction: "up" });

      scoreboard.tick(800_000);

      expect(scoreboard.display(800_000).clock).toBe("25:50");
    });

    it("shows the same time while stopped however much time passes, and resumes from it", () => {
      const scoreboard = startedAtZero({ time: "12:30", direction: "down" });

      scoreboard.toggleClock(4_000);
      scoreboard.tick(50_000);
      expect(scoreboard.display(100_000).clock).toBe("12:26");

      scoreboard.toggleClock(200_000);
      expect(scoreboard.display(201_000).clock).toBe("12:25");
    });

    it("is reset to the entered time, stopped, when settings are applied", () => {
      const scoreboard = startedAtZero({ time: "12:30", direction: "down" });

      scoreboard.applySettings(
        { ...settings, clock: { time: "10:00", direction: "down" } },
        5_000,
      );

      expect(scoreboard.display(60_000).clock).toBe("10:00");
    });

    it("shows the real time elapsed since it was started, with no ticks in between", () => {
      const scoreboard = new Scoreboard();
      scoreboard.applySettings(settings, 0);

      scoreboard.toggleClock(0);

      expect(scoreboard.display(10_000).clock).toBe("12:20");
    });

    it("shows the real time elapsed since it was started, with late and irregular ticks", () => {
      const scoreboard = new Scoreboard();
      scoreboard.applySettings(settings, 0);
      scoreboard.toggleClock(0);

      for (const now of [10, 1_000, 1_003, 4_700, 9_999]) scoreboard.tick(now);

      expect(scoreboard.display(10_000).clock).toBe("12:20");
    });
  });
});
