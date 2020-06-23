import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {authLogin} from '../../../redux/actions/Auth';
import {login, loginLoading, setForm} from '../../../redux/actions/SignIn';
import {colors as c} from '../../../styles';

const {width, height} = Dimensions.get('window');

const SignIn = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {form, formValid, msg} = useSelector(state => state.signInReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    formValid && (dispatch(loginLoading()), dispatch(authLogin()));
    formValid === false && (dispatch(loginLoading()), setIsLoading(false));
  });

  const onInputChange = (value, inputType) => {
    dispatch(setForm(inputType, value));
  };

  const sendData = () => {
    setIsLoading(true);
    const {username, password} = form;
    if (username.length === 0 || password.length === 0) {
      setIsLoading(false);
      alert('Tidak boleh kosong');
    } else {
      dispatch(login(form));
    }
  };

  return (
    <ScrollView style={s.scrollView}>
      <View style={s.container}>
        <Text>SignUp</Text>
        <View style={s.form}>
          <TextInput
            placeholder={'Username'}
            style={s.textInput}
            value={form.username}
            autoCapitalize="none"
            onChangeText={value => onInputChange(value, 'username')}
          />
          <TextInput
            placeholder={'Password'}
            style={s.textInput}
            value={form.password}
            onChangeText={value => onInputChange(value, 'password')}
            secureTextEntry={true}
          />
          <Text>{msg}</Text>
          {isLoading ? (
            <View style={[s.btn, s.submit]}>
              <ActivityIndicator color="white" />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => sendData()}
              style={[s.btn, s.submit]}>
              <View>
                <Text style={s.btnText}>Submit</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[s.btn, s.back]}>
            <View>
              <Text style={s.btnTextBack}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  scrollView: {backgroundColor: 'white'},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height,
    paddingTop: 20,
  },
  form: {padding: 20, width},
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  textInput: {
    borderWidth: 1,
    borderColor: c.gray,
    borderRadius: 100,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: c.blueDark,
    padding: 15,
    paddingHorizontal: 25,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  submit: {backgroundColor: c.blueDark},
  back: {backgroundColor: 'transparent'},
  btnText: {color: 'white'},
  btnTextBack: {color: c.grayText},
});

export default SignIn;
