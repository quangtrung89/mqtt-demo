import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import ListItem from './SensorListItem';

class SensorList extends Component {

  keyExtractor = (item, index) => item.deviceId;

  renderRow = ({item}) => <ListItem sensor={item} />

  render() {
    return (
      <FlatList
        data={this.props.sensors}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    sensors: state.message.sensors
  }
}

export default connect(mapStateToProps, null)
(SensorList);