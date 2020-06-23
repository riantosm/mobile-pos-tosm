import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import IconF from 'react-native-vector-icons/Feather';
import {Data, History, Home, Profile} from '../../screens';
import {colors as c, fonts as f} from '../../styles';

const Tab = createMaterialBottomTabNavigator();

const PagesNavigation = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor={c.blueDark}
    inactiveColor={c.gray}
    style={{backgroundColor: 'tomato'}}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: <Text style={s.textFont}>Home</Text>,
        tabBarColor: '#fff',
        tabBarIcon: ({color}) => <IconF name="home" color={color} size={20} />,
      }}
    />
    <Tab.Screen
      name="Data"
      component={Data}
      options={{
        tabBarLabel: <Text style={s.textFont}>Data</Text>,
        tabBarColor: '#fff',
        tabBarIcon: ({color}) => (
          <IconF name="archive" color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Hitory"
      component={History}
      options={{
        tabBarLabel: <Text style={s.textFont}>History</Text>,
        tabBarColor: '#fff',
        tabBarIcon: ({color}) => (
          <IconF name="bar-chart" color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: <Text style={s.textFont}>Profile</Text>,
        tabBarColor: '#fff',
        tabBarColor: '#fff',
        tabBarIcon: ({color}) => <IconF name="user" color={color} size={20} />,
      }}
    />
  </Tab.Navigator>
);

const s = StyleSheet.create({
  textFont: {fontFamily: f.Goo_Reg},
});

export default PagesNavigation;
