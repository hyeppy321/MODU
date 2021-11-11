import React from 'react';
import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import Page from 'components/Page';
import { getColor } from 'utils/colors';
import { randomNum } from 'utils/demos';
import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';


const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const genLineData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
        ],
        ...moreData,
      },
      {
        label: 'Dataset 2',
        backgroundColor: getColor('secondary'),
        borderColor: getColor('secondary'),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
        ],
        ...moreData2,
      },
    ],
  };
};

const Chart1 = () => {
    return (
          <Card>
            <CardHeader>Chart 1</CardHeader>
            <CardBody>
              <Bar data={genLineData()} />
            </CardBody>
          </Card>
     );
}
 
export default Chart1;