import React from 'react';
import {Col, Row} from 'reactstrap';
import Chart1 from './Chart1';
import Chart2 from './Chart2';

const CovidChart = () => {
    return (
        <Row>
        <Col xl={6} lg={12} md={12}>
          <Chart1/>
        </Col>
        <Col xl={6} lg={12} md={12}>
          <Chart2/>
        </Col>
        </Row>
     );
}
 
export default CovidChart;