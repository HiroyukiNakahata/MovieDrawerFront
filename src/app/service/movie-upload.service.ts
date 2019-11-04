import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Movie, MovieService} from '../model/movie';

@Injectable()
export class MovieUploadService extends MovieService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  AjaxPostMovie(formData: FormData): Promise<Movie> {
    return this.httpClient.post<Movie>('/api/movie', formData, {responseType: 'json'})
      .toPromise()
      .then(d => d);
  }
}
