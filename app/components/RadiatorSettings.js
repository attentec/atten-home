'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Picker,
  PropTypes,
} from 'react-native';

import styling from '../../statics';

export default class RadiatorSettings extends Component {

  static propTypes = {
    device: PropTypes.object.isRequired,
    updateTemp: PropTypes.func.isRequired,
  };

	constructor(props) {
		super(props);
  }

	render() {
    let powerConsumption = 0;
    if (this.props.device.powered) {
      powerConsumption = this.props.device.powerConsumption * this.props.device.temp;
    }
		return(
      <View>
        <View style={styles.row}>
          <Text style={styles.breadtext}>Power consumption</Text>
          <View>
            <Text style={styles.breadtext}>{powerConsumption} W</Text>
          </View>
        </View>
        <View style={[styles.row, styles.lastItem]}>
          <Text style={styles.breadtext}>
            Effect
          </Text>
          <View style={styles.picker}>
            <Picker
              itemStyle={styles.breadtext}
              selectedValue={this.props.device.temp}
              onValueChange={(value) => this._changeTemp(value)}
              mode={'dropdown'}
            >
              <Picker.Item label="1" value={1} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="5" value={5} />
              <Picker.Item label="6" value={6} />
              <Picker.Item label="7" value={7} />
              <Picker.Item label="8" value={8} />
              <Picker.Item label="9" value={9} />
            </Picker>
          </View>
        </View>
      </View>
    );
	}

  _changeTemp = (value) => {
    this.props.updateTemp(value);
  };

}

const styles = StyleSheet.create({
  row: {
    padding: 20,
    paddingRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    flex: 0.5,
  },
  breadtext: {
    flex: 1,
    fontFamily: styling.a_bread_font,
    fontSize: 15,
    color: styling.a_black,
  },
  lastItem: {
    paddingTop: 5,
  }
});

AppRegistry.registerComponent('RadiatorSettings', () => RadiatorSettings);
