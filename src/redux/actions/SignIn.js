import axios from 'axios';
import {api} from 'react-native-dotenv';

const loginLoading = () => ({type: 'SET_LOADING'});
const loginResult = data => ({type: 'SIGN_IN', payload: data});
const login = data =>
  function(dispatch) {
    axios.post(`${api}/auth/login`, data).then(response => {
      dispatch(loginResult(response));
    });
  };
const setForm = (inputType, value) => ({
  type: 'SET_FORM_SIGN_IN',
  inputType: inputType,
  inputValue: value,
});

export {loginLoading, loginResult, login, setForm};
