import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from "ui/page";

import './rxjs-extensions';

@Component({
  selector: "main",
  templateUrl: "app.component.html",
})
export class AppComponent {
  public HOME = "/";
  public EXAM_INDEX = "/exams-index";
  public EXAM_NEW = "/exams-new";
  public EXAM_EDIT = "/exams-edit";
  public EXAM_TAKE = "/exams-take";
  public EXAM_RESULT = "/exams-result";
  public PROFILE = "/user-profile";

  constructor(public router: Router, public page: Page) {
    page.actionBarHidden = true;
  }

  goHome() {
    this.router.navigate(['']);
  }

  goTest() {
    this.router.navigate(['exams-index']);
  }

  editTest() {
    this.router.navigate(['exams-edit-list']);
  }

  goProfile() {
    this.router.navigate(['user-profile']);
  }
}
