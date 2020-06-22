import {CEK_USER, LOGIN, LOGOUT} from '../actions/types';

const initialState = {
  isLogin: true,
  _id: '',
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLogin: true,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLogin: false,
      };
    }
    case CEK_USER: {
      console.log(state._id);
      return {
        ...state,
        _id: action.payload.data.result._id,
      };
    }
    default:
      return state;
  }
};

export default authReducers;
