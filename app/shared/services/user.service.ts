import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import * as appSettings from 'application-settings';

import { User } from '../models/user';
import { Config } from '../config';

@Injectable()
export class UserService {
  private loggedIn = false;
  private loginUrl = Config.apiUrl + 'auth_user/';
  private userUrl = Config.apiUrl + 'users/';
  private authToken = 'auth_token';

  constructor(private http: Http) {
    this.loggedIn = !!appSettings.getString(this.authToken);
  }

  login(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http
               .post(this.loginUrl,
                     JSON.stringify({ email: user.email, password: user.password }),
                     { headers: headers },
               )
               .map((res) => res.json())
               .map((res) => {
                 if (res.success) {
                   appSettings.setString(this.authToken, res[this.authToken]);
                   this.loggedIn = true;
                 }
               })
               .catch(err => this.handleErrors(err.json()));
  }

  logout() {
    appSettings.remove(this.authToken);
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getRecords() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = appSettings.getString('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.userUrl + 'records', { headers })
               .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = appSettings.getString('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.userUrl + 'show', { headers })
               .map(res => res.json());
  }

  latestHistory(examId: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = appSettings.getString('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
               .get(this.userUrl + 'latest_history/' + examId, { headers })
               .map(res => res.json());
  }

  register(user: User) {
    let body = JSON.stringify({ user: {
                                  name: user.name,
                                  email: user.email,
                                  password: user.password,
                                  password_confirmation: user.passwordConfirmation
                              }});
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.userUrl, body, {headers})
               .map(res => res.json())
               .map((res) => {
                 if (res.success) {
                   appSettings.setString('auth_token', res.auth_token);
                   this.loggedIn = true;
                 }
               })
               .catch(err => this.handleErrors(err.json()));
  }

  handleErrors(err) {
    console.log(JSON.stringify(err));
    return Observable.throw(err);
  }
}
