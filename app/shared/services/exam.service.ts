import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import * as appSettings from 'application-settings';

import { Exam } from '../models/exam';
import { Config } from '../config';

@Injectable()
export class ExamService {
  private examsUrl = Config.apiUrl + 'exams/';
  public resultExam: Exam;

  constructor(public http: Http) {
    this.resultExam = new Exam();
  }

  all(): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = appSettings.getString('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.examsUrl, { headers: headers })
               .map((res) => res.json())
               .catch(err => this.handleErrors(err));
  }

  findByUserId(): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = appSettings.getString('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.examsUrl + "find", { headers: headers })
               .map((res) => res.json())
               .catch(err => this.handleErrors(err));
  }

  searchByTag(term: string): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = appSettings.getString('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
               .get(this.examsUrl + "search_by_tag?term=" + term, { headers })
               .map((res) => res.json());
  }

  searchByTags(tags: any): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = appSettings.getString('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    let params: URLSearchParams = new URLSearchParams();
    params.set('tag', tags.toString());

    return this.http.get(this.examsUrl + 'search', { search: params, headers: headers })
               .map((res) => res.json())
               .catch(err => this.handleErrors(err));
  }

  show(id: number): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = appSettings.getString('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.examsUrl + id, { headers })
               .map((res) => res.json())
               .catch(err => this.handleErrors(err));
  }

  take(id: number): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = appSettings.getString('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.examsUrl + 'take/' + id, { headers })
               .map((res) => res.json())
               .catch(err => this.handleErrors(err));
  }

  save(examJson: any) {
    let body = examJson;
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Content-Type', 'application/json');
    let authToken = appSettings.getString('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.examsUrl, body, options)
               .map(res => res.json());
  }

  update(id: number, examJson: any) {
    let body = examJson;
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Content-Type', 'application/json');
    let authToken = appSettings.getString('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.examsUrl + id + '/update', body, options)
               .map((res) => res.json());
  }

  sendResult(examJson: any): Observable<any> {
    let body = examJson;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = appSettings.getString('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({headers: headers});

    return this.http
               .post(this.examsUrl + 'result', body, options)
               .map((res:Response) => res.json());
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error));
    return Observable.throw(error);
  }
}
