'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  Platform,
  ProgressBarAndroid,
  ActivityIndicatorIOS,
  PropTypes,
} from 'react-native';


export default class LoadingIndicator extends Component {

  static propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
  };

	constructor(props) {
		super(props);
    this.loadingComponent =
    <ProgressBarAndroid color={this.props.color} styleAttr={this.props.size}/>;
    if (Platform.OS === 'ios') {
      this.loadingComponent =
      <ActivityIndicatorIOS size={this.props.size} color={this.props.color}/>;
    }
  }

	render() {
		return(
      <View style={styles.content}>
        {this.loadingComponent}
      </View>
    );
	}

}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('LoadingIndicator', () => LoadingIndicator);
