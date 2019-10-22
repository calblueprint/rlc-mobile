import types from '../lib/actionTypes'

let actions = {
    //General
    receiveStandardError: (error) => {
      return {
        type: types.RECEIVE_STANDARD_ERROR,
        error
      }
    },

    //User
    receiveUserSuccess: (user) => {
      return {
        type: types.RECEIVE_USER_SUCCESS,
        user
      }
    },
    requestUser: () => {
        return {
          type: types.REQUEST_USER,
        }
    },
    logout: () => {
      return {
        type: types.LOGOUT
      }
    },
};

export default actions;