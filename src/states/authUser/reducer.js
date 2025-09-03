import { ActionType } from './action';
import api from '../../utils/api';

function authUserReducer(authUser = api.getCachedOwnProfile(), action = {}) {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload.authUser;
    case ActionType.UNSET_AUTH_USER:
      return null;
    default:
      return authUser;
  }
}

export default authUserReducer;
