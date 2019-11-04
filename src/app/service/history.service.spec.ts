import { TestBed } from '@angular/core/testing';

import { HistoryFindService } from './history-find.service';

describe('HistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoryFindService = TestBed.get(HistoryFindService);
    expect(service).toBeTruthy();
  });
});
