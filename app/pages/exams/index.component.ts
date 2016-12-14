import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from "ui/page";
import dialog = require('ui/dialogs');

import '../../rxjs-extensions';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Exam } from '../../shared/models/exam';
import { Question } from '../../shared/models/question';
import { Tag } from '../../shared/models/tag';
import { Topic } from '../../shared/models/topic';

import { ExamService } from '../../shared/services/exam.service';

@Component({
  selector: 'exams-index',
  templateUrl: 'pages/exams/index.component.html',
  styleUrls: ['pages/exams/index.component.css'],
  providers: [ExamService],
})
export class ExamsIndexComponent implements OnInit, AfterViewInit {
  @ViewChild("searchBar") searchBar: any;

  public exams: any;
  public tags: any;
  private searchTerms = new Subject<string>();

  public isLoading = false;

  constructor(public router: Router,
              public examService: ExamService,
              private page: Page) {}

  ngOnInit() {
    this.isLoading = true;
    this.page.actionBarHidden = true;

    this.exams = this.searchTerms
                     .debounceTime(300)
                     .distinctUntilChanged()
                     .switchMap(term => {
                       if (term) {
                         let exams = this.examService.searchByTag(term);
                         this.isLoading = false;
                         return exams;
                       } else {
                         let exams = this.examService.all();
                         this.isLoading = false;
                         return exams;
                       }
                     })
                     .catch(error => {
                       console.log(error);
                       let exams = this.examService.all();
                       this.isLoading = false;
                       return exams;
                     });
  }

  ngAfterViewInit() {
    let searchBar = this.page.getViewById("serach_bar");
    if (searchBar.ios) {
      searchBar.ios.endEditing(true);
    } else if (searchBar.android) {
      searchBar.android.clearFocus();
    }

    this.search("");
  }

  takeExam(id: number) {
    dialog.confirm("Ready to take Exam?")
          .then((result) => {
            if (result) {
              this.router.navigate(['exams-take/' + id]);
            }
          });
  }

  search(term: string) {
    this.isLoading = true;
    this.searchTerms.next(term);
  }

  editExam(id: number) {
    this.router.navigate(['exams-edit/' + id]);
  }
}
