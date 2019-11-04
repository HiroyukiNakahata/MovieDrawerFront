import { TestBed } from '@angular/core/testing';

import { MovieUploadService } from './movie-upload.service';

describe('MovieUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieUploadService = TestBed.get(MovieUploadService);
    expect(service).toBeTruthy();
  });
});
