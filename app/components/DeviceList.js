
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Platform,
  TouchableNativeFeedback,
  Image,
} from 'react-native';

import {bindActionCreators} from 'redux';
import * as deviceActions from '../actions/deviceActions';
import * as roomActions from '../actions/roomActions';
import { connect } from 'react-redux';
import styling from '../../statics';
import DeviceQuickSettings from './DeviceQuickSettings';

export default class DeviceList extends Component {
  static propTypes = {
      devices: React.PropTypes.array.isRequired,
      roomId: React.PropTypes.string.isRequired,
      transition: React.PropTypes.func.isRequired,
      actions: React.PropTypes.object.isRequired,
    };

	constructor(props) {
		super(props);
    this.TouchableElement = TouchableHighlight;
    this.flex = 0.5;
    if (Platform.OS === 'android') {
      this.TouchableElement = TouchableNativeFeedback;
      this.flex = 0.3;
    }
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  render() {
    let items = this.props.devices.filter(t => t.roomId === this.props.roomId);
    let ds = this.dataSource.cloneWithRows(items);
    return (
      <ListView
       style={styles.listview}
       dataSource={ds}
       renderRow={this._renderRow}
       renderSeparator={(sectionID, rowID) => <View key={
          `${sectionID}-${rowID}`} style={styles.separator} />
        }
      />
     );
  }

  componentDidMount() {
    console.log("In device list: "+Date.now());
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("In device list, component will update: "+Date.now());
  }

  _renderRow = (device: Object) => {
    let component = (<DeviceQuickSettings
      device={device}
      changePower={this._changePower}
    />);
    return (
      <this.TouchableElement
        onPress={
          () => {
            this.props.transition(device);
          }
        }
        underlayColor={
          styling.ios_separator
        }
      >
        <View style={styles.row}>
          <Text style={styles.rowText}>
            {device.name}
          </Text>
          <View style={[styles.content, {'flex': this.flex}]}>
            {component}
          </View>
          {this._renderArrowImage()}
        </View>
     </this.TouchableElement>
    );
  };

  _renderArrowImage = () => {
    if (Platform.OS === 'ios') {
     return (
      <View style={styles.arrow} >
      <Image source={require('../../Forward.png')}/>
      </View>
      );
   }
   return null;
  };

  _changePower = (device, value) => {
    this.props.actions.changePower(device._id, value, this.props.actions.getRooms);
  };
}

const mapStateToProps = (state) => {
  return {devices: state.devices};
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: Object.assign(bindActionCreators(
      deviceActions, dispatch), bindActionCreators(roomActions, dispatch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps
  )(DeviceList);

const styles = StyleSheet.create({
     listview: {
      backgroundColor: styling.a_white,
      flex: 1
    },
    row: {
      padding: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowText: {
      color: styling.a_black,
      fontFamily: styling.a_bread_font,
      fontSize: 15,
      flex: 1,
    },
    content: {
      paddingRight: 10,
    },
    separator: {
      height: 1,
      backgroundColor: styling.ios_separator,
    },
    arrow: {
      paddingLeft: 10,
    }
  });

  AppRegistry.registerComponent('DeviceList', () => DeviceList);
