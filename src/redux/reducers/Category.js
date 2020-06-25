const initialState = {
  formValid: null,
  isLoaded: true,
  isLoadMore: false,
  isLoadSort: false,
  isLoadSearch: false,
  isLoadRefresh: false,
  isLoadDeleted: false,
  form: {_id: '', name_category: ''},
  search: '',
  msg: '',
  category: [],
};

const categoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {...state, formValid: null};
    case 'LOAD_MORE':
      return {...state, isLoadMore: true};
    case 'LOAD_SORT':
      return {...state, isLoadSort: true};
    case 'LOAD_SEARCH':
      return {...state, isLoadSearch: true};
    case 'LOAD_REFRESH':
      return {...state, isLoadRefresh: true};
    case 'LOAD_DELETED':
      return {...state, isLoadDeleted: true};
    case 'SET_FORM_CATEGORY':
      return {
        ...state,
        form: {...state.form, [action.inputType]: action.inputValue},
        msg: '',
      };
    // get
    case 'GET_ALL_CATEGORY':
      return {
        ...state,
        category: action.payload.data.result,
        isLoaded: false,
        isLoadMore: false,
        isLoadSort: false,
        isLoadSearch: false,
        isLoadRefresh: false,
      };
    // add
    case 'SET_FORM_ADD':
      return {...state, formValid: null, form: {_id: '', name_category: ''}};
    case 'ADD_CATEGORY_SUCCESS':
      state.category.unshift(action.payload.data.result);
      return {
        ...state,
        formValid: true,
        form: {_id: '', name_category: ''},
        category: state.category,
      };
    case 'ADD_CATEGORY_FAILED':
      return {
        ...state,
        formValid: false,
        msg: 'Data invalid',
      };
    // edit
    case 'SET_FORM_EDIT':
      return {...state, form: action.payload};
    case 'EDIT_CATEGORY_SUCCESS':
      const dataAfterEdit = state.category.map(data => {
        if (data._id == action.payload.data.result._id)
          return action.payload.data.result;
        return data;
      });
      return {
        ...state,
        formValid: true,
        form: {_id: '', name_category: ''},
        category: dataAfterEdit,
      };
    case 'EDIT_CATEGORY_FAILED':
      return {...state, formValid: false, msg: 'Data invalid'};
    // delete
    case 'DELETE_CATEGORY_SUCCESS':
      const dataAfterDelete = state.category.filter(
        data => data._id != action.payload.data.result._id,
      );
      return {...state, category: dataAfterDelete, isLoadDeleted: false};
    default:
      return state;
  }
};

export default categoryReducers;
