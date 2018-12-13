# React Native App with MQTT demo (IoT example)

### Introduction
The Application is implemented by React Native for cross platform mobile. The Application is written by ReactJS 16.6, Redux 4.x, Redux Thunk 2.3.0, react-native-mqtt 0.1.0-beta4, and react-native-animatable 1.3.0

### Technologies
* ReactJS 16.6 
* Redux 4.x 
* Redux Thunk 2.3.0 
* react-native-mqtt 0.1.0-beta4
* react-native-animatable 1.3.0

### Setup MQTT connection 
Change value inside `utils/setting.js`


### Installation

In project directory, we can run: 
`npm install`

### Runs the app in the development mode for Android
`react-native run-android`

### Runs the app in the development mode for iOS
`react-native run-ios`

## Folder structure
---

```
app/
├───ios: native ios folder
├───android: native android folder
├───src
│   ├───actions // contains Actions, Actions types for Redux processing
│   │   
│   ├───components   // defines common components and main app UI component
│   │   
│   ├───mqtt   // defines main logic of MQTT client functions
│   │   
│   ├───reducers   // defines Reducers for Redux processing
│   ├───utils // contains settings of the app
│   │   App.js
│   │   Router.js
 
```

## Screenshots

![Imgur](https://i.imgur.com/Yu0jO8Y.png "Sensors List")

![Imgur](https://i.imgur.com/jAnyIzz.png "Alarm triggered")