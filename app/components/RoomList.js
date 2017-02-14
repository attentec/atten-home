
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
  PropTypes,
} from 'react-native';

import {bindActionCreators} from 'redux';
import * as houseActions from '../actions/houseActions';
import * as roomActions from '../actions/roomActions';

import { connect } from 'react-redux';

import styling from '../../statics';

export default class RoomList extends Component {

  static propTypes = {
    rooms: PropTypes.array.isRequired,
    houseId: PropTypes.string.isRequired,
    transition: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      this.TouchableElement = TouchableNativeFeedback;
    }
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(nextProps.rooms) === JSON.stringify(this.props.rooms)) {
      return false;
    }
    return true;
  }

	render() {
    let items = this.props.rooms.filter(t => t.houseId === this.props.houseId);
    let ds = this.dataSource.cloneWithRows(items);
    return (
      <ListView
        style={styles.listview}
        dataSource={ds}
        renderRow={this._renderRow}
        renderSeparator={(sectionID, rowID) =>
          <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
      />
    );
	}

  _renderRow = (room) => {
    return (
      <this.TouchableElement
        onPress={() => this.props.transition(room)}
        underlayColor={styling.ios_separator}
      >
        <View style={styles.row}>
          <Text style={styles.rowText}>
            {room.name}
          </Text>
          <View style={styles.content}>
            <Text>{room.powerData[room.powerData.length - 1].toFixed(0)} W</Text>
            <Text>{room.temperature[room.temperature.length - 1].toFixed(0)}
            {String.fromCharCode(176)}C</Text>
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
}

const mapStateToProps = (state) =>{
  return {rooms: state.rooms};
};

const mapDispatchToProps = (dispatch) =>{
  return {
    actions: Object.assign(bindActionCreators(houseActions, dispatch),
      bindActionCreators(roomActions, dispatch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);

const styles = StyleSheet.create({
  listview: {
    backgroundColor: styling.a_white,
    flex: 1
  },
  row: {
    padding: 14,
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
    flex: 0.25,
    alignItems: 'center',

  },
  separator: {
    height: 1,
    backgroundColor: styling.ios_separator,
  },
});

AppRegistry.registerComponent('RoomList', () => RoomList);
