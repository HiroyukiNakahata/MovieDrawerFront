import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {History, HistoryCount, HistoryService} from '../model/history';

@Injectable()
export class HistoryFindService extends HistoryService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  AjaxFindAllHistory(): Promise<History[]> {
    return this.httpClient.get<History[]>('/api/history')
      .toPromise()
      .then(d => d);
  }

  AjaxFindPartialHistory(page: number, limit: number): Promise<History[]> {
    return this.httpClient.get<History[]>('/api/history/partial?page=' + page + '&limit=' + limit)
      .toPromise()
      .then(d => d);
  }

  AjaxFindHistoryByMovieId(movieId: number): Promise<History> {
    return this.httpClient.get<History>('/api/history/' + movieId)
      .toPromise()
      .then(d => d);
  }

  AjaxGetHistoryCount(): Promise<HistoryCount> {
    return this.httpClient.get<HistoryCount>('/api/history/count')
      .toPromise()
      .then(d => d);
  }
}
