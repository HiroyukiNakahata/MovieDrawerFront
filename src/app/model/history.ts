/* tslint:disable:variable-name */
export class History {
  movie_id: number;
  movie_file_name: string;
  movie_upload_time: string;
  paints: HistoryPaint[];
}

export class HistoryPaint {
  layer_id: number;
  picture: string;
  in_frame: number;
  out_frame: number;
}

export class HistoryCount {
  count: number;
}

export abstract class HistoryService {
  abstract AjaxFindAllHistory(): Promise<History[]>;
  abstract AjaxFindPartialHistory(page: number, limit: number): Promise<History[]>;
  abstract AjaxFindHistoryByMovieId(movieId: number): Promise<History>;
  abstract AjaxGetHistoryCount(): Promise<HistoryCount>;
}
