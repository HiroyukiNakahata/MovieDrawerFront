import {Subject} from 'rxjs';
import {Movie} from './movie';
import {History} from './history';

export class BrushState {
  color: string;
  width: number;
  operation: string;

  constructor(color: string, width: number, operation: string) {
    this.color = color;
    this.width = width;
    this.operation = operation;
  }
}

export abstract class StateService {
  abstract getBrushStateSubject(): Subject<BrushState>;
  abstract getMovieSubject(): Subject<Movie>;
  abstract getSaveSubject(): Subject<boolean>;
  abstract getHistorySubject(): Subject<History>;
}
