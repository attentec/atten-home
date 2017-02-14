'use strict';
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	View,
	TabBarIOS,
} from 'react-native';

import styling from '../../statics';

export default class CustomTabBarIOS extends Component {
	static propTypes = {
		tabContent: React.PropTypes.array.isRequired,
		tabTitles: React.PropTypes.array.isRequired,
		tabIcons: React.PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {selectedTab: 0};
	}

	render() {
		return (
			<TabBarIOS
			tintColor="white"
			barTintColor= {styling.a_red}
			translucent={true}
			>
			{this.props.tabContent.map(function (title, i) {
				return (
					<TabBarIOS.Item
						title={this.props.tabTitles[i]}
						selected={i === this.state.selectedTab}
						icon={this.props.tabIcons[i]}
						onPress={() => {
							console.log("Go to statics " + Date.now());
							this.setState({
								selectedTab: i,
							});
						}}
						key={i}
						index={i}
					>
						<View style={styles.tabContent}>
							{this.props.tabContent[i]}
						</View>
					</TabBarIOS.Item>
				);
			}.bind(this))}
			</TabBarIOS>
			);
	}
}

const styles = StyleSheet.create({
	tabContent: {
		backgroundColor: styling.a_white,
		flex: 1,
	},
});

AppRegistry.registerComponent('CustomTabBarIOS', () => CustomTabBarIOS);
