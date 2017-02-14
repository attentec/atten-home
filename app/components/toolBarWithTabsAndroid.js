'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  Image,
} from 'react-native';

import TabAndroid from './tabAndroid';
import styling from '../../statics';

export default class ToolBarWithTabsAndroid extends Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    tabTitles: React.PropTypes.array.isRequired,
    selectedTab: React.PropTypes.number.isRequired,
    selectPage: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={styles.row}>
          <ToolbarAndroid subtitleColor={styling.a_white} style={styles.toolbar}>
            <Text style={styles.toolbarText}>{this.props.title}</Text>
          </ToolbarAndroid>
          <Image source={require('../../Attentec.png')}/>
        </View>
        <View style={styles.pageHeadersContainer}>
          {this.props.tabTitles.map(function (title, i) {
            return (
              <TabAndroid title={title} selectedTab={this.props.selectedTab === i}
                selectPage = {this.props.selectPage} key={i} index={i}/>
            );
          }.bind(this))}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  toolbarText: {
    textAlign: 'center',
    color: styling.a_red,
    margin: 50,
    fontFamily: styling.a_header_font,
    fontSize: 24,
    fontStyle: 'italic',
  },
  row: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    elevation: 10,
    backgroundColor: styling.a_white,
  },
  toolbar: {
    backgroundColor: styling.a_white,
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pageHeadersContainer: {
    flexDirection: 'row',
    height: 48,
  },

});
AppRegistry.registerComponent('ToolBarWithTabsAndroid', () => ToolBarWithTabsAndroid);
