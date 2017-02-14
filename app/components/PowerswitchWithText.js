'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Switch,
  PropTypes
} from 'react-native';

import styling from '../../statics';

export default class PowerswitchWithText extends Component {

  static propTypes = {
    changePower: PropTypes.func.isRequired,
    powered: PropTypes.bool.isRequired,
  };

	constructor(props) {
		super(props);
  }

	render() {
		return (
      <View style={styles.row}>
        <Text style={styles.breadtext}>Power</Text>
        <Switch
            onValueChange={(changeValue) => this.props.changePower(changeValue)}
            value={this.props.powered} 
            onTintColor={styling.a_red}
        />
      </View>
    );
	}

}

const styles = StyleSheet.create({
  row: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breadtext: {
    fontFamily: styling.a_bread_font,
    fontSize: 15,
    color: styling.a_black
  }
});

AppRegistry.registerComponent('PowerswitchWithText', () => PowerswitchWithText);
