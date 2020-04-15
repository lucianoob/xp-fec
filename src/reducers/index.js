import { changeReducer } from './changeReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  changeState: changeReducer
});
