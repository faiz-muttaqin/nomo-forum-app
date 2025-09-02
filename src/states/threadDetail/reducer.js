import { ActionType } from './action';

function threadDetailReducer(detailThread = null, action = {}) {
  switch (action.type) {
  case ActionType.ADD_COMMENT:
    return detailThread;
  default:
    return detailThread;
  }
}

export default threadDetailReducer;
