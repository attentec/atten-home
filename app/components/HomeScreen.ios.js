'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
} from 'react-native';

import CustomTabBarIOS from './CustomTabBarIOS';
import RoomList from './RoomList';
import LoadingIndicator from './LoadingIndicator';
import StatsList from './StatsList';
import styling from '../../statics';

export default class HomeScreen extends Component {
  static propTypes = {
    updateAction: React.PropTypes.func.isRequired,
    goToRoom: React.PropTypes.func.isRequired,
    house: React.PropTypes.object,
  };

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<CustomTabBarIOS
        tabTitles={['Rooms', 'Statistics']}
        tabContent={[this._renderRooms(), this._renderStats()]}
        tabIcons={[require('../../Menu.png'), require('../../Bullish.png')]}
      />
    );
	}

  _renderRooms() {
    if(!this.props.house) {
      return (
        <View style={styles.tabContent}>
          <LoadingIndicator size='large' color={styling.a_red}/>
        </View>
      );
    }
    return (
      <View style={styles.tabContent}>
        <RoomList
          transition = {this.props.goToRoom}
          houseId={this.props.house._id}
        />
      </View>
    );
  }
  _renderStats() {
   return(
      <View style={styles.tabContent}>
        <StatsList item={this.props.house} updateAction={this.props.updateAction}/>
      </View>
    );
 }
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
});

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
