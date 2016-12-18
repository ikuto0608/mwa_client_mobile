import { Component, ViewChild, ElementRef } from '@angular/core'
var timer = require("timer");

@Component({
  selector: 'stopwatch',
  templateUrl: 'pages/stopwatch.component.html',
  styleUrls: ['pages/stopwatch-common.css', 'pages/stopwatch.css'],
})
export class StopwatchComponent {
  @ViewChild('stopwatchComponent') stopwatchComponent: StopwatchComponent;

  private startTimestamp: any;
  private timeMilliseconds: number;
  private interval: any;

  constructor() {
    this.startTimestamp = new Date();

    this.interval = timer.setInterval(() => {
      this.timeMilliseconds = this.countTime();
    }, 10);
  }

  countTime(): number {
    let now: any = new Date();
    let diffMilliseconds = now - this.startTimestamp;
    return diffMilliseconds;
  }

  stopTime(): number {
    let now: any = new Date();
    let diffMilliseconds = now - this.startTimestamp;
    timer.clearInterval(this.interval);
    return diffMilliseconds;
  }
}
