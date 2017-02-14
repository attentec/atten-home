'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  ViewPagerAndroid,
  PropTypes,
} from 'react-native';

import ToolBarWithTabsAndroid from './toolBarWithTabsAndroid';
import styling from '../../statics';

export default class ViewPagerWithToolbarTabsAndroid extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    tabTitles: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
		super(props);
		this.state = {selectedTab: 0};
	}

  render() {
    return (
      <View style={styles.containerColumn}>
        <ToolBarWithTabsAndroid selectPage={this._selectPage} title={this.props.title}
        tabTitles={this.props.tabTitles} selectedTab ={this.state.selectedTab}
        />
        <ViewPagerAndroid
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={this.pageSelected}
        ref={(c) => {
          this.viewPager = c;
          }}>
          {this.props.children}
        </ViewPagerAndroid>
      </View>
      );
  }

  pageSelected = (e) => {
    this.setState({selectedTab: e.nativeEvent.position});
  };

  _selectPage = (index) => {
    this.viewPager.setPage(index);
    this.setState({selectedTab: index});
  };
}

const styles = StyleSheet.create({
    viewPager: {
      flex: 1
    },
    containerColumn: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: styling.a_white,
     }

});

AppRegistry.registerComponent('ViewPagerWithToolbarTabsAndroid',
 () => ViewPagerWithToolbarTabsAndroid);
