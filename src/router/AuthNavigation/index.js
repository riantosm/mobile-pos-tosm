import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SignIn, SignUp, Welcome} from '../../screens';

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

export default AuthNavigation;
