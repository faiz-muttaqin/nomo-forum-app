import { ActionType } from './action';

function isAuthModalReducer(isAuthModal = false, action = {}) {
  switch (action.type) {
    case ActionType.SET_AUTH_MODAL:
      return action.payload.isOpen;
    default:
      return isAuthModal;
  }
}

export default isAuthModalReducer;
