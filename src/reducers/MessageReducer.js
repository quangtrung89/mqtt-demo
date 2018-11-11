import {MQTT_CONNECTED, MESSAGE_RECEIVED} from "../actions/types";

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MQTT_CONNECTED:
      return {
        ...state,
      }
    case MESSAGE_RECEIVED:
      try{
        if(action.payload && action.payload.data){
          return JSON.parse(action.payload.data);
        }
      }catch(err){
        console.log(err);
      }
      return state;
    default:
      return state;
  }
};