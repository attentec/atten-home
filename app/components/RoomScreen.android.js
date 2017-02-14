'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  PropTypes
} from 'react-native';

import ViewPagerWithToolbarTabsAndroid from './ViewPagerWithToolbarTabsAndroid';
import DeviceList from './DeviceList';
import StatsList from './StatsList';
import styling from '../../statics';

export default class HomeScreen extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    goToDevice: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    updateAction: PropTypes.func.isRequired,
  };

  constructor(props) {
		super(props);
	}

  render() {
    return (
      <ViewPagerWithToolbarTabsAndroid
        title={this.props.title}
        tabTitles={['DEVICES', 'STATISTICS']}
      >
        <View>
          <DeviceList transition = {this.props.goToDevice} roomId={this.props.room._id}/>
        </View>
        <View>
          <StatsList item={this.props.room} updateAction={this.props.updateAction}/>
        </View>
      </ViewPagerWithToolbarTabsAndroid>
    );
  }

}

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
