import { TestBed } from '@angular/core/testing';

import { ItemQuantityService } from './item-quantity.service';

describe('ItemQuantityService', () => {
  let service: ItemQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
