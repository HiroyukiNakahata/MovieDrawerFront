import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {BrushState, StateService} from '../model/state';
import {Movie} from '../model/movie';
import {History} from '../model/history';

@Injectable()
export class StateSubjectService extends StateService {
  private brushStateSubject: Subject<BrushState> = new Subject<BrushState>();
  private movieSubject: Subject<Movie> = new Subject<Movie>();
  private saveSubject: Subject<boolean> = new Subject<boolean>();
  private historySubject: Subject<History> = new Subject<History>();

  constructor() {
    super();
  }

  getBrushStateSubject(): Subject<BrushState> {
    return this.brushStateSubject;
  }

  getMovieSubject(): Subject<Movie> {
    return this.movieSubject;
  }

  getSaveSubject(): Subject<boolean> {
    return this.saveSubject;
  }

  getHistorySubject(): Subject<History> {
    return this.historySubject;
  }
}
