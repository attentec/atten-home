'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  PropTypes,
} from 'react-native';

import styling from '../../statics';

export default class TabAndroid extends Component {

  static propTypes = {
    selectPage: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    selectedTab: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
		super(props);
	}

  render() {
    return (
        <TouchableNativeFeedback onPress={() => this.props.selectPage(this.props.index)}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={[styles.pageHeaderContainer, this.props.selectedTab && styles.activeBorder]}>
            <Text style={[styles.pageHeader, this.props.selectedTab && styles.active]}>
              {this.props.title}
            </Text>
          </View>
        </TouchableNativeFeedback>
    );
  }
  
}


const styles = StyleSheet.create({
    pageHeader: {
      textAlign: 'center',
      flex: 1,
      color: styling.a_grey,
      fontWeight: '500',
    },
    pageHeaderContainer: {
      flex: 1,
      paddingTop: 12,
      elevation: 10,
      backgroundColor: styling.a_white
    },
    pageHeaders: {
      flexDirection: 'row',
    },
    active: {
      color: styling.a_red,
    },
    activeBorder: {
      borderColor: styling.a_red,
      borderBottomWidth: 2.5,
    },

  });
AppRegistry.registerComponent('TabAndroid', () => TabAndroid);
