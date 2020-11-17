import { TestBed } from '@angular/core/testing';

import { ColasService } from './colas.service';

describe('ColasService', () => {
  let service: ColasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
