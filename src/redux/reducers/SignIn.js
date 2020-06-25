import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  form: {
    username: '',
    password: '',
  },
  formValid: null,
  msg: '',
};

const signInReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        formValid: null,
      };
    case 'SET_FORM_SIGN_IN':
      return {
        ...state,
        form: {...state.form, [action.inputType]: action.inputValue},
        msg: '',
      };
    case 'SIGN_IN':
      if (action.payload.data.result.token) {
        let token = action.payload.data.result.token;
        setToken(token);
      }
      return action.payload.data.status === 'Success'
        ? {
            ...state,
            formValid: true,
            form: {
              username: '',
              password: '',
            },
          }
        : {
            ...state,
            formValid: false,
            msg: 'Username / password incorrect',
          };
    default:
      return state;
  }
};

setToken = async token => {
  await AsyncStorage.setItem('token', token);
};

export default signInReducers;
