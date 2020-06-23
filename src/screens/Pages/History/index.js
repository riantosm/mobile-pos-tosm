import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//import { fonts as f, colors as c } from '../../../styles'

const History = props => {
  return (
    <View style={styles.container}>
      <Text>History</Text>
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

export default History;
