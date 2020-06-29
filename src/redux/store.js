import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  authReducers,
  categoryReducers,
  productReducers,
  signInReducers,
  signUpReducers,
} from './reducers';

const rootReducer = combineReducers({
  signUpReducers,
  signInReducers,
  authReducers,
  categoryReducers,
  productReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export {store};
