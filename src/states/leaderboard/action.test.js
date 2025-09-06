import { describe, it, expect } from 'vitest';
import { ActionType, recieveLeaderboardsActionCreator } from './action';

describe('recieveLeaderboardsActionCreator', () => {
  it('should create correct action object', () => {
    const leaderboards = [{ user: 'A', score: 10 }];
    const action = recieveLeaderboardsActionCreator(leaderboards);
    expect(action).toEqual({
      type: ActionType.RECIEVE_LEADERBOARD,
      payload: { leaderboards },
    });
  });
});
