import api from '../../utils/api';

const ActionType = {
  RECIEVE_USERS: 'RECIEVE_USERS',
};

function recieveUsersActionCreator(users) {
  return {
    type: ActionType.RECIEVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      const response = await api.register({ name, email, password });
      return response;
    } catch (error) {
      return error;
    }
  };
}

export { ActionType, recieveUsersActionCreator, asyncRegisterUser };
