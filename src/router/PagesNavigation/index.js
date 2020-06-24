import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {BottomNavigation} from '..';
import {DrawerComp} from '../../components';
import {AddCategory, Dummy, ListCategory} from '../../screens';

const DraNav = createDrawerNavigator();

const PagesNavigation = () => (
  <DraNav.Navigator drawerContent={props => <DrawerComp {...props} />}>
    <DraNav.Screen name="HomeDrawer" component={BottomNavigation} />
    <DraNav.Screen name="ListCategory" component={ListCategory} />
    <DraNav.Screen name="AddProduct" component={AddCategory} />
    <DraNav.Screen name="ListProduct" component={Dummy} />

    <DraNav.Screen name="Cart" component={Dummy} />
  </DraNav.Navigator>
);

export default PagesNavigation;
