import { Component, OnInit, Directive, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Exam } from '../../shared/models/exam';
import { Question } from '../../shared/models/question';

import { ExamService } from '../../shared/services/exam.service';

@Component({
  selector: 'exams-result',
  templateUrl: 'pages/exams/result.component.html',
})
export class ExamsResultComponent implements OnInit {
  public exam: Exam;

  constructor(public examService: ExamService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.exam = this.examService.resultExam;
  }

  hoge() {
    console.log(JSON.stringify(this.exam));
  }
}
