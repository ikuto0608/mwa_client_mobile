import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Page } from "ui/page";
import { ItemEventData } from 'ui/list-view';

import '../../rxjs-extensions';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Exam } from '../../shared/models/exam';

import { ExamService } from '../../shared/services/exam.service';

declare var UIColor: any;

@Component({
  selector: 'exams-rank',
  templateUrl: 'pages/exams/rank.component.html',
  styleUrls: ['pages/exams/rank-common.css', 'pages/exams/rank.css'],
  providers: [ExamService],
})
export class ExamsRankComponent implements OnInit {
  public ranks: any;
  public numberOfPerfectRank: Array<any>;
  public timeOfPerfectRank: Array<any>;

  constructor(public router: Router,
              public examService: ExamService,
              private page: Page,
              private route: ActivatedRoute) {}

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.page.actionBarHidden = true;

    this.examService
        .getRanks(id)
        .subscribe(
          (data) => this.arrangementRankByOrder(data),
          (err) => console.log(err),
          () => console.log('done')
        )
  }

  arrangementRankByOrder(rankJson: any) {
    this.numberOfPerfectRank = rankJson.map((r) => {
      return { user_name: r.user_name, times: r.number_of_perfect_in_a_row };
    });

    rankJson.sort((a, b) => {
      return b - a;
    });
    this.timeOfPerfectRank = rankJson.map((r) => {
      return { user_name: r.user_name, time: r.average_perfect_record_time };
    });
  }

  goExamList() {
    this.router.navigate(['exams-index']);
  }

  onItemLoading(args: ItemEventData) {
    if (args.ios) {
      args.ios.backgroundColor = UIColor.clearColor();
    }
  }
}
