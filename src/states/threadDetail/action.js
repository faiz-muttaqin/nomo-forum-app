import api from '../../utils/api';

const ActionType = {
  ADD_COMMENT: 'ADD_COMMENT',
};

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function asyncAddComment({ content, id }) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ content, id });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      console.log(error.message);
    }
  };
}

export { ActionType, asyncAddComment };
