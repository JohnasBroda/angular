import { TestBed, inject } from '@angular/core/testing';

import { FacebookAuthService } from './facebook-auth.service';

describe('FacebookAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookAuthService]
    });
  });

  it('should be created', inject([FacebookAuthService], (service: FacebookAuthService) => {
    expect(service).toBeTruthy();
  }));
});
