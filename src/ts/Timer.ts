export class Timer {
  private min: number;
  private sec: number;
  // private millis: number = 99;

  private date: number = 0;

  private stopTime: boolean = true;

  /**
   * Creates a **Timer** instance with information on where to start the timer from.
   *
   * @param {number} min - How many minutes should the timer start with
   * @param {number} sec - How many seconds should the timer start with
   */
  constructor(min: number, sec: number) {
    this.min = min;
    this.sec = sec;
  }

  toggleTimer() {
    this.stopTime = !this.stopTime;
    this.date = Date.now();
  }

  countdown() {
    console.log(this.stopTime);
    if (!this.stopTime) {
      let timePassed = (Date.now() - this.date) / 1000; // Check for how long it's been since the last time the next line ran
      this.date = Date.now();

      this.sec -= timePassed;

      if (this.sec <= 0) {
        this.min -= 1;
        this.sec += 60;
      }

      const timer = document.querySelector("#time");
      if (timer)
        timer.innerHTML = `${this.min}:${
          this.sec >= 10 ? Math.floor(this.sec) : `0${Math.floor(this.sec)}`
        }`;
    }
    setTimeout(this.countdown, 10);
  }
}
