import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addCategory,
  categoryLoading,
  editCategory,
  setForm,
} from '../../../../redux/actions/Category';
//import { fonts as f, colors as c } from '../../../styles'

const FormCategory = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {form, formValid} = useSelector(state => state.categoryReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    formValid &&
      (dispatch(categoryLoading()), setIsLoading(false), navigation.goBack());
    formValid === false && dispatch(categoryLoading(), setIsLoading(false));
  });

  const onInputChange = (value, inputType) => {
    dispatch(setForm(inputType, value));
  };

  const sendData = () => {
    setIsLoading(true);
    const {name_category} = form;
    if (name_category.length === 0) {
      setIsLoading(false);
      alert('Tidak boleh kosong');
    } else {
      route.params[0] === 'Add'
        ? dispatch(addCategory(form))
        : dispatch(editCategory(form));
    }
  };

  return (
    <View style={styles.container}>
      <Text>AddCategory</Text>
      <TextInput
        placeholder={'Name Category'}
        value={form.name_category}
        onChangeText={value => onInputChange(value, 'name_category')}
      />
      {isLoading ? (
        <View>
          <ActivityIndicator color="white" />
        </View>
      ) : (
        <TouchableOpacity onPress={() => sendData()}>
          <Text>Submit</Text>
        </TouchableOpacity>
      )}
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

export default FormCategory;
