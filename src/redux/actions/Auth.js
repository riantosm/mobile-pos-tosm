import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {api} from 'react-native-dotenv';

const authLogin = () => ({type: 'LOGIN'});
const authLogout = () => ({type: 'LOGOUT'});
const cekUserResult = token => ({type: 'CEK_USER', payload: token});
const cekUser = () =>
  function(dispatch) {
    getToken().then(token => {
      axios
        .get(`${api}/auth/cekUser`, {
          headers: {
            token,
          },
        })
        .then(response => {
          dispatch(cekUserResult(response));
        });
    });
  };
const getToken = async () => {
  let token = await AsyncStorage.getItem('token');
  return token;
};

export {authLogin, authLogout, cekUser};
