import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authLogin, authLogout} from './redux/actions/Auth';
import {AuthNavigation, PagesNavigation} from './router';
import {Splash} from './screens';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {isLogin} = useSelector(state => state.authReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    getToken();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  getToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      if (token) dispatch(authLogin());
      else dispatch(authLogout());
    } catch (e) {}
  };

  if (isLoading) return <Splash />;

  return (
    <>
      <NavigationContainer>
        {isLogin ? <PagesNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </>
  );
};

export default App;
