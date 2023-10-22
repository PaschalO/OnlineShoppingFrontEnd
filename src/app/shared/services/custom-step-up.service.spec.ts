import { TestBed } from '@angular/core/testing';

import { CustomStepUpService } from './custom-step-up.service';

describe('CustomStepUpService', () => {
  let service: CustomStepUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomStepUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
