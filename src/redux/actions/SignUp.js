import axios from 'axios';
import {api} from 'react-native-dotenv';

const registerLoading = () => ({type: 'SET_LOADING'});
const registerResult = data => ({type: 'SIGN_UP', payload: data});
const register = data =>
  function(dispatch) {
    const {firstName, lastName, username, password} = data;
    const fullname_user = firstName + ' ' + lastName;
    const sendData = {fullname_user, username, password};
    axios.post(`${api}/user`, sendData).then(response => {
      dispatch(registerResult(response));
    });
  };
const setForm = (inputType, value) => ({
  type: 'SET_FORM_SIGN_UP',
  inputType: inputType,
  inputValue: value,
});

export {registerLoading, registerResult, register, setForm};
