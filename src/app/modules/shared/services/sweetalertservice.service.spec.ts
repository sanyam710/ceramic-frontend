import { TestBed } from '@angular/core/testing';

import { SweetalertserviceService } from './sweetalertservice.service';

describe('SweetalertserviceService', () => {
  let service: SweetalertserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetalertserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
