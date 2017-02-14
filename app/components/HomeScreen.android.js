'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
} from 'react-native';

import ViewPagerWithToolbarTabsAndroid from './ViewPagerWithToolbarTabsAndroid';
import RoomList from './RoomList';
import LoadingIndicator from './LoadingIndicator';
import StatsList from './StatsList';

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
    if(!this.props.house) {
      return (
        <View style={styles.wrapper}>
          <LoadingIndicator color={styling.a_red} size='Large'/>
        </View>
      );
    }
    return (
      <ViewPagerWithToolbarTabsAndroid title='TestHouse' tabTitles={['ROOMS', 'STATISTICS']}>
        <View style={styles.wrapper}>
          <RoomList
            transition = {this.props.goToRoom}
            houseId={this.props.house._id}
          />
        </View>
        <View style={styles.wrapper}>
          <StatsList item={this.props.house} updateAction={this.props.updateAction}/>
        </View>
      </ViewPagerWithToolbarTabsAndroid>
      );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
