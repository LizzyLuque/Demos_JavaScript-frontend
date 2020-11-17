import { TestBed } from '@angular/core/testing';

import { UserCrudGuard } from './user-crud.guard';

describe('UserCrudGuard', () => {
  let guard: UserCrudGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserCrudGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
