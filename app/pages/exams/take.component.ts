import { Component, OnInit, Directive, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Exam } from '../../shared/models/exam';
import { Question } from '../../shared/models/question';

import { ExamService } from '../../shared/services/exam.service';

@Component({
  selector: 'exams-take',
  templateUrl: 'pages/exams/take.component.html',
})
export class ExamsTakeComponent implements OnInit {
  public exam: Exam;
  public resultExam: Exam;
  public questionIndex: number;
  public progress: number;
  public resultTime: number;

  constructor(public examService: ExamService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.examService
        .take(id)
        .subscribe(
          data => this.exam = Exam.toExam(data),
          err => console.log(err),
          () => console.log('done')
        );

    this.questionIndex = 0;
    this.progress = 0;
  }

  chooseAnswer(answerIndex) {
    this.exam.resultArray = this.exam.resultArray || new Array<Object>();
    this.exam.resultArray.push(
      { topic_id: this.exam.questions[this.questionIndex].id,
        answer: this.exam.questions[this.questionIndex].answers[answerIndex]
      }
    );

    if (this.exam.resultArray.length >= 10) {
      this.sendResult();
      return;
    }

    this.questionIndex++;
  }

  sendResult() {
    let r = this.router;
    //this.exam.resultTime = this.stopwatchComponent.stopTime();

    this.examService
        .sendResult(this.exam.toJson())
        .subscribe(
          data => this.examService.resultExam = Exam.toExam(data),
          err => console.log(JSON.stringify(err)),
          () => this.router.navigate(['/exams-result'])
        );
  }

  progressUp() {
    this.progress += 10;
  }

  setColumn(indexOfAnswer: number) {
    return (indexOfAnswer % 2 == 0) ? 0 : 1;
  }

  setRow(indexOfAnswer: number) {
    return (indexOfAnswer < 2) ? 3 : 4;
  }
}
