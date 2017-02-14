
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
  InteractionManager,
  Animated,
  PropTypes
} from 'react-native';

import Dimensions from 'Dimensions';
import Linegraph from './Linegraph';
import styling from '../../statics';

let TouchableElement;

export default class StatsList extends Component {

  static propTypes = {
    updateAction: PropTypes.func.isRequired,
    item: PropTypes.object,
  };

	constructor(props) {
		super(props);
		TouchableElement = TouchableHighlight;
		if (Platform.OS === 'android') {
			TouchableElement = TouchableNativeFeedback;
		}
		this.dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
		});
		this.shouldDouble = false;
	}

  componentWillMount() {
    this.state = {collapsed: [true, true],
      animatedValues: [{height: new Animated.Value(0)},
        {height: new Animated.Value(0)}]};
  }

  componentDidMount() {
    console.log("In StatsList: "+Date.now());
    this._updateAfterInteractions();
    this.timer = setInterval(this._updateAfterInteractions, 2000);
  }

  _updateAfterInteractions= () => {
    InteractionManager.runAfterInteractions(() => {
      this.props.updateAction();
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.item.__v !== nextProps.item.__v) {
      this.shouldDouble = true;
      let newArray = this.state.collapsed.slice();
      for (let i = 0; i < newArray.length; i++) {
        newArray[i] = !newArray[i];
      }
      this.setState({collapsed: newArray});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.item.__v !== nextProps.item.__v) {
      return true;
    }
    if (this.state.collapsed !== nextState.collapsed) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.shouldDouble) {
      this.shouldDouble = false;
      let newArray = this.state.collapsed.slice();
      for (let i = 0; i < newArray.length; i++) {
        newArray[i] = !newArray[i];
      }
      this.setState({collapsed: newArray});
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  _getDataSource = () => {
    let items = [];
    if (this.props.item.powerData) {
      items.push({
        name: 'Power consumption',
        value: this.props.item.powerData
      });
    }
    if (this.props.item.temperature) {
      items.push({
        name: 'Temperature',
        value: this.props.item.temperature
      });
    }

    return this.dataSource.cloneWithRows(items);
  };

  render() {
    return (
      <ListView
      style={styles.listview}
      dataSource={this._getDataSource()}
      renderRow={this._renderRow}
      renderSeparator={(sectionID, rowID) =>
        <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
      />
      );
    }

	_renderRow = (rowData: string, sectionID: number, rowID: number) => {
      return (
        <View>
          <TouchableElement onPress={ () => this._onPress(rowID)} underlayColor={styling.ios_separator}>
            <View style={styles.row}>
              <Text style={styles.rowText}>
              {rowData.name + ': '}
              {rowData.value[rowData.value.length - 1].toFixed(1) + ' ' + this._getUnit(rowData.name)}
              </Text>
              {this._renderArrowImage(rowData, rowID)}
            </View>
          </TouchableElement>
          <Animated.View style={[styles.container, {
            height: this.state.animatedValues[rowID].height,
            overflow: 'hidden',
          }]}>
            {this._renderGraph(rowData, rowID)}
          </Animated.View>
        </View>
      );
    };

    _onPress(rowID: number) {
      const {height} = Dimensions.get('window');
      let newArray = this.state.collapsed.slice();
      newArray[rowID] = !newArray[rowID];
      let toHeight = height / 2;
      let toScale = 1;
      if (newArray[rowID]) {
        toHeight = 0;
        toScale = 0;
      }
      Animated.timing(
        this.state.animatedValues[rowID].height,
        {
          toValue: toHeight,
          duration: 250
        }
      ).start();
      this.setState({
        collapsed: newArray
      });
    }

    _renderArrowImage(rowData: string, rowID) {
      if (!this.state.collapsed[rowID]) {
        return (
          <View>
            <Image style={styles.arrow} source={require('../../Up.png')}/>
          </View>
        );
      }
      return (
        <View>
          <Image style={styles.arrow} source={require('../../Down.png')}/>
        </View>
      );
    }

	_renderGraph = (rowData, rowID) => {
		const {height, width} = Dimensions.get('window');
		if (!this.state.collapsed[rowID]) {
			let visibleValues = rowData.value.slice(-20, -1);
			return (
  				<Linegraph
    				label={rowData.name}
    				width={width - (width / 10)}
    				height={height / 2 - 20}
    				data={visibleValues}
  				/>
				);
		}
    return null;
	};

  _getUnit = (name: string) => {
    const degree = String.fromCharCode(176);
    switch (name) {
      case 'Temperature':
        return degree + ' C';
      case 'Power consumption':
        return 'W';
      default:
        return 'Warning: Unit not found';
    }
  };
}

const styles = StyleSheet.create({
	listview: {
		backgroundColor: styling.a_white,
		flex: 1
	},
	row: {
		padding: 22,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rowText: {
		color: styling.a_black,
		fontFamily: styling.a_bread_font,
		fontSize: 15,
	},
	separator: {
		height: 1,
		backgroundColor: styling.ios_separator,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},

});

AppRegistry.registerComponent('StatsList', () => StatsList);
