import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {api} from 'react-native-dotenv';

const categoryLoading = () => ({type: 'SET_LOADING'});
const loadMore = () => ({type: 'LOAD_MORE'});
const loadSort = () => ({type: 'LOAD_SORT'});
const loadSearch = () => ({type: 'LOAD_SEARCH'});
const loadRefresh = () => ({type: 'LOAD_REFRESH'});
const loadDeleted = () => ({type: 'LOAD_DELETED'});
const setForm = (inputType, value) => ({
  type: 'SET_FORM_CATEGORY',
  inputType: inputType,
  inputValue: value,
});

// get
const getAllCategoryResult = data => ({
  type: 'GET_ALL_CATEGORY',
  payload: data,
});
const getAllCategory = (limit, page, sort, sortBy, search, searchBy) =>
  function(dispatch) {
    limitUrl = `limit=${limit}`;
    pageUrl = `page=${page}`;
    sortUrl = `sort=${sort}`;
    sortByUrl = `sortBy=${sortBy}`;
    searchUrl = search !== null ? `&search=${search}` : '';
    searchByUrl = search !== null ? `&searchBy=${searchBy}` : '';
    let url = `${api}/category?${sortByUrl}&${limitUrl}&${sortUrl}&${pageUrl}${searchUrl}${searchByUrl}`;
    getToken().then(token => {
      axios
        .get(url, {
          headers: {
            token,
          },
        })
        .then(response => {
          // console.log(response.data.result);
          dispatch(getAllCategoryResult(response));
        });
    });
  };

// add
const setFormAdd = () => ({type: 'SET_FORM_ADD'});
const addCategorySuccess = data => ({
  type: 'ADD_CATEGORY_SUCCESS',
  payload: data,
});
const addCategoryFailed = data => ({
  type: 'ADD_CATEGORY_FAILED',
  payload: data,
});
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

// edit
const setFormEdit = data => ({type: 'SET_FORM_EDIT', payload: data});
const editCategorySuccess = data => ({
  type: 'EDIT_CATEGORY_SUCCESS',
  payload: data,
});
const editCategoryFailed = data => ({
  type: 'EDIT_CATEGORY_FAILED',
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

// delete
const deleteCategorySuccess = data => ({
  type: 'DELETE_CATEGORY_SUCCESS',
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

// get token
const getToken = async () => {
  let token = await AsyncStorage.getItem('token');
  return token;
};

export {
  categoryLoading,
  loadMore,
  loadSort,
  loadSearch,
  loadRefresh,
  loadDeleted,
  getAllCategory,
  setFormAdd,
  addCategory,
  editCategory,
  setFormEdit,
  deleteCategory,
  setForm,
};
