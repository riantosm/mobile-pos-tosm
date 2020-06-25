const initialState = {
  form: {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  },
  formValid: null,
  msg: '',
};

const signUpReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FORM_SIGN_UP':
      return {
        ...state,
        form: {...state.form, [action.inputType]: action.inputValue},
        msg: '',
      };
    case 'SIGN_UP':
      return action.payload.data.status === 'Success'
        ? {
            ...state,
            formValid: true,
            form: {
              firstName: '',
              lastName: '',
              username: '',
              password: '',
              confirmPassword: '',
            },
          }
        : {
            ...state,
            formValid: false,
            msg: 'Data invalid',
          };
    case 'SET_LOADING':
      return {...state, formValid: null};
    default:
      return state;
  }
};

export default signUpReducers;
