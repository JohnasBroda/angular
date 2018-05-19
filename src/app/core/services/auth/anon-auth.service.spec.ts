import { TestBed, inject } from '@angular/core/testing';

import { AnonAuthService } from './anon-auth.service';

describe('AnonAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonAuthService]
    });
  });

  it('should be created', inject([AnonAuthService], (service: AnonAuthService) => {
    expect(service).toBeTruthy();
  }));
});
