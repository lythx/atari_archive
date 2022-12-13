import { TestBed } from '@angular/core/testing';

import { CzasopismaService } from './czasopisma.service';

describe('CzasopismaService', () => {
  let service: CzasopismaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CzasopismaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
