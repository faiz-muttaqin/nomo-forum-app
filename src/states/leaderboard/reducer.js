import { ActionType } from './action';
import { getCachedLeaderboards } from '../../utils/local-data';

function leaderboardsReducer(leaderboards = getCachedLeaderboards(), action = {}) {
  switch (action.type) {
    case ActionType.RECIEVE_LEADERBOARD:
      return action.payload.leaderboards;
    default:
      return leaderboards;
  }
}

export default leaderboardsReducer;
