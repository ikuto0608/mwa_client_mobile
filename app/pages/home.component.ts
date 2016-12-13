import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from "ui/page";
import { ActionBar } from 'ui/action-bar';
import { GridLayout } from 'ui/layouts/grid-layout';
import { View } from "ui/core/view";

import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'home',
  templateUrl: 'pages/home.component.html',
  styleUrls: ['pages/home.component.css'],
  providers: [UserService],
})
export class HomeComponent implements OnInit {
  public user: User;
  public isLogined: boolean;

  constructor(public router: Router, public userService: UserService, private page: Page) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    this.user = new User();
    if (this.userService.isLoggedIn()) {
      this.isLogined = true;
    } else {
      this.isLogined = false;
    }

  }

  signIn() {
this.user.email = "hoge@hoge.com";
this.user.password = "hogehoge";
    this.userService.login(this.user)
        .subscribe(
          () => {
            alert("Logined.");
            this.isLogined = true;
          },
          () => alert("Unfortunately we were unable to create your account.")
        )
  }

  signUp() {
    this.isLogined = true;
  }

  logout() {
    this.userService.logout();
    this.isLogined = false;
  }

  goTest() {
    this.router.navigate(['exams-index']);
  }

  createTest() {
    this.router.navigate(['exams-new']);
  }

  goProfile() {
    this.router.navigate(['user-profile']);
  }
}
