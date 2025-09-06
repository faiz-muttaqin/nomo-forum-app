import usersReducer from './reducer';
import { ActionType } from './action';
import { describe, it, expect } from 'vitest';

const exampleUsers = [
  { id: 'user-1', name: 'Alice' },
  { id: 'user-2', name: 'Bob' },
];

describe('usersReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = exampleUsers;
    const action = { type: 'UNKNOWN' };
    const nextState = usersReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return users when given RECIEVE_USERS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECIEVE_USERS,
      payload: { users: exampleUsers },
    };
    const nextState = usersReducer(initialState, action);
    expect(nextState).toEqual(exampleUsers);
  });
});