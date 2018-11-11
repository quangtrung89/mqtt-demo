import messages from './message';

const defaultValues = {
  activities: [],
  sensors: [
    {
      deviceId: 'abc123',
      deviceName: 'Behind the stove',
      roomName: 'Kitchen',
      roomId: 'room1',
      batteryLevel: 65,
      alarmActive: false,
      online: true,
      silenced: false,
    }, {
      deviceId: 'abc124',
      deviceName: 'Underneath the bed',
      roomName: 'Bedroom',
      roomId: 'room2',
      batteryLevel: 32,
      alarmActive: false,
      online: true,
      silenced: false,
    }, {
      deviceId: 'abc125',
      deviceName: 'Behind the sofa',
      roomName: 'Livingroom',
      roomId: 'room3',
      batteryLevel: 98,
      alarmActive: false,
      online: true,
      silenced: false,
    },
  ],
};

let state = JSON.parse(JSON.stringify(defaultValues));

const options = {
  qos: 0,
  retain: true,
};

function changeStatus(client, boxTopic, message) {
  if (!!message.command &&
    message.command === 'SITUATION_UNDER_CONTROL') {
    state.sensors.forEach((device) => {
      if (!!device.alarmActive) {
        device.silenced = true;
        device.alarmActive = false;
      }
    });

    updateLog({
      activity: message.command,
      text: 'confrimed by ' + message.username,
      title: 'Situation under control',
      reportedBy: message.username,
    })

    sendStatus(client, boxTopic);
  }
}

function triggerAlarm(client, boxTopic, id) {
  state.sensors.forEach((device) => {
    if (device.deviceId.toLowerCase() === id.toLowerCase()) {
      updateLog({
        activity: 'ALARM_TRIGGERED',
        text: 'Detected in ' + device.roomName + ' - ' + device.deviceName,
        title: 'Smoke detected!',
      });
      device.alarmActive = true;
    }
  });

  sendStatus(client, boxTopic);
}

function triggerLowBattery(client, boxTopic, id) {
  state.sensors.forEach((device) => {
    if (device.deviceId.toLowerCase() === id.toLowerCase()) {
      device.batteryLevel = 10;

      const text = 'The smoke detector in '+ device.roomName + ' (' + device.deviceName + ') is running low on battery';
      updateLog({
        activity: 'LOW_BATTERY',
        text,
        title: 'Battery running low',
      })

      messages.addMessage(client, boxTopic, {
        id: 'message-'+Math.random(),
        text,
        deviceId: device.deviceId,
        feature: 'fire',
      });
    }
  });

  sendStatus(client, boxTopic);
}

function reset(client, boxTopic) {
  state = JSON.parse(JSON.stringify(defaultValues));
  sendStatus(client, boxTopic);
}

function smokeCleared(client, boxTopic) {
  state.sensors.forEach((device) => {
    device.alarmActive = false;
    device.silenced = false;
  });

  updateLog({
    activity: 'ALARM_CLEARED',
    text: 'The smoke cleared. Situation under control',
    title: 'Smoke cleared',
  });

  sendStatus(client, boxTopic);
}

function smokeControlled(client, boxTopic, message) {
  changeStatus(client, boxTopic, message);
}

function sendStatus(client, boxTopic) {
  const topic = boxTopic+'/fire/status';
  client.publish(topic, JSON.stringify(state), 0, false);
}

function updateLog(event) {
  event.date = new Date().toISOString();
  state.activities.unshift(event);
  state.activities = state.activities.splice(0, 5);
}


export default {
  sendStatus,
  triggerAlarm,
  triggerLowBattery,
  changeStatus,
  reset,
  smokeCleared,
  smokeControlled
};
