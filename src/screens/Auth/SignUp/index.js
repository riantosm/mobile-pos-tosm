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
import {
  register,
  registerLoading,
  setForm,
} from '../../../redux/actions/SignUp';
import {colors as c} from '../../../styles';

const {width, height} = Dimensions.get('window');

const SignUp = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {form, formValid, msg} = useSelector(state => state.signUpReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    formValid &&
      (dispatch(registerLoading()),
      navigation.navigate('SignIn'),
      setIsLoading(false));
    formValid === false && (dispatch(registerLoading()), setIsLoading(false));
  });

  const onInputChange = (value, inputType) => {
    dispatch(setForm(inputType, value));
  };

  const sendData = () => {
    setIsLoading(true);
    const {firstName, lastName, username, password, confirmPassword} = form;
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      username.length === 0 ||
      password.length === 0
    ) {
      alert('Tidak boleh kosong');
    } else {
      if (password !== confirmPassword) {
        setIsLoading(false);
        alert('Password tidak sesuai');
      } else {
        dispatch(registerLoading());
        dispatch(register(form));
      }
    }
  };

  return (
    <ScrollView style={s.scrollView}>
      <View style={s.container}>
        <Text>SignUp</Text>
        <View style={s.form}>
          <View style={s.row}>
            <TextInput
              placeholder={'First Name'}
              style={[s.textInput, s.textInputName]}
              value={form.firstName}
              onChangeText={value => onInputChange(value, 'firstName')}
            />
            <TextInput
              placeholder={'Last Name'}
              style={[s.textInput, s.textInputName]}
              value={form.lastName}
              onChangeText={value => onInputChange(value, 'lastName')}
            />
          </View>
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
          <TextInput
            placeholder={'Confirm Password'}
            style={s.textInput}
            value={form.confirmPassword}
            onChangeText={value => onInputChange(value, 'confirmPassword')}
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
  textInputName: {width: '47%'},
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

export default SignUp;
