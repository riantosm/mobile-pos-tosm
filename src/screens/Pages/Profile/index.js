import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts as f, colors as c} from '../../../styles';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout, cekUser} from '../../../redux/actions/Auth';

const Profile = props => {
  const {user} = useSelector(state => state.authReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cekUser());
  }, []);

  const logout = async () => {
    await AsyncStorage.setItem('token', '');
    dispatch(authLogout());
  };

  return (
    <View style={styles.container}>
      <Text>Profile {user.fullname_user || 'Fullname User'}</Text>
      <TouchableOpacity style={{padding: 20}} onPress={() => logout()}>
        <Text>logout</Text>
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

export default Profile;
