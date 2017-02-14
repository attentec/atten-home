/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Navigator
} from 'react-native';

import App from './app/containers/App';

class AttenHome extends Component {

  constructor(props){
		super(props);
	}

  render() {
    return (
      <App/>
      );
  }

}


AppRegistry.registerComponent('AttenHome', () => AttenHome);
