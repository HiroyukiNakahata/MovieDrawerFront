import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subject} from 'rxjs';
import {History, HistoryService} from '../../model/history';
import {StateService} from '../../model/state';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  historySubject: Subject<History>;

  constructor(private ar: ActivatedRoute,
              private historyService: HistoryService,
              private stateService: StateService) {
  }

  ngOnInit() {
    this.historySubject = this.stateService.getHistorySubject();
    this.ar.paramMap.subscribe(
      (params: ParamMap) => {
        console.log(params);
        if (params.get('id')) {
          console.log(params.get('id'));
          const paramId = parseInt(params.get('id'), 10);
          this.historyService.AjaxFindHistoryByMovieId(paramId)
            .then(d => {
              this.historySubject.next(d);
            });
        }
      }
    );
  }
}
