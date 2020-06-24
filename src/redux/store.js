import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  authReducers,
  categoryReducers,
  signInReducers,
  signUpReducers,
} from './reducers';

const rootReducer = combineReducers({
  signUpReducers,
  signInReducers,
  authReducers,
  categoryReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export {store};
