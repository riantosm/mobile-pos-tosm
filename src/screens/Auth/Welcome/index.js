import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Welcome = ({navigation}) => {
  return (
    <View style={s.container}>
      <Text>Welcome</Text>
      <View style={s.row}>
        <TouchableOpacity
          style={s.btn}
          onPress={() => navigation.navigate('SignIn')}>
          <Text>SingIn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={s.btn}
          onPress={() => navigation.navigate('SignUp')}>
          <Text>SingUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {flexDirection: 'row'},
  btn: {padding: 20},
});

export default Welcome;
