import { combineReducers } from 'redux';
import MessageReducer from "./MessageReducer";

export default combineReducers({
  message: MessageReducer
});
