import {MQTT_CONNECTED, MESSAGE_RECEIVED} from './types';


export const processMessage = (data) => {
  return (dispatch) => {
    dispatch({ type: MESSAGE_RECEIVED, payload: data});
  };
}
export const mqttConnectionState = (err = null) => {
  return {
    type: MQTT_CONNECTED,
    payload: err
  }
}
