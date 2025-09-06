import leaderboardsReducer from './reducer';
import { ActionType } from './action';
import { describe, it, expect } from 'vitest';

const exampleLeaderboards = [
  {
    user: {
      id: 'user-mQhLzINW_w5TxxYf',
      name: 'Dimas Saputra',
      email: 'dimas@dicoding.com',
      avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    },
    score: 55,
  },
  {
    user: {
      id: 'user-1arruYipuS9PIhPm',
      name: 'surya16',
      email: 'surya16@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=surya16&background=random',
    },
    score: 0,
  },
];

describe('leaderboardsReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = exampleLeaderboards;
    const action = { type: 'UNKNOWN' };
    const nextState = leaderboardsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return leaderboards when given RECIEVE_LEADERBOARD action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECIEVE_LEADERBOARD,
      payload: { leaderboards: exampleLeaderboards },
    };
    const nextState = leaderboardsReducer(initialState, action);
    expect(nextState).toEqual(exampleLeaderboards);
  });
});
