import {TestBed} from '@angular/core/testing';

import {UserStorageService} from './user-storage.service';
import {User} from "../user/user.types";

describe('UserStorageService', () => {
  let service: UserStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty map', (done: DoneFn) => {
    service.usersMap$.subscribe(usersMap => {
      expect(usersMap.size).toBe(0);
      done();
    });
  });

  it('should update users map with provided users', (done: DoneFn) => {
    const mockUsers: User[] = [
      { id: '1', login: 'UserOne', password: '***' },
      { id: '2', login: 'UserTwo', password: '***' },
    ];

    service.updateUsersMap(mockUsers);

    service.usersMap$.subscribe(usersMap => {
      expect(usersMap.size).toBe(2);
      expect(usersMap.get('1')?.login).toBe('UserOne');
      expect(usersMap.get('2')?.login).toBe('UserTwo');
      done();
    });
  });

  it('should update an existing user in the map', (done: DoneFn) => {
    const initialUser: User = { id: '1', login: 'UserOne', password: '***' };
    const updatedUser: User = { id: '1', login: 'UserOneNew', password: '***' };

    service.updateUsersMap([initialUser]);

    service.updateUsersMap([updatedUser]);

    service.usersMap$.subscribe(usersMap => {
      expect(usersMap.size).toBe(1);
      expect(usersMap.get('1')?.login).toBe('UserOneNew');
      done();
    });
  });

  it('should maintain existing users when adding new ones', (done: DoneFn) => {
    const initialUser: User = { id: '1', login: 'UserOne', password: '***' };
    const newUser: User = { id: '2', login: 'UserTwo', password: '***' };

    service.updateUsersMap([initialUser]);

    service.updateUsersMap([newUser]);

    service.usersMap$.subscribe(usersMap => {
      expect(usersMap.size).toBe(2);
      expect(usersMap.get('1')?.login).toBe('UserOne');
      expect(usersMap.get('2')?.login).toBe('UserTwo');
      done();
    });
  });
});

