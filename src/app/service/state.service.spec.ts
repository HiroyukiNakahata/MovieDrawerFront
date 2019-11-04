import { TestBed } from '@angular/core/testing';

import { StateSubjectService } from './state-subject.service';

describe('StateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateSubjectService = TestBed.get(StateSubjectService);
    expect(service).toBeTruthy();
  });
});
