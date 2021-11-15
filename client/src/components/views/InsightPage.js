import React, { useEffect, useState } from 'react';
import Covid19 from 'components/map/Covid19.jsx';
import Chart1 from '../chart/Chart1';
import Chart2 from '../chart/Chart2';
import Page from 'components/Page';
import { Col, Row } from 'reactstrap';

function InsightPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Page>
      <Row>
        <Col>
          <Covid19 />
        </Col>
      </Row>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Chart1 />
        </Col>
        <Col xl={6} lg={12} md={12}>
          <Chart2 />
        </Col>
      </Row>
    </Page>
  );
}

export default InsightPage;
