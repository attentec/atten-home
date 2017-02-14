'use strict';
import React, {
  AppRegistry,
  Component,
  View,
  Switch,
  Text,
} from 'react-native';

import styling from '../../statics';

export default class DeviceQuickSettings extends Component {
  static propTypes = {
      device: React.PropTypes.object.isRequired,
      changePower: React.PropTypes.func.isRequired,
  };

	constructor(props) {
		super(props);
  }

	render() {
    let temperature = "";
    if(this.props.device.__t === "Radiator"){
      temperature = this.props.device.temperature[0].toFixed(0) + String.fromCharCode(176) +"C";

    }
		return(
      <View style={styles.row}>
        <Text>{temperature}</Text>
        <Switch
            onValueChange={(changeValue) => this.props.changePower(this.props.device, changeValue)}
            value={this.props.device.powered}
            onTintColor={styling.a_red}
        />
      </View>
    );
	}
}

const styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

AppRegistry.registerComponent('DeviceQuickSettings', () => DeviceQuickSettings);
