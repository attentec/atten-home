'use strict';
import React, {
  AppRegistry,
  Component,
  View,
} from 'react-native';

import ViewPagerWithToolbarTabsAndroid from './ViewPagerWithToolbarTabsAndroid';
import StatsList from './StatsList';
import DeviceSettings from './DeviceSettings';

export default class DeviceScreen extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    device: React.PropTypes.object.isRequired,
    updateAction: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ViewPagerWithToolbarTabsAndroid
        title={this.props.title}
        tabTitles={['SETTINGS', 'STATISTICS']}
      >
        <View>
          <DeviceSettings deviceId={this.props.device._id} />
        </View>
        <View>
          <StatsList item={this.props.device} updateAction={this.props.updateAction}/>
        </View>
      </ViewPagerWithToolbarTabsAndroid>
      );
  }
}

AppRegistry.registerComponent('DeviceScreen', () => DeviceScreen);
