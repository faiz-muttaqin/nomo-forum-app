import { ActionType } from './action';
import { getCachedThreads } from '../../utils/local-data';
function threadsReducer(threads = getCachedThreads(), action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    default:
      return threads;
  }
}

export default threadsReducer;
