import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import userReducer from './user';
import apikeyModalReducer from './apikeymodal';
import keysReducer from './keys';
import urlsReducer from './urls';
import reposReducer from './repos';

const rootReducer = combineReducers({
  auth: userReducer,
  form: FormReducer,
  apikeymodal: apikeyModalReducer,
  keys: keysReducer,
  urls: urlsReducer,
  repos: reposReducer
});

export default rootReducer;
