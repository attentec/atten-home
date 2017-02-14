'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Navigator,
  Text,
  View,
  BackAndroid,
  TouchableOpacity,
  Platform,
  Image,
  PropTypes
} from 'react-native';

import {bindActionCreators} from 'redux';
import * as deviceActions from '../actions/deviceActions';
import * as houseActions from '../actions/houseActions';
import * as roomActions from '../actions/roomActions';
import { connect } from 'react-redux';
import HomeScreen from './HomeScreen';
import RoomScreen from './RoomScreen';
import DeviceScreen from './DeviceScreen';
import styling from '../../statics';

let _navigator;

function backButton(nav) {
  console.log("Back pressed: "+Date.now())
  nav.pop();
}

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    backButton(_navigator);
    return true;
  }
  return false;
});

const iOSNavbar = {
  LeftButton: function (route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }
    const previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => backButton(navigator)}
        style={styles.navBarBack}
      >
          <Image source={require('../../Back.png')}/>

      </TouchableOpacity>
    );
  },

  RightButton: function () {
    return (
      <View style={styles.navBarIcon}>
        <Image source={require('../../Attentec.png')}/>
      </View>
    );
  },

  Title: function (route) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};

export default class RootNavigator extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    houses: PropTypes.array.isRequired,
    rooms: PropTypes.array.isRequired,
    devices: PropTypes.array.isRequired,
  };

  constructor(props) {
		super(props);
	}

  componentDidMount() {
    this.props.actions.getHouses();
    this.props.actions.getRooms();
    this.props.actions.getDevices();
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props) === JSON.stringify(nextProps)) {
      return false;
    }
    return true;
  }

  renderNavigationBar() {
    let navigationBar = <View/>;
    if (Platform.OS === 'ios') {
      navigationBar = (<Navigator.NavigationBar
        routeMapper={iOSNavbar}
        style={styles.navBar}
      />);
    }
    return navigationBar;
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'HomeScreen', index: 0, title: 'TestHouse'}}
        renderScene={(route, navigator) =>
          this._renderContent(route, navigator)
        }
        navigationBar={
          this.renderNavigationBar()
        }
      />
    );
  }

  _renderContent = (route, nav) => {
    _navigator = nav;
    let component;
    let attenImage = (<Image source={require('../../Attentec.png')}/>);
    switch (route.name) {
      case 'HomeScreen':
        const house = this.props.houses.filter(h => h._id === '56e7e5e8c798cfaf310641b7')[0];
        component = (<HomeScreen
          navigator={nav}
          title={route.title}
          house={house}
          updateAction={this.props.actions.getHouses}
          goToRoom={(room) => this._goToRoom(room, route, nav)}
        />);
        break;
      case 'RoomScreen':
        const room = this.props.rooms.filter(r => r._id === route.room._id)[0];
        component = (<RoomScreen
          navigator={nav}
          room={room}
          title={route.title}
          updateAction={this.props.actions.getRooms}
          goToDevice={(device) => this._goToDevice(device, route, nav)}
        />);
        break;
      case 'DeviceScreen':
        const device = this.props.devices.filter(d => d._id === route.device._id)[0];
        component = (<DeviceScreen
          navigator={nav}
          device={device}
          title={route.title}
          updateAction={this.props.actions.getDevices}
        />);
        break;
      default:
        component = <View/>;
        break;
    }

    if (Platform.OS === 'ios') {
      return <View style={styles.scene}>{component}</View>;
    }
    return component;
  };

  _goToRoom = (room, route, nav) => {
    console.log("Go to room: "+Date.now());
    const newIndex = route.index + 1;
    nav.push({
      name: 'RoomScreen',
      title: room.name,
      index: newIndex,
      room: room,
    });
  };

  _goToDevice = (device, route, nav) => {
    console.log("Go to device: "+Date.now());
    const newIndex = route.index + 1;
    nav.push({
      name: 'DeviceScreen',
      title: device.name,
      index: newIndex,
      device: device,
    });
  };
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: styling.a_white,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: styling.ios_separator,
  },
  navBarText: {
    fontSize: 15,
  },
  navBarTitleText: {
    fontFamily: styling.a_header_font,
    fontStyle: 'italic',
    fontSize: 24,
    color: styling.a_red,
    fontWeight: '500',
    paddingTop: 4
  },
  navBarIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
    paddingHorizontal: 18,
  },
  navBarButtonText: {
    color: styling.a_red,
    fontFamily: styling.a_bread_font,
  },
  scene: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: styling.a_white
  },
  navBarBack: {
    paddingHorizontal: 5,
    paddingTop: 6
  },
});

const mapStateToProps = (state) =>{
  return {houses: state.houses, rooms: state.rooms, devices: state.devices};
};

const mapDispatchToProps = (dispatch) =>{
  return {
    actions: Object.assign(bindActionCreators(deviceActions, dispatch),
      bindActionCreators(houseActions, dispatch),
      bindActionCreators(roomActions, dispatch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps
)(RootNavigator);

AppRegistry.registerComponent('RootNavigator', () => RootNavigator);
