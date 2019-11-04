import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Paint, PaintService} from '../model/paint';

@Injectable()
export class PaintUploadService extends PaintService{

  constructor(private httpClient: HttpClient) {
    super();
  }

  AjaxPostPaints(paints: Paint[]): Promise<Paint[]> {
    return this.httpClient.post<Paint[]>('/api/paint', paints, {
      headers: new HttpHeaders(
        {'Content-Type': 'Application/json'}
      )
    }).toPromise()
      .then(d => d);
  }
}
