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
  styleUrls: ['pages/home-common.css', 'pages/home.css'],
  providers: [UserService],
})
export class HomeComponent implements OnInit {
  public user: User;
  public isLogined: boolean;
  public isHome: boolean;
  public isSignInForm: boolean;
  public isSignUpForm: boolean;

  constructor(public router: Router, public userService: UserService, private page: Page) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    this.user = new User();
    if (this.userService.isLoggedIn()) {
      this.isLogined = true;
    } else {
      this.isLogined = false;

      this.isHome = true;
      this.isSignInForm = false;
      this.isSignUpForm = false;
    }
  }

  backHome() {
    this.isHome = true;
    this.isSignInForm = false;
    this.isSignUpForm = false;
  }

  goSignUp() {
    this.isHome = false;
    this.isSignInForm = true;
    this.isSignUpForm = false;
  }

  goSignIn() {
    this.isHome = false;
    this.isSignInForm = false;
    this.isSignUpForm = true;
  }

  signIn() {
this.user.email = this.user.email || "hoge@hoge.com";
this.user.password = this.user.password || "hogehoge";
    this.userService.login(this.user)
        .subscribe(
          () => {
            alert("Logined.");
            this.isLogined = true;
          },
          () => alert("Login failed. Email or Password are wrong.")
        )
  }

  signUp() {
    this.userService.register(this.user)
        .subscribe(
          () => {
            alert("Account Created.");
            this.isLogined = true;
          },
          () => alert("Unfortunately we were unable to create your account.")
        )
  }

  logout() {
    this.userService.logout();
    this.isLogined = false;

    this.isHome = true;
    this.isSignInForm = false;
    this.isSignUpForm = false;
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
