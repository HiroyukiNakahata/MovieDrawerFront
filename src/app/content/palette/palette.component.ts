/* tslint:disable:object-literal-shorthand */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {BrushState} from '../../model/state';
import {Movie, MovieService} from '../../model/movie';
import {StateService} from '../../model/state';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent implements OnInit, OnDestroy {
  widthValue: number;
  selectedColorChip: number;
  brushState: BrushState;
  brushStateSubject: Subject<BrushState>;
  movieSubject: Subject<Movie>;
  saveSubject: Subject<boolean>;
  subscription: Subscription;

  constructor(private stateService: StateService,
              private movieService: MovieService) {
  }

  ngOnInit() {
    this.widthValue = 1;
    this.selectedColorChip = 0;
    this.brushState = new BrushState('#000000', this.widthValue, 'source-over');
    this.brushStateSubject = this.stateService.getBrushStateSubject();
    this.movieSubject = this.stateService.getMovieSubject();
    this.saveSubject = this.stateService.getSaveSubject();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  uploadFile(files: FileList) {
    if (files.length === 0) {
      return;
    }
    const FD = new FormData();
    FD.append('file', files[0]);
    this.movieService.AjaxPostMovie(FD)
      .then(d => {
        this.movieSubject.next(d);
      });
  }

  setColor(color: string, idx: number) {
    console.log(color);
    this.selectedColorChip = idx;
    this.brushState.color = color;
    this.brushState.operation = 'source-over';
    this.brushStateSubject.next(this.brushState);
  }

  setWidth(value: number) {
    console.log(value);
    this.brushState.width = value;
    this.brushStateSubject.next(this.brushState);
  }

  setEraser() {
    this.selectedColorChip = 9;
    this.brushState.operation = 'destination-out';
    this.brushStateSubject.next(this.brushState);
  }

  savePaint() {
    this.saveSubject.next(true);
  }
}
