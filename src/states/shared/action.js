import api from '../../utils/api';
import {
  setCachedLeaderboards,
  setCachedUsers,
  getCachedUsers,
  setCachedThreads,
} from '../../utils/local-data';

import { recieveLeaderboardsActionCreator } from '../leaderboard/action';
import { recieveThreadsActionCreator } from '../threads/action';
import { recieveUsersActionCreator } from '../users/action';

export function asyncPopulateUsers() {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers();
      dispatch(recieveUsersActionCreator(users));
      setCachedUsers(users);
      return users; // Return users for potential use in other functions
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function asyncPopulateThreads() {
  return async (dispatch) => {
    try {
      const users = getCachedUsers();
      const threads = await api.getAllThreads();
      // Fetch thread details for each thread
      const threadsWithDetails = await Promise.all(
        threads.map(async (thread) => {
          const threadDetail = await api.getThreadDetail(thread.id);
          return {
            ...thread,
            comments: threadDetail.comments,
            user: users.find((user) => user.id === thread.ownerId),
          };
        })
      );
      dispatch(recieveThreadsActionCreator(threadsWithDetails));
      setCachedThreads(threadsWithDetails);
    } catch (error) {
      console.log(error.message);
    }
  };
}

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    try {
      await dispatch(asyncPopulateUsers());
      await dispatch(asyncPopulateThreads());
    } catch (error) {
      console.log(error.message);
    }
  };
}
export function asyncPopulateLeaderBoards() {
  return async (dispatch) => {
    try {
      const leaderboards = await api.getLeaderboards();

      dispatch(recieveLeaderboardsActionCreator(leaderboards));
      setCachedLeaderboards(leaderboards);
    } catch (error) {
      console.error(error.message);
    }
  };
}

export default asyncPopulateUsersAndThreads;
