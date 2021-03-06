import { Component, OnInit, AfterViewInit, Directive, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Page } from "ui/page";
import { AnimationCurve } from "ui/enums";

import { Exam } from '../../shared/models/exam';
import { Question } from '../../shared/models/question';

import { ExamService } from '../../shared/services/exam.service';

@Component({
  selector: 'exams-take',
  templateUrl: 'pages/exams/take.component.html',
  styleUrls: ['pages/exams/take-common.css', 'pages/exams/take.css'],
})
export class ExamsTakeComponent implements OnInit, AfterViewInit {
  @ViewChild('stopwatchComponent') stopwatchComponent: any;
  @ViewChild("progress") progress: ElementRef;
  @ViewChild("hint") hint: ElementRef;

  public exam: Exam;
  public resultExam: Exam;
  public questionIndex: number;
  public resultTime: number;
  public isRestAnimation: boolean;

  constructor(public examService: ExamService, private route: ActivatedRoute, private router: Router, private page: Page) {
    this.page.actionBarHidden = true;
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
    this.isRestAnimation = false;
  }

  ngAfterViewInit() {
  }

  chooseAnswer(answerIndex) {
    this.resetHintAnimation();
    this.progressUp();
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
    this.exam.resultTime = this.stopwatchComponent.stopTime();

    this.examService
        .sendResult(this.exam.toJson())
        .subscribe(
          data => this.examService.resultExam = Exam.toExam(data),
          err => console.log(JSON.stringify(err)),
          () => this.router.navigate(['/exams-result'])
        );
  }

  progressUp() {
    this.progress.nativeElement.value += 10;
  }

  setColumn(indexOfAnswer: number) {
    return (indexOfAnswer % 2 == 0) ? 0 : 1;
  }

  setRow(indexOfAnswer: number) {
    return (indexOfAnswer < 2) ? 3 : 4;
  }

  resetHintAnimation() {
    this.isRestAnimation = !this.isRestAnimation;
    /*
    this.hint.nativeElement.opacity = 0;
    this.hint.nativeElement.animate({
      opacity: 1,
      duration: 5000,
      curve: AnimationCurve.easeIn,
      cancel: console.log(this.hint.nativeElement.opacity)
    });
    */
  }
}
