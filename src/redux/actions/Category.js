import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {api} from 'react-native-dotenv';
import {
  ADD_CATEGORY_FAILED,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILED,
  EDIT_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY,
  SET_FORM_ADD,
  SET_FORM_CATEGORY,
  SET_FORM_EDIT,
  SET_LOADING,
} from './types';

const categoryLoading = () => ({type: SET_LOADING});
const getAllCategoryResult = data => ({type: GET_ALL_CATEGORY, payload: data});
const getAllCategory = () =>
  function(dispatch) {
    getToken().then(token => {
      axios
        .get(`${api}/category`, {
          headers: {
            token,
          },
        })
        .then(response => {
          dispatch(getAllCategoryResult(response));
        });
    });
  };
const setFormAdd = () => ({type: SET_FORM_ADD});
const addCategorySuccess = data => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: data,
});
const addCategoryFailed = data => ({type: ADD_CATEGORY_FAILED, payload: data});
const addCategory = data =>
  function(dispatch) {
    getToken().then(token => {
      axios
        .post(`${api}/category`, data, {
          headers: {
            token,
          },
        })
        .then(response => {
          response.data.status === 'Success'
            ? dispatch(addCategorySuccess(response))
            : dispatch(addCategoryFailed(response));
        });
    });
  };
const editCategorySuccess = data => ({
  type: EDIT_CATEGORY_SUCCESS,
  payload: data,
});
const editCategoryFailed = data => ({
  type: EDIT_CATEGORY_FAILED,
  payload: data,
});
const editCategory = data =>
  function(dispatch) {
    getToken().then(token => {
      axios
        .patch(`${api}/category/${data._id}`, data, {
          headers: {
            token,
          },
        })
        .then(response => {
          response.data.status === 'Success'
            ? dispatch(editCategorySuccess(response))
            : dispatch(editCategoryFailed(response));
        });
    });
  };
const setFormEdit = data => ({type: SET_FORM_EDIT, payload: data});
const deleteCategorySuccess = data => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload: data,
});
const deleteCategory = data =>
  function(dispatch) {
    getToken().then(token => {
      axios
        .delete(`${api}/category/${data._id}`, {
          headers: {
            token,
          },
        })
        .then(response => {
          dispatch(deleteCategorySuccess(response));
        });
    });
  };
const getToken = async () => {
  let token = await AsyncStorage.getItem('token');
  return token;
};
const setForm = (inputType, value) => ({
  type: SET_FORM_CATEGORY,
  inputType: inputType,
  inputValue: value,
});

export {
  categoryLoading,
  getAllCategoryResult,
  getAllCategory,
  setFormAdd,
  addCategory,
  editCategory,
  setFormEdit,
  deleteCategory,
  setForm,
};
