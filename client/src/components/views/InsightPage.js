import React, { useEffect, useState } from 'react';
import Covid19 from 'components/map/Covid19.jsx';
import Chart1 from '../chart/Chart1';
import Chart2 from '../chart/Chart2';
import VisitorsMain from '../chart/VisitorsMain';
import Page from 'components/Page';
import { Col, Row } from 'reactstrap';

function InsightPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Page
      className="InsightPage"
      title="코로나 상황판"
      description="국가 별 일일 확진자수를 지도에 시각화하여 제공합니다. 지도를 클릭하여 일일 확진자수를 확인해보세요."
      breadcrumbs={[{ name: 'Insight', active: true }]}
    >
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
      <Row>
        <VisitorsMain />
      </Row>
    </Page>
  );
}

export default InsightPage;
