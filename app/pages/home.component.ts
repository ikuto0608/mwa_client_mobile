import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'home',
  templateUrl: 'pages/home.component.html',
  providers: [UserService],
})
export class HomeComponent implements OnInit {
  public user: User;
  public isLogined: boolean;

  constructor(public router: Router, public userService: UserService) {
    this.user = new User();
    this.isLogined = false;
  }

  ngOnInit() {

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

  goTest() {
    this.router.navigate(['exams-index']);
  }

  goProfile() {
    this.isLogined = false;
  }
}
