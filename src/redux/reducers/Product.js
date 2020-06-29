const initialState = {
  formValid: null,
  isLoaded: true,
  isLoadMore: false,
  isLoadSort: false,
  isLoadSearch: false,
  isLoadRefresh: false,
  isLoadDeleted: false,
  form: {
    _id: '',
    name_product: '',
    desc_product: '',
    price_product: '',
    id_category: '',
    category_product: '',
    image: {uri: null},
    stock: '0',
  },
  search: '',
  msg: '',
  product: [],
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING_PRODUCT':
      return {...state, formValid: null};
    case 'LOAD_MORE_PRODUCT':
      return {...state, isLoadMore: true};
    case 'LOAD_SORT_PRODUCT':
      return {...state, isLoadSort: true};
    case 'LOAD_SEARCH_PRODUCT':
      return {...state, isLoadSearch: true};
    case 'LOAD_REFRESH_PRODUCT':
      return {...state, isLoadRefresh: true};
    case 'LOAD_DELETED_PRODUCT':
      return {...state, isLoadDeleted: true};
    case 'SET_FORM_PRODUCT':
      return {
        ...state,
        form: {...state.form, [action.inputType]: action.inputValue},
        msg: '',
      };
    // get
    case 'GET_ALL_PRODUCT':
      return {
        ...state,
        product: action.payload.data.result,
        isLoaded: false,
        isLoadMore: false,
        isLoadSort: false,
        isLoadSearch: false,
        isLoadRefresh: false,
      };
    // add
    case 'SET_FORM_ADD':
      return {
        ...state,
        formValid: null,
        form: {
          _id: '',
          name_product: 'set nme',
          desc_product: 'set eds',
          price_product: '123',
          id_category: '',
          category_product: '',
          image: {uri: null},
          stock: '0',
        },
      };
    case 'ADD_PRODUCT_SUCCESS':
      state.product.unshift(action.payload.data.result);
      return {
        ...state,
        formValid: true,
        form: {
          _id: '',
          name_product: '',
          desc_product: '',
          price_product: '',
          id_category: '',
          category_product: '',
          image: {uri: null},
          stock: '0',
        },
        product: state.product,
      };
    case 'ADD_PRODUCT_FAILED':
      return {
        ...state,
        formValid: false,
        msg: 'Err',
      };
    // edit
    case 'SET_FORM_EDIT':
      return {...state, form: action.payload};
    case 'EDIT_PRODUCT_SUCCESS':
      const dataAfterEdit = state.product.map(data => {
        if (data._id == action.payload.data.result._id)
          return action.payload.data.result;
        return data;
      });
      return {
        ...state,
        formValid: true,
        form: {
          _id: '',
          name_product: '',
          desc_product: '',
          price_product: '',
          id_category: '',
          category_product: '',
          image: {uri: null},
          stock: '0',
        },
        product: dataAfterEdit,
      };
    // delete
    case 'EDIT_PRODUCT_FAILED':
      return {...state, formValid: false, msg: 'Err'};
    case 'DELETE_PRODUCT_SUCCESS':
    // console.log(action.payload.data);
      const dataAfterDelete = state.product.filter(
        data => data._id != action.payload.data.result._id,
      );
      return {...state, product: dataAfterDelete, isLoadDeleted: false};
    default:
      return state;
  }
};

export default productReducers;
