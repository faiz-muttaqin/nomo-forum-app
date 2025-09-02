const ActionType = {
  SET_AUTH_MODAL: 'SET_AUTH_MODAL',
};

function setAuthModalActionCreator(isOpen) {
  return {
    type: ActionType.SET_AUTH_MODAL,
    payload: {
      isOpen,
    },
  };
}

function asyncAuthModal() {
  return async (dispatch) => {
    dispatch(setAuthModalActionCreator(false));
  };
}

export { ActionType, setAuthModalActionCreator, asyncAuthModal };
