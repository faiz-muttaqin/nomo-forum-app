const ActionType = {
  RECIEVE_LEADERBOARD: 'RECIEVE_LEADERBOARD',
};

function recieveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECIEVE_LEADERBOARD,
    payload: {
      leaderboards,
    },
  };
}

export { ActionType, recieveLeaderboardsActionCreator };
