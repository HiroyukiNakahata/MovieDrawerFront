import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {BrushState} from '../../model/state';
import {Movie} from '../../model/movie';
import {Paint, PaintService} from '../../model/paint';
import {History} from '../../model/history';
import {StateService} from '../../model/state';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit, AfterViewInit, OnDestroy {
  moviePath = '#';
  videoReadyFlag = false;
  layerRange: number[][];
  movieLength: number;
  movieCtiValue: number;
  video: HTMLVideoElement;
  @ViewChild('video', {static: true}) vd;
  @ViewChild('canvasGroup', {static: true}) cvGroup;
  isClick: boolean;
  currentMovie: Movie;
  brushState: BrushState;
  brushStateSubject: Subject<BrushState>;
  movieSubject: Subject<Movie>;
  saveSubject: Subject<boolean>;
  historySubject: Subject<History>;
  subscription: Subscription;

  constructor(private stateService: StateService,
              private paintService: PaintService) {
  }

  ngOnInit() {
    this.layerRange = [[0, 100]];
    this.movieLength = 100;
    this.movieCtiValue = 0;
    this.isClick = false;
    this.brushState = new BrushState('#000000', 1, 'source-over');

    this.brushStateSubject = this.stateService.getBrushStateSubject();
    this.subscription = this.brushStateSubject.subscribe(
      msg => this.brushState = msg
    );

    this.movieSubject = this.stateService.getMovieSubject();
    this.subscription.add(this.movieSubject.subscribe(
      msg => this.setMovie(msg)
    ));

    this.saveSubject = this.stateService.getSaveSubject();
    this.subscription.add(this.saveSubject.subscribe(
      () => this.savePaint()
    ));

    this.historySubject = this.stateService.getHistorySubject();
    this.subscription.add(this.historySubject.subscribe(
      msg => this.setHistory(msg)
    ));
  }

  ngAfterViewInit() {
    this.video = this.vd.nativeElement;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('unsubscribe');
    }
  }

  canvasClick(e: MouseEvent, idx: number) {
    this.isClick = true;
    const context = this.getCanvasContext(idx);
    context.lineWidth = this.brushState.width;
    context.strokeStyle = this.brushState.color;
    context.globalCompositeOperation = this.brushState.operation;
    context.beginPath();
    context.moveTo(e.offsetX, e.offsetY);
  }

  canvasDrag(e: MouseEvent, idx: number) {
    if (this.isClick) {
      const context = this.getCanvasContext(idx);
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
    }
  }

  canvasDragEnd(e: MouseEvent, idx: number) {
    if (this.isClick) {
      const context = this.getCanvasContext(idx);
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
    }
    this.isClick = false;
  }

  setMovieTime(value: number) {
    this.video.currentTime = value;
  }

  movieTimeUpdate() {
    this.movieCtiValue = this.video.currentTime;
    this.layerRange.forEach((range, i) => {
      const cvs = this.getCanvas(i);
      const currentTime = this.video.currentTime;
      if (currentTime >= range[0] && currentTime <= range[1]) {
        cvs.style.visibility = '';
      } else {
        cvs.style.visibility = 'hidden';
      }
    });
  }

  playMovie() {
    this.video.play();
  }

  pauseMovie() {
    this.video.pause();
  }

  stopMovie() {
    this.video.pause();
    this.video.currentTime = 0;
  }

  addLayer() {
    this.layerRange.push([0, this.movieLength]);
  }

  hiddenCanvas(checked: boolean, idx: number) {
    const cvs = this.getCanvas(idx);
    if (checked) {
      cvs.style.visibility = 'hidden';
    } else {
      cvs.style.visibility = '';
    }
  }

  clearCanvas(idx: number) {
    const context = this.getCanvasContext(idx);
    context.clearRect(0, 0, 960, 540);
  }

  changeLayerRange(idx: number) {
    const currentTime = this.video.currentTime;
    const cvs = this.getCanvas(idx);
    if (currentTime >= this.layerRange[idx][0] && currentTime <= this.layerRange[idx][1]) {
      cvs.style.visibility = '';
    } else {
      cvs.style.visibility = 'hidden';
    }
  }

  getActiveSlider(): number {
    let idx = -1;
    if (this.videoReadyFlag) {
      const currentTime = this.video.currentTime;
      this.layerRange.forEach((layer, i) => {
        if (currentTime >= layer[0] && currentTime <= layer[1]) {
          idx = i;
        }
      });
    }
    return idx;
  }

  private getCanvas(idx: number): HTMLCanvasElement {
    return this.cvGroup.nativeElement.children[idx];
  }

  private getCanvasContext(idx: number): CanvasRenderingContext2D {
    return this.cvGroup.nativeElement.children[idx].getContext('2d');
  }

  private setMovie(msg: Movie) {
    this.currentMovie = msg;
    this.moviePath = '/api/movie/file/' + msg.file_name;
    this.video.onloadedmetadata = () => {
      this.movieLength = this.video.duration;
      this.layerRange = this.layerRange.map(() => [0, this.movieLength]);
      this.videoReadyFlag = true;
    };
  }

  private savePaint() {
    if (!this.currentMovie) {
      return;
    }
    const paints: Paint[] = [];
    this.layerRange.forEach((d, i) => {
      const cvs = this.getCanvas(i);
      const image = cvs.toDataURL('image/png');
      const p: Paint = new Paint(
        this.currentMovie.movie_id,
        this.currentMovie.file_name,
        i,
        image,
        d[0],
        d[1]
      );
      paints.push(p);
    });
    this.paintService
      .AjaxPostPaints(paints)
      .then(d => {
        window.alert('保存が完了しました');
      });
  }

  private setHistory(history: History) {
    this.moviePath = '/api/movie/file/' + history.movie_file_name;
    this.currentMovie = new Movie(
      history.movie_id,
      history.movie_file_name,
      history.movie_upload_time
    );
    this.video.onloadedmetadata = () => {
      this.movieLength = this.video.duration;
      this.layerRange = history.paints.map(paint => [paint.in_frame, paint.out_frame]);
    };
    this.video.onloadeddata = () => {
      history.paints.forEach((paint, i) => {
        const cvs = this.getCanvasContext(i);
        const image = new Image();
        image.src = paint.picture;
        image.onload = () => {
          cvs.drawImage(image, 0, 0);
        };
      });
      this.video.currentTime = 0;
      this.videoReadyFlag = true;
    };
  }
}
