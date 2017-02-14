'use strict';
import React, {
  AppRegistry,
  Component,
  PropTypes,
} from 'react-native';

import LineChart from 'react-native-chart-android/LineChart';
import styling from '../../statics';

export default class Linegraph extends Component {

  static propTypes = {
      data: PropTypes.array.isRequired,
      label: PropTypes.string,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
  };

	constructor(props) {
		super(props);
  }

	render() {
    let chartData = {
      yValues: [{
        data: this.props.data,
        label: this.props.label,
        config: {
          color: styling.a_red,
          drawCircles: true,
          circleSize: 3,
          circleColor: styling.a_red,
          drawValues: false,
        },
      }]
    };
    chartData.xValues = Array.from(Array(this.props.data.length), (v, k) => k + '');
    return(
        <LineChart
          style={{width: this.props.width, height: this.props.height}}
          data={chartData}
          xAxis={{position: 'BOTTOM'}}
          yAxisRight={{enable: false}}
          yAxis={{}}
          description={''}
          touchEnabled={false}
          drawGridBackground={true}
          legend={{enable: false}}
          drawHighlightIndicators={false}
          gridBackgroundColor={'WHITE'}
        />
    );
	}
}

AppRegistry.registerComponent('Linegraph', () => Linegraph);
