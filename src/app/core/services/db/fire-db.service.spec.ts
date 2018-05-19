import { TestBed, inject } from '@angular/core/testing';

import { FireDbService } from './fire-db.service';

describe('FireDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireDbService]
    });
  });

  it('should be created', inject([FireDbService], (service: FireDbService) => {
    expect(service).toBeTruthy();
  }));
});
