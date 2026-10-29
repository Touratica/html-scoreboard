export type Direction = "down" | "up";

export type ClockSettings = {
  /** Starting time as `mm:ss`. */
  time: string;
  direction: Direction;
};

function parseTime(time: string): number {
  const [minutes, seconds] = time.split(":").map((part) => parseInt(part));
  return (minutes! * 60 + seconds!) * 1000;
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * The Game Clock of one Period. Keeps the time accumulated while running plus
 * the moment it was last started, so the shown time depends only on the
 * timestamps passed in, not on how often or how regularly it is ticked.
 */
export class GameClock {
  private readonly startingTime: number;

  private readonly direction: Direction;

  private elapsed = 0;

  private startedAt: number | null = null;

  constructor(settings: ClockSettings) {
    this.startingTime = parseTime(settings.time);
    this.direction = settings.direction;
  }

  /** Starts or stops the clock. A countdown that has reached zero stays stopped. */
  toggle(now: number) {
    this.tick(now);
    if (this.startedAt === null) {
      if (this.direction === "down" && this.elapsed >= this.startingTime)
        return;
      this.startedAt = now;
    } else {
      this.elapsed = this.elapsedAt(now);
      this.startedAt = null;
    }
  }

  /** Stops the clock once a countdown has reached zero. */
  tick(now: number) {
    if (
      this.direction === "down" &&
      this.startedAt !== null &&
      this.elapsedAt(now) >= this.startingTime
    ) {
      this.elapsed = this.startingTime;
      this.startedAt = null;
    }
  }

  text(now: number): string {
    if (this.direction === "up") {
      const totalSeconds = Math.floor(
        (this.startingTime + this.elapsedAt(now)) / 1000,
      );
      return `${pad(Math.floor(totalSeconds / 60))}:${pad(totalSeconds % 60)}`;
    }

    const remaining = this.startingTime - this.elapsedAt(now);

    const centiseconds = Math.floor(remaining / 10);
    const totalSeconds = Math.floor(centiseconds / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes > 0) return `${minutes}:${pad(seconds)}`;
    return `${seconds}.${pad(centiseconds % 100)}`;
  }

  private elapsedAt(now: number): number {
    const running = this.startedAt === null ? 0 : now - this.startedAt;
    const elapsed = this.elapsed + running;
    return this.direction === "down"
      ? Math.min(elapsed, this.startingTime)
      : elapsed;
  }
}
