import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//import { fonts as f, colors as c } from '../../../styles'

const DrawerComp = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>DrawerComp</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Text>Cek Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DrawerComp;
