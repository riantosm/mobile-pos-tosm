import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
//import { fonts as f, colors as c } from '../../../styles'
import {useDispatch} from 'react-redux';
import {cekUser} from '../../../redux/actions/Auth';
import {getAllCategory} from '../../../redux/actions/Category';

const Home = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cekUser());
    dispatch(getAllCategory(10, 1, 'asc', '_id', null, null));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
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

export default Home;
