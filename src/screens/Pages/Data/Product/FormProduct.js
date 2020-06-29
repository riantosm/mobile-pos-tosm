import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProduct,
  productLoading,
  editProduct,
  setForm,
} from '../../../../redux/actions/Product';
import {getAllCategory} from '../../../../redux/actions/Category';
import ImagePicker from 'react-native-image-picker';
import {default_food} from '../../../../assets';
import {Picker} from '@react-native-community/picker';
//import { fonts as f, colors as c } from '../../../styles'

const FormProduct = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState('noSelect');
  const {form, formValid, msg} = useSelector(state => state.productReducers);
  const [thisCategory, setThisCategory] = useState(
    route.params[0] === 'Add' ? 'NoSeleced' : form.id_category,
  );
  const {category} = useSelector(state => state.categoryReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    formValid &&
      (dispatch(productLoading()), setIsLoading(false), navigation.goBack());
    formValid === false && dispatch(productLoading(), setIsLoading(false));
  });

  useEffect(() => {
    console.log('form.id_category: ', form.id_category);
    // if (form.id_category === '') {
    //   category.map(data => {
    //     form.category_product === data.name_category &&
    //       onInputChange(data._id, 'id_category');
    //   });
    // }
  }, []);

  const onInputChange = (value, inputType) => {
    dispatch(setForm(inputType, value));
  };

  const sendData = async () => {
    // console.log(form);
    setIsLoading(true);
    const {name_product} = form;
    if (name_product.length === 0) {
      setIsLoading(false);
      alert('Tidak boleh kosong');
    } else {
      route.params[0] === 'Add'
        ? dispatch(addProduct(form))
        : dispatch(editProduct(form));
    }
  };

  const showImage = () => {
    const options = {
      title: 'Add product image',
      mediaType: 'photo',
      maxWidth: 1024,
      maxHeight: 1024,
      noData: true,
      cropping: true,
      storageOptions: {
        skipBackup: true,
        path: 'posApp',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log('source: ', source);
        // console.log('response', response);
        dispatch(setForm('image', response));
      }
    });
  };

  return (
    <View style={s.container}>
      <Text>FormProduct</Text>
      <TextInput
        placeholder={'Name Product'}
        value={form.name_product}
        onChangeText={value => onInputChange(value, 'name_product')}
      />
      <TextInput
        placeholder={'Desc Product'}
        value={form.desc_product}
        onChangeText={value => onInputChange(value, 'desc_product')}
      />
      <TextInput
        placeholder={'Price Product'}
        value={form.price_product}
        keyboardType="number-pad"
        onChangeText={value => onInputChange(value, 'price_product')}
      />
      <Picker
        selectedValue={selected}
        style={{height: 50, width: 200}}
        onValueChange={(itemValue, itemIndex) => {
          setSelected(itemValue);
          onInputChange(itemValue, 'id_category');
        }}>
        <Picker.Item
          label={
            form.category_product !== ''
              ? `Now: ${form.category_product}`
              : 'Select Category'
          }
          value={thisCategory}
        />
        {category.map(data => {
          return (
            <Picker.Item
              key={data._id}
              label={data.name_category}
              value={data._id}
            />
          );
        })}
      </Picker>
      <View>
        <Image
          source={form.image.uri === null ? default_food : form.image}
          style={{
            width: 100,
            height: 100,
            borderWidth: 1,
            borderColor: '#ddd',
            margin: 10,
            alignSelf: 'flex-end',
          }}
        />
        <TouchableOpacity style={s.btn} onPress={() => showImage()}>
          <Text style={{color: '#3a7bd5', fontWeight: 'bold'}}>
            Chose Image
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View>
          <ActivityIndicator color="white" />
        </View>
      ) : (
        <TouchableOpacity onPress={() => sendData()}>
          <Text>Submit</Text>
        </TouchableOpacity>
      )}
      <Text>{msg}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FormProduct;
