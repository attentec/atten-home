'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Platform,
  SliderIOS,
  PropTypes,
} from 'react-native';

import Slider from './Slider';
import styling from '../../statics';

export default class LampSettings extends Component {

  static propTypes = {
    device: PropTypes.object.isRequired,
    updateDimmer: PropTypes.func.isRequired,

  };

	constructor(props) {
		super(props);
    this.state = {dimmer: this.props.device.dimmer};
  }

	render() {
    let slider = (<SliderIOS
                  minimumValue={0}
                  maximumValue={100}
                  value={this.state.dimmer}
                  onValueChange={this._changeDimmer}
                  onSlidingComplete={this.props.updateDimmer}
                  minimumTrackTintColor={styling.a_red}
                  step={1}
                />);
    if(Platform.OS === 'android') {
      slider = (<Slider
                minimumValue={0}
                maximumValue={100}
                value={this.state.dimmer}
                onValueChange={this._changeDimmer}
                onSlidingComplete={this.props.updateDimmer}
                thumbTintColor={styling.a_red}
                minimumTrackTintColor={styling.a_red}
              />);
    }
    let powerConsumption;
    if(this.props.device.powered) {
      powerConsumption =
      (this.props.device.powerConsumption * this.state.dimmer / 100).toFixed(0);
    }else {
      powerConsumption = 0;
    }
		return (
      <View>
        <View style={styles.row}>
          <Text style={styles.breadtext}>Power consumption</Text>
          <Text style={styles.breadtext}>{powerConsumption} W</Text>
        </View>
        <View style={styles.slider}>
          {slider}
        </View>
        <View style={styles.center}>
          <Text style={[styles.breadtext]}>{this.state.dimmer.toFixed(0)}  %</Text>
        </View>
      </View>
    );
	}

  _changeDimmer = (value) => {
    this.setState({dimmer: value});
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
  center: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slider: {
    paddingHorizontal: 30,
  },
  breadtext: {
    fontFamily: styling.a_bread_font,
    fontSize: 15,
    color: styling.a_black
  }
});

AppRegistry.registerComponent('LampSettings', () => LampSettings);
