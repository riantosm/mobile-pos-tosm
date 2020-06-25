const initialState = {
  isLogin: true,
  user: {
    _id: '',
    fullname_user: '',
    username: '',
  },
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, isLogin: true};
    case 'LOGOUT':
      return {...state, isLogin: false};
    case 'CEK_USER': {
      return {
        ...state,
        user: {
          _id: action.payload.data.result._id,
          fullname_user: action.payload.data.result.fullname_user,
          username: action.payload.data.result.username,
        },
      };
    }
    default:
      return state;
  }
};

export default authReducers;
