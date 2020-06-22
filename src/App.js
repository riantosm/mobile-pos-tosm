import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigation} from './router';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {authLogin, authLogout, cekUser} from './redux/actions/Auth';
import {useDispatch, useSelector} from 'react-redux';

const Stack = createStackNavigator();

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const logout = async () => {
    await AsyncStorage.setItem('token', '');
    dispatch(authLogout());
  };
  const cekThisUser = () => {
    dispatch(cekUser());
  };
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity style={{padding: 20}} onPress={() => cekThisUser()}>
        <Text>cek user</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{padding: 20}} onPress={() => logout()}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  // const [isLogin, setIsLogin] = useState();
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
      if (token) {
        dispatch(authLogin());
      } else {
        dispatch(authLogout());
      }
    } catch (e) {}
  };

  if (isLoading) return <Text>Loading</Text>;

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {isLogin ? (
            <Stack.Screen name="Home" component={Home} />
          ) : (
            <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
