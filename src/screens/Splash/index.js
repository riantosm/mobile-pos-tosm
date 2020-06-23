import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
//import { fonts as f, colors as c } from '../../../styles'

const Splash = props => {
  return (
    <View style={styles.container}>
      <Text>Splash</Text>
      <ActivityIndicator />
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

export default Splash;
