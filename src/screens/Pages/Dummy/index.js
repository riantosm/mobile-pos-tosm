import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//import { fonts as f, colors as c } from '../../../styles'

const Dummy = props => {
  return (
    <View style={styles.container}>
      <Text>Dummy</Text>
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

export default Dummy;
