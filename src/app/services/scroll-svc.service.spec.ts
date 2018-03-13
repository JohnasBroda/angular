import { TestBed, inject } from '@angular/core/testing';

import { ScrollSvcService } from './scroll-svc.service';

describe('ScrollSvcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrollSvcService]
    });
  });

  it('should be created', inject([ScrollSvcService], (service: ScrollSvcService) => {
    expect(service).toBeTruthy();
  }));
});
