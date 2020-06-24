import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Header} from '../../../components';
//import { fonts as f, colors as c } from '../../../styles'

const Data = ({navigation}) => {
  return (
    <>
      <Header />
      <View style={s.container}>
        <Text>Data</Text>
        <View style={s.row}>
          <TouchableOpacity onPress={() => navigation.navigate('ListCategory')}>
            <Text style={s.btnText}>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ListProduct')}>
            <Text style={s.btnText}>Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {flexDirection: 'row'},
  btnText: {padding: 20},
});

export default Data;
