'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  PropTypes,
} from 'react-native';

import DeviceList from './DeviceList';
import CustomTabBarIOS from './CustomTabBarIOS';
import StatsList from './StatsList';

export default class RoomScreen extends Component {

  static propTypes = {
    goToDevice: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    updateAction: PropTypes.func.isRequired,
  };

	constructor(props) {
		super(props);
	}

	render() {
		return (
      <CustomTabBarIOS
				tabTitles={['Devices', 'Statistics']}
				tabContent={[this._renderDevices(), this._renderStats()]}
				tabIcons={[require('../../Menu.png'), require('../../Bullish.png')]}/>

		);
	}

  _renderDevices() {
    return (
      <View style={styles.tabContent}>
        <DeviceList transition = {this.props.goToDevice} roomId={this.props.room._id}/>
			</View>
		);
  }
	_renderStats() {
    return (
      <View style={styles.tabContent}>
        <StatsList item={this.props.room} updateAction={this.props.updateAction}/>
      </View>
    );
	}
}

const styles = StyleSheet.create({
  tabContent: {
      flex: 1,
    },
});

AppRegistry.registerComponent('RoomScreen', () => RoomScreen);
