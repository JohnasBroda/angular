import { TestBed, inject } from '@angular/core/testing';

import { FireAuthServiceService } from './fire-auth-service.service';

describe('FireAuthServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireAuthServiceService]
    });
  });

  it('should be created', inject([FireAuthServiceService], (service: FireAuthServiceService) => {
    expect(service).toBeTruthy();
  }));
});
