import { combineReducers } from 'redux';
import session from './session';
import booking from './booking';
import packageOrPromo from './packagePromo';
import profile from './profile';
import ewarong from './ewarong';

const rootReducer = combineReducers({
  session,
  booking,
  profile,
  packageOrPromo,
  ewarong,
});

export default rootReducer;
