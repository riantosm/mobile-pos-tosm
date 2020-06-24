import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//import { fonts as f, colors as c } from '../../../styles'
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteCategory,
  getAllCategory,
  setFormAdd,
  setFormEdit,
} from '../../../../redux/actions/Category';

const ListCategory = ({navigation}) => {
  const {category} = useSelector(state => state.categoryReducers);
  const dispatch = useDispatch();

  const getData = () => {
    dispatch(getAllCategory());
  };

  return (
    <View style={s.container}>
      <Text>ListCategory</Text>
      <TouchableOpacity onPress={() => getData()}>
        <Text style={{padding: 20}}>refresh</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddProduct', ['Add']);
          dispatch(setFormAdd());
        }}>
        <Text style={{padding: 20}}>add</Text>
      </TouchableOpacity>
      <FlatList
        data={category}
        renderItem={({item}) => (
          <View style={s.row}>
            <Text>{item.name_category}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddProduct', ['Edit']);
                dispatch(setFormEdit(item));
              }}>
              <Text style={s.btnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(deleteCategory(item))}>
              <Text style={s.btnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnText: {paddingLeft: 20, padding: 15},
});

export default ListCategory;
