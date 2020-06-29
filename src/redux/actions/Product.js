import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {api} from 'react-native-dotenv';

const productLoading = () => ({type: 'SET_LOADING_PRODUCT'});
const loadMore = () => ({type: 'LOAD_MORE_PRODUCT'});
const loadSort = () => ({type: 'LOAD_SORT_PRODUCT'});
const loadSearch = () => ({type: 'LOAD_SEARCH_PRODUCT'});
const loadRefresh = () => ({type: 'LOAD_REFRESH_PRODUCT'});
const loadDeleted = () => ({type: 'LOAD_DELETED_PRODUCT'});
const setForm = (inputType, value) => ({
  type: 'SET_FORM_PRODUCT',
  inputType: inputType,
  inputValue: value,
});
// get
const getAllProductResult = data => ({
  type: 'GET_ALL_PRODUCT',
  payload: data,
});
const getAllProduct = (limit, page, sort, sortBy, search, searchBy) =>
  function(dispatch) {
    limitUrl = `limit=${limit}`;
    pageUrl = `page=${page}`;
    sortUrl = `sort=${sort}`;
    sortByUrl = `sortBy=${sortBy}`;
    searchUrl = search !== null ? `&search=${search}` : '';
    searchByUrl = search !== null ? `&searchBy=${searchBy}` : '';
    let url = `${api}/product?${sortByUrl}&${limitUrl}&${sortUrl}&${pageUrl}${searchUrl}${searchByUrl}`;
    getToken().then(token => {
      axios
        .get(url, {
          headers: {
            token,
          },
        })
        .then(response => {
          dispatch(getAllProductResult(response));
        });
    });
  };

// add
const setFormAdd = () => ({type: 'SET_FORM_ADD'});
const addProductSuccess = data => ({
  type: 'ADD_PRODUCT_SUCCESS',
  payload: data,
});
const addProductFailed = data => ({
  type: 'ADD_PRODUCT_FAILED',
  payload: data,
});
const addProduct = data => {
  // console.log(data.image);
  const fd = new FormData();
  fd.append('name_product', data.name_product);
  fd.append('desc_product', data.desc_product);
  fd.append('price_product', parseInt(data.price_product));
  fd.append('id_category', data.id_category);
  if (data.image.uri !== null)
    fd.append('image', {
      uri: data.image.uri,
      name: data.image.fileName,
      type: data.image.type,
    });
  else fd.append('image', undefined);
  return function(dispatch) {
    // console.log('fd: ',fd);
    getToken().then(token => {
      axios
        .post(`${api}/product`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token,
          },
        })
        .then(response => {
          response.data.status === 'Success'
            ? dispatch(addProductSuccess(response))
            : dispatch(addProductFailed(response));
        })
        .catch(err => {
          addProductFailed(err)
          console.log(err);
        });
    });
  };
};

// edit
const setFormEdit = data => {
  console.log('data:',data);
  let newData = {
    _id: data._id,
    name_product: data.name_product,
    desc_product: data.desc_product,
    price_product: String(data.price_product),
    id_category: data.id_category,
    category_product: data.category_product,
    image: {uri: data.image},
    stock: String(data.stock),
  };
  return {type: 'SET_FORM_EDIT', payload: newData};
};
const editProductSuccess = data => ({
  type: 'EDIT_PRODUCT_SUCCESS',
  payload: data,
});
const editProductFailed = data => ({
  type: 'EDIT_PRODUCT_FAILED',
  payload: data,
});
const editProduct = data => {
  const fd = new FormData();
  fd.append('name_product', data.name_product);
  fd.append('desc_product', data.desc_product);
  fd.append('price_product', parseInt(data.price_product));
  fd.append('id_category', data.id_category);
  if (data.image.fileName !== undefined)
    fd.append('image', {
      uri: data.image.uri,
      name: data.image.fileName,
      type: data.image.type,
    });
  else fd.append('image', undefined);
  return function(dispatch) {
    getToken().then(token => {
      axios
        .patch(`${api}/product/${data._id}`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token,
          },
        })
        .then(response => {
          response.data.status === 'Success'
            ? dispatch(editProductSuccess(response))
            : dispatch(editProductFailed(response));
        })
        .catch(err => {
          dispatch(editProductFailed())
          // console.log(err);
        });
    });
  };
};

// delete
const deleteProductSuccess = data => ({
  type: 'DELETE_PRODUCT_SUCCESS',
  payload: data,
});
const deleteProduct = data =>
  function(dispatch) {
    getToken().then(token => {
      axios
        .delete(`${api}/product/${data._id}`, {
          headers: {
            token,
          },
        })
        .then(response => {
          dispatch(deleteProductSuccess(response));
        });
    });
  };

// get token
const getToken = async () => {
  let token = await AsyncStorage.getItem('token');
  return token;
};

export {
  productLoading,
  loadMore,
  loadSort,
  loadSearch,
  loadRefresh,
  loadDeleted,
  setForm,
  getAllProduct,
  setFormAdd,
  addProduct,
  setFormEdit,
  editProduct,
  deleteProduct,
};
