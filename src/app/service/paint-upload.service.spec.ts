import { TestBed } from '@angular/core/testing';

import { PaintUploadService } from './paint-upload.service';

describe('PaintUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaintUploadService = TestBed.get(PaintUploadService);
    expect(service).toBeTruthy();
  });
});
