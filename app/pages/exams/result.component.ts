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
  styleUrls: ['pages/exams/result.component.css'],
})
export class ExamsResultComponent implements OnInit {
  public exam: Exam;

  constructor(public examService: ExamService, private route: ActivatedRoute, private page: Page) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    this.exam = this.examService.resultExam;
  }

  hoge() {
    console.log(JSON.stringify(this.exam));
  }
}
