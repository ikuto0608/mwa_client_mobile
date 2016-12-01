import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Tag } from '../models/tag';
import { Config } from '../config';

@Injectable()
export class TagService {
  private tagsUrl = Config.apiUrl + 'tags/';

  constructor(public http: Http) {
  }

  search(term: string): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
               .get(this.tagsUrl + "serach?term=" + term, { headers })
               .map((res) => res.json());
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
