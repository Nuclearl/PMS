import React from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const xValues = [];
const yValues = [];


function fillInValues(xArr, yArr) {
  for (
    let i = -3;
    i <= 3;
    i += 0.3
  ) {
    xArr.push(i.toFixed(1));
    yArr.push(i**3);
  }
}

fillInValues(xValues, yValues);

const Graph = () => {

  return (
    <LineChart
      data={{
        labels: xValues,
        datasets: [
          {
            data: yValues,
            strokeWidth: 3,
          },
        ],
      }}
      width={Dimensions.get('window').width-10}
      height={300}
      chartConfig={{
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 0,
        color: (opacity = 255) => `rgba(3, 182, 252, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      verticalLabelRotation={60}
      withDots={false}
      withOuterLines={false}
      segments={2}
      style={{
        borderRadius: 1,
      }}
    />
  );
}

export default Graph;
