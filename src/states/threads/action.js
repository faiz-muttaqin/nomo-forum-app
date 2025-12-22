import api from '../../utils/api';
import { getCachedUsers } from '../../utils/local-data';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
  ADD_COMMENT: 'ADD_COMMENT',
};

function recieveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function upVoteCommentActionCreator(threadId, commentId, userId) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator(threadId, commentId, userId) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentActionCreator(threadId, commentId, userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}
function addCommentActionCreator(threadId, comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      threadId,
      comment,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch, getState) => {
    try {
      const { authUser } = getState();
      const thread = await api.createThread({ title, body, category });
      const threadDetail = await api.getThreadDetail(thread.id);
      const users = getCachedUsers();
      
      // First try to find user by ownerId, then fallback to authUser
      let threadUser = users.find((user) => user.id === thread.ownerId);
      
      // If user not found in cache, use the current logged-in user
      if (!threadUser && authUser) {
        threadUser = authUser;
      }
      
      const threadsWithDetails = {
        ...thread,
        ...threadDetail,
        comments: threadDetail.comments || [],
        user: threadUser,
        totalComments: threadDetail.comments ? threadDetail.comments.length : 0,
      };
      
      dispatch(addThreadActionCreator(threadsWithDetails));
      return true;
    } catch (error) {
      console.error('Error creating thread:', error.message);
      alert(`Failed to create thread: ${error.message}`);
      return false;
    }
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator(threadId, authUser.id));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      console.error(error.message);
      // Revert optimistic update on failure
      dispatch(neutralVoteThreadActionCreator(threadId, authUser.id));
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteThreadActionCreator(threadId, authUser.id));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      console.error(error.message);
      dispatch(neutralVoteThreadActionCreator(threadId, authUser.id));
    }
  };
}

function asyncNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralVoteThreadActionCreator(threadId, authUser.id));

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      console.error(error.message);
    }
  };
}

function asyncUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteCommentActionCreator(threadId, commentId, authUser.id));

    try {
      await api.upVoteComment(threadId, commentId);
    } catch (error) {
      console.error(error.message);
      dispatch(neutralVoteCommentActionCreator(threadId, commentId, authUser.id));
    }
  };
}

function asyncDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteCommentActionCreator(threadId, commentId, authUser.id));

    try {
      await api.downVoteComment(threadId, commentId);
    } catch (error) {
      console.error(error.message);
      dispatch(neutralVoteCommentActionCreator(threadId, commentId, authUser.id));
    }
  };
}

function asyncNeutralVoteComment(threadId, commentId) {
  return async (dispatch) => {
    dispatch(neutralVoteCommentActionCreator(threadId, commentId));

    try {
      await api.neutralVoteComment(threadId, commentId);
    } catch (error) {
      console.error(error.message);
    }
  };
}

function asyncAddComment(threadId, content) {
  return async (dispatch) => {
    try {
      const comment = await api.createThreadComment({ threadId, content });
      dispatch(addCommentActionCreator(threadId, comment));
    } catch (error) {
      console.error(error.message);
    }
  };
}

export {
  ActionType,
  recieveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
  addCommentActionCreator,
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncAddComment,
};
