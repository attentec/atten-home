'use strict';
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	View,
} from 'react-native';

import CustomTabBarIOS from './CustomTabBarIOS';
import StatsList from './StatsList';
import DeviceSettings from './DeviceSettings';

export default class DeviceScreen extends Component {
	static propTypes = {
		device: React.PropTypes.object.isRequired,
		updateAction: React.PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<CustomTabBarIOS
				tabTitles={['Settings', 'Statistics']}
				tabContent={[this._renderSettings(), this._renderStats()]}
				tabIcons={[require('../../Menu.png'), require('../../Bullish.png')]}
			/>
			);
	}

	_renderSettings() {
		return <DeviceSettings deviceId={this.props.device._id} />;
	}

	_renderStats() {
		return(
			<View style={styles.tabContent}>
				<StatsList item={this.props.device} updateAction={this.props.updateAction}/>
			</View>
			);
	}
}

const styles = StyleSheet.create({
	tabContent: {
		flex: 1,
	},
});

AppRegistry.registerComponent('DeviceScreen', () => DeviceScreen);
