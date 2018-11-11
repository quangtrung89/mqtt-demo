import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import SensorList from "./components/SensorList";

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene
          key="sensorList"
          component={SensorList}
          title="Sensors"
          initial
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;