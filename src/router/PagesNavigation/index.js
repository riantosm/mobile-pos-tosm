import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  ListCategory,
  FormCategory,
  ListProduct,
  FormProduct,
} from '../../screens';
import {BottomNavigation} from '..';

const Stack = createStackNavigator();

const PagesNavigation = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
    <Stack.Screen name="ListCategory" component={ListCategory} />
    <Stack.Screen name="FormCategory" component={FormCategory} />
    <Stack.Screen name="ListProduct" component={ListProduct} />
    <Stack.Screen name="FormProduct" component={FormProduct} />
  </Stack.Navigator>
);

export default PagesNavigation;
