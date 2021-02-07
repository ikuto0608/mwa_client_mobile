import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from "ui/page";
import dialog = require('ui/dialogs');
import { ListView, ItemEventData } from 'ui/list-view';

import '../../rxjs-extensions';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Exam } from '../../shared/models/exam';
import { Question } from '../../shared/models/question';
import { Tag } from '../../shared/models/tag';
import { Topic } from '../../shared/models/topic';

import { ExamService } from '../../shared/services/exam.service';

declare var UIColor: any;

@Component({
  selector: 'exams-index',
  templateUrl: 'pages/exams/index.component.html',
  styleUrls: ['pages/exams/index-common.css', 'pages/exams/index.css'],
  providers: [ExamService],
})
export class ExamsIndexComponent implements OnInit, AfterViewInit {
  @ViewChild("searchBar") searchBar: any;
  @ViewChild("examList") examListRef: ElementRef;

  private get examList(): ListView {
    return this.examListRef.nativeElement;
  }
  public exams: any;
  public tags: any;
  private searchTerms = new Subject<string>();
  public pageIndex: number = 0;

  constructor(public router: Router,
              public examService: ExamService,
              private page: Page) {}

  ngOnInit() {
    this.page.actionBarHidden = true;

    this.exams = this.searchTerms
                     .debounceTime(300)
                     .distinctUntilChanged()
                     .switchMap(term => {
                       if (term) {
                         return this.examService.searchByTag(term);
                       } else {
                         return this.examService.all();
                       }
                     })
                     .catch(error => {
                       console.log(error);
                       return this.examService.all();
                     });

    this.examList.on(ListView.loadMoreItemsEvent, () => {
      this.pageIndex++;
      console.log(this.pageIndex);
    }, this);
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
    this.searchTerms.next(term);
  }

  showRank(id: number) {
    this.router.navigate(['exams-rank/' + id]);
  }

  onItemLoading(args: ItemEventData) {
    if (args.ios) {
      args.ios.backgroundColor = UIColor.clearColor();
    }
  }
}
