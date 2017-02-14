'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  PropTypes,
} from 'react-native';

import RNChart from 'react-native-chart';
import styling from '../../statics';

export default class Linegraph extends Component {

  static propTypes = {
      data: PropTypes.array.isRequired,
      label: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
  };

	constructor(props) {
		super(props);
  }

	render() {
    let chartData = [];
    chartData[0] = chartDefaults();
    chartData[0].data = this.props.data;
    chartData[0].name = this.props.label;
    if (this.props.data.every(function (e) {
      return e === 0;
    })) {
      return(<Text>No usage was found.</Text>);
    }
    let xLabels = Array.from(Array(this.props.data.length), (v, k) => k + '');
    return(
      <View>
        <RNChart
          style={{width: this.props.width, height: this.props.height}}
          chartData={chartData}
          verticalGridStep={5}
          xLabels={xLabels}
          animationDuration={0.001}
        />
      </View>
    );
	}

}

function chartDefaults() {
  return{
        color: styling.a_red,
        showDataPoint: true,
        dataPointColor: styling.a_red,
        dataPointRadius: 2,
        dataPointFillColor: 'white',
    };
}

AppRegistry.registerComponent('Linegraph', () => Linegraph);
