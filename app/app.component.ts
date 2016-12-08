import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Page} from "ui/page";

@Component({
    selector: "main",
    templateUrl: "app.component.html",
})
export class AppComponent {
  constructor(public router: Router, public page: Page) {
    page.actionBarHidden = true;
  }

  goHome() {
    this.router.navigate(['']);
  }

  goTest() {
    this.router.navigate(['exams-index']);
  }

  createTest() {
    this.router.navigate(['exams-new']);
  }

  goProfile() {
  }
}
