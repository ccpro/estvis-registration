import { TestBed, inject } from '@angular/core/testing';

import { EvService } from './ev.service';

describe('EvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvService]
    });
  });

  it('should be created', inject([EvService], (service: EvService) => {
    expect(service).toBeTruthy();
  }));
});
