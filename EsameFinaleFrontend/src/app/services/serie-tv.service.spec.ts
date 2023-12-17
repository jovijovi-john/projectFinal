import { TestBed } from '@angular/core/testing';

import { SerieTvService } from './serie-tv.service';

describe('SerieTvService', () => {
  let service: SerieTvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerieTvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
