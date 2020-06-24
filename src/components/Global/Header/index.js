import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fonts as f, colors as c} from '../../../styles';

const Header = props => {
  return (
    <View style={s.container}>
      <Text style={s.textHeader}>Data</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    backgroundColor: c.blueDark,
    padding: 20,
  },
  textHeader: {color: 'white', fontFamily: f.Goo_Bold},
});

export default Header;
