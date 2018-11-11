import { processMessage, mqttConnectionState } from '../actions/MessageActions'
import { MQTT_CONNECTED } from "../actions/types";
import settings  from '../utils/settings';
import fire from "./fire";

let mqttClient = null;

let mqtt = require('react-native-mqtt');

const setupMQTT = (dispatch) => {
  return mqtt.createClient(settings.mqqtOptions)
    .then(function(client) {
      mqttClient = client;

      client.on('closed', function() {
        console.log('mqtt.event.closed');
      });

      client.on('error', function(msg) {
        console.log('mqtt.event.error', msg);
      });

      client.on('message', function(msg) {
        console.log('mqtt.event.message', msg);
        if(msg.data)
          dispatch(processMessage(msg));
      });

      client.on('connect', function() {
        console.log('connected');
        dispatch(mqttConnectionState(MQTT_CONNECTED));
        client.subscribe('user/device/00000000-0000-0000-0000-000000000007/fire/status', 0);

        fire.sendStatus(client, settings.boxTopic);
      });

      client.connect();
    })
    .catch(function(err){
      console.log(err);
    });
}

export const getMqttClient = () =>  mqttClient;

export default setupMQTT
