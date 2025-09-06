import { describe, it, expect } from 'vitest';
import { ActionType, recieveUsersActionCreator } from './action';

describe('recieveUsersActionCreator', () => {
  it('should create correct action object', () => {
    const users = [{ id: 'user-1', name: 'Alice' }];
    const action = recieveUsersActionCreator(users);
    expect(action).toEqual({
      type: ActionType.RECIEVE_USERS,
      payload: { users },
    });
  });
});