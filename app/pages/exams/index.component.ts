import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from "ui/page";
import dialog = require('ui/dialogs');

import { Exam } from '../../shared/models/exam';
import { Question } from '../../shared/models/question';
import { Tag } from '../../shared/models/tag';
import { Topic } from '../../shared/models/topic';

import { ExamService } from '../../shared/services/exam.service';

@Component({
  selector: 'exams-index',
  templateUrl: 'pages/exams/index.component.html',
  providers: [ExamService],
})
export class ExamsIndexComponent implements OnInit {
  public exams: any;
  public tag: any;

  constructor(public router: Router, public examService: ExamService, private page: Page) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    this.exams = new Array<Exam>();
    this.tag = new Tag();

    this.examService.all()
        .subscribe(
          data => this.exams = data,
          err => console.log(err),
          () => console.log('done')
        );
  }

  takeExam(id: number) {
    dialog.confirm("Ready to take Exam?")
          .then((result) => {
            if (result) {
              this.router.navigate(['exams-take/' + id]);
            }
          });
  }

  searchByTag(term: string) {

  }

  createExam() {
    this.router.navigate(['exams-new']);
  }

  editExam(id: number) {
    this.router.navigate(['exams-edit/' + id]);
  }
}
