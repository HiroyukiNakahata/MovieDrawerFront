/* tslint:disable:variable-name */
export class Movie {
  movie_id: number;
  file_name: string;
  upload_time: string;

  constructor(movie_id: number, file_name: string, upload_time: string) {
    this.movie_id = movie_id;
    this.file_name = file_name;
    this.upload_time = upload_time;
  }
}

export abstract class MovieService {
  abstract AjaxPostMovie(formData: FormData): Promise<Movie>;
}
