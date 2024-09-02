import { TestBed } from '@angular/core/testing';

import { UserStorageService } from './user-storage.service';

describe('UserStorageService', () => {
  let service: UserStorageService;
  // TODO add tests

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
