import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import leaderboardsReducer from './leaderboard/reducer';
import isAuthModalReducer from './authModal/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    leaderboards: leaderboardsReducer,
    authModal: isAuthModalReducer,
  },
});

export default store;
