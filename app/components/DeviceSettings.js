'use strict';
import React, {
  AppRegistry,
  Component,
  View,
} from 'react-native';

import LampSettings from './LampSettings';
import RadiatorSettings from './RadiatorSettings';
import {bindActionCreators} from 'redux';
import * as deviceActions from '../actions/deviceActions';
import * as roomActions from '../actions/roomActions';
import { connect } from 'react-redux';
import PowerswitchWithText from './PowerswitchWithText';

export default class DeviceSettings extends Component {
  static propTypes = {
    deviceId: React.PropTypes.string.isRequired,
    devices: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired,
  };

	constructor(props) {
		super(props);
  }

  componentDidMount() {
    console.log("In device settings: "+Date.now());
  }

  render() {
    const device = this.props.devices.filter(d => d._id === this.props.deviceId)[0];
    let deviceComponent;
    switch (device.__t) {
      case 'Lamp':
        deviceComponent =
          (<LampSettings
            device={device}
            updateDimmer={this._changeDimmer}
          />);
        break;
      case 'Radiator':
        deviceComponent =
          (<RadiatorSettings
            device={device}
            updateTemp={this._changeTemp}
          />);
        break;
      default:
        break;
    }
    return(
      <View>
        <PowerswitchWithText powered={device.powered} changePower={this._changePower}/>
        <View>
          {deviceComponent}
        </View>
      </View>
    );
  }

  _changePower = (value) => {
    this.props.actions.changePower(this.props.deviceId, value, this.props.actions.getRooms);
  };

  _changeDimmer = (value) => {
    this.props.actions.changeDimmer(this.props.deviceId, value, this.props.actions.getRooms);
  };

  _changeTemp = (value) => {
    this.props.actions.changeTemp(this.props.deviceId, value, this.props.actions.getRooms);
  };
}

const mapStateToProps = (state) => {
  return {devices: state.devices};
};

const mapDispatchToProps = (dispatch) => {
  return{
    actions: Object.assign(bindActionCreators(
      deviceActions, dispatch), bindActionCreators(roomActions, dispatch)
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps
  )(DeviceSettings);

  AppRegistry.registerComponent('DeviceSettings', () => DeviceSettings);
