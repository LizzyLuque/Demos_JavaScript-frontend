import { TestBed } from '@angular/core/testing';

import { EmoticonService } from './emoticon.service';

describe('EmoticonService', () => {
  let service: EmoticonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmoticonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
