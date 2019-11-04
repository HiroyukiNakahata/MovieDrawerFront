import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {History, HistoryService} from '../../model/history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {
  paramID: number;
  maxItemCount: number;
  pageViewCount = 4;
  histories: History[];
  @ViewChild('videoArea', {read: ElementRef, static: true}) videoArea;

  constructor(private historyService: HistoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.historyService.AjaxGetHistoryCount()
      .then(d => this.maxItemCount = d.count);

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.paramID = parseInt(params.get('id'), 10);
      console.log(this.paramID);
      this.historyService.AjaxFindPartialHistory(this.paramID, this.pageViewCount)
        .then(d => {
          console.log(d);
          this.histories = d;
        });
    });
  }

  ngAfterViewInit(): void {
  }

  drawCanvas(i: number) {
    this.histories[i].paints.forEach((paint, j) => {
      const canvas: HTMLCanvasElement = this.videoArea.nativeElement.children[i].children[j + 2];
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = paint.picture;
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
    });
  }

  movieTimeUpdate(idx: number) {
    const video: HTMLVideoElement = this.videoArea.nativeElement.children[idx].children[1];
    this.histories[idx].paints.forEach((paint, i) => {
      const cvs: HTMLCanvasElement = this.videoArea.nativeElement.children[idx].children[i + 2];
      if (video.currentTime >= paint.in_frame && video.currentTime <= paint.out_frame) {
        cvs.style.visibility = '';
      } else {
        cvs.style.visibility = 'hidden';
      }
    });
  }

  previousPage() {
    if (this.paramID > 1) {
      this.router.navigate(['history', this.paramID - 1]);
    }
  }

  nextPage() {
    if (this.paramID < (this.maxItemCount / this.pageViewCount)) {
      this.router.navigate(['history', this.paramID + 1]);
    }
  }

  firstPage() {
    this.router.navigate(['history', 1]);
  }

  lastPage() {
    this.router.navigate(['history', Math.ceil(this.maxItemCount / this.pageViewCount)]);
  }

  editPaint(movieId: number) {
    this.router.navigate(['edit', movieId]);
  }

  getDate(time: string): string {
    return new Date(time).toLocaleString();
  }
}
