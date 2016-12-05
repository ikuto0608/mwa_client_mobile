import { Component } from '@angular/core';
import {Page} from "ui/page";

@Component({
    selector: "main",
    templateUrl: "app.component.html",
})
export class AppComponent {
  constructor(page: Page) {
    page.actionBarHidden = false;
  }
}
