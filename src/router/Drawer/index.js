import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {PagesNavigation} from '..';
import {DrawerComp} from '../../components';
import {Dummy} from '../../screens';

const DraNav = createDrawerNavigator();

const Drawer = () => (
  <DraNav.Navigator drawerContent={props => <DrawerComp {...props} />}>
    <DraNav.Screen name="HomeDrawer" component={PagesNavigation} />

    <DraNav.Screen name="Cart" component={Dummy} />
  </DraNav.Navigator>
);

export default Drawer;
