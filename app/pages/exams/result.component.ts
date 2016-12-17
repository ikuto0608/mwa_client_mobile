import { Component, OnInit, Directive, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Page } from "ui/page";

import { Exam } from '../../shared/models/exam';
import { Question } from '../../shared/models/question';

import { ExamService } from '../../shared/services/exam.service';

@Component({
  selector: 'exams-result',
  templateUrl: 'pages/exams/result.component.html',
  styleUrls: ['pages/exams/result-common.css', 'pages/exams/result.css'],
})
export class ExamsResultComponent implements OnInit {
  public exam: Exam;
  public isLoading = false;

  constructor(public examService: ExamService, private router: Router, private route: ActivatedRoute, private page: Page) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    this.isLoading = true;
    this.exam = this.examService.resultExam;
  }

  score() {
    return this.exam
               .markedTopics
               .filter(topic => {
                 this.isLoading = false;
                 return topic.volatileJson.correct;
               }).length;
  }

  backHome() {
    this.router.navigate(['']);
  }
}
