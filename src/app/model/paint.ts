/* tslint:disable:variable-name */
export class Paint {
  paint_id: number;
  movie_id: number;
  movie_name: string;
  layer_id: number;
  picture: string;
  in_frame: number;
  out_frame: number;
  upload_time: string;

  constructor(movie_id: number, movie_name: string, layer_id: number, picture: string, in_frame: number, out_frame: number) {
    this.movie_id = movie_id;
    this.movie_name = movie_name;
    this.layer_id = layer_id;
    this.picture = picture;
    this.in_frame = in_frame;
    this.out_frame = out_frame;
  }
}

export abstract class PaintService {
  abstract AjaxPostPaints(paints: Paint[]): Promise<Paint[]>;
}
