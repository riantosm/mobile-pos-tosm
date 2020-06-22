import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducers from './reducers/Auth';
import signInReducers from './reducers/SignIn';
import signUpReducers from './reducers/SignUp';

const rootReducer = combineReducers({
  signUpReducers,
  signInReducers,
  authReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export {store};
