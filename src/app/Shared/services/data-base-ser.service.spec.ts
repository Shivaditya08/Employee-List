import { TestBed } from '@angular/core/testing';

import { DataBaseSerService } from './data-base-ser.service';

describe('DataBaseSerService', () => {
  let service: DataBaseSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBaseSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
