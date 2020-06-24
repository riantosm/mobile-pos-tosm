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
} from '../actions/types';

const initialState = {
  formValid: null,
  form: {_id: '', name_category: ''},
  msg: '',
  category: [],
};

const categoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_CATEGORY:
      return {
        ...state,
        form: {...state.form, [action.inputType]: action.inputValue},
        msg: '',
      };
    case GET_ALL_CATEGORY: {
      return {
        ...state,
        category: action.payload.data.result,
      };
    }
    case SET_FORM_ADD: {
      return {
        ...state,
        formValid: null,
        form: {_id: '', name_category: ''},
      };
    }
    case ADD_CATEGORY_SUCCESS: {
      state.category.push(action.payload.data.result);
      return {
        ...state,
        formValid: true,
        form: {_id: '', name_category: ''},
        category: state.category,
      };
    }
    case ADD_CATEGORY_FAILED: {
      return {
        ...state,
        formValid: false,
        msg: 'Data invalid',
      };
    }
    case SET_FORM_EDIT: {
      return {
        ...state,
        form: action.payload,
      };
    }
    case EDIT_CATEGORY_SUCCESS: {
      const dataAfterEdit = state.category.map(data => {
        if (data._id == action.payload.data.result._id) {
          return action.payload.data.result;
        }
        return data;
      });
      return {
        ...state,
        formValid: true,
        form: {_id: '', name_category: ''},
        category: dataAfterEdit,
      };
    }
    case EDIT_CATEGORY_FAILED: {
      return {
        ...state,
        formValid: false,
        msg: 'Data invalid',
      };
    }
    case DELETE_CATEGORY_SUCCESS: {
      const dataAfterDelete = state.category.filter(
        data => data._id != action.payload.data.result._id,
      );
      return {
        ...state,
        category: dataAfterDelete,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        formValid: null,
      };
    }
    default:
      return state;
  }
};

export default categoryReducers;
