
'use strict';

import React, {
  AppRegistry,
  Component,
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
