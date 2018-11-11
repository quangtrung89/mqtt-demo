import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Card, CardSection, Button} from './common';
import { getMqttClient } from '../mqtt';
import fire from '../mqtt/fire';
import settings  from '../utils/settings';

class SensorListItem extends Component {

  onButtonPress = () => {
    // Can do both way smokeControll or smokeClear
    let message = {command: 'SITUATION_UNDER_CONTROL', username: 'TRUNG'};
    fire.smokeControlled(getMqttClient(), settings.boxTopic, message);
    //fire.smokeCleared(getMqttClient(), settings.boxTopic);
  }

  render() {
    const {deviceName, deviceId, alarmActive, batteryLevel} = this.props.sensor;
    return (
      // onPress={this.onRowPress.bind(this)}
      <TouchableWithoutFeedback>
        <Card>
          <CardSection>
            <Text style={styles.titleStyle}>Device: {deviceId}</Text>
          </CardSection>
          <CardSection>
            <Text style={styles.titleStyle}>Device: {deviceName}</Text>
          </CardSection>
          {alarmActive &&
          <CardSection>
            <Animatable.Text style={styles.titleStyle} animation="fadeIn" iterationCount={"infinite"} direction="alternate">
              ALARM ALARM
            </Animatable.Text>
          </CardSection>}
          <CardSection>
            <Text style={styles.titleStyle}>Battery: {batteryLevel}</Text>
          </CardSection>
          {alarmActive &&
            <CardSection>
              <Button onPress={this.onButtonPress.bind(this)}>
                STOP
              </Button>
            </CardSection>
          }
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default SensorListItem;
