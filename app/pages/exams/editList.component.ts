import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Exam } from '../../shared/models/exam';

import { ExamService } from '../../shared/services/exam.service';

@Component({
  selector: 'exams-edit-list',
  templateUrl: 'pages/exams/editList.component.html',
  styleUrls: ['pages/exams/editlist-common.css', 'pages/exams/editlist.css'],
  providers: [ExamService],
})
export class ExamsEditListComponent implements OnInit {
  public exams: any;
  public isLoading = false;

  constructor(public router: Router, public examService: ExamService) {
  }

  ngOnInit() {
    this.isLoading = true;

    this.examService
        .findByUserId()
        .subscribe(
          (data) => this.exams = data.map(examJson => Exam.toExam(examJson)),
          (err) => console.log(err),
          () => this.isLoading = false
        )
  }

  newExam() {
    this.router.navigate(['exams-create']);
  }

  editExam(id: number) {
    this.router.navigate(['exams-edit/' + id]);
  }
}
