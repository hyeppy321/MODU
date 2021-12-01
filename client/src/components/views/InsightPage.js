import React, { useEffect, useState } from 'react';
import Covid19 from 'components/map/Covid19.jsx';
import Chart1 from '../chart/Chart1';
import Chart2 from '../chart/Chart2';
import VisitorsMain from '../chart/VisitorsMain';
import Page from 'components/Page';
import { Col, Row } from 'reactstrap';
import moment from 'moment';

function InsightPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let nowddd = moment().format('ddd');
  let nowHH = moment().format('HH');
  let sysToday = moment().format('YYYYMMDD');

  const getDay = () => {
    let t = '';
    if (nowddd == 'Sun') {
      t = moment(sysToday).subtract(1, 'days').format('YYYYMMDD');
    } else if (nowddd == 'Mon') {
      t = moment(sysToday).subtract(2, 'days').format('YYYYMMDD');
    } else if (nowddd == 'Tue' && nowHH < 12) {
      t = moment(sysToday).subtract(3, 'days').format('YYYYMMDD');
    } else if (nowddd == 'Tue' && nowHH >= 12) {
      t = sysToday;
    } else if (nowddd == 'Wed' && nowHH < 12) {
      t = moment(sysToday).subtract(1, 'days').format('YYYYMMDD');
    } else if (nowHH < 12) {
      t = moment(sysToday).subtract(1, 'days').format('YYYYMMDD');
    } else {
      t = sysToday;
    }
    return t;
  };

  const ReferencDate = getDay();

  return (
    <Page
      className="InsightPage"
      title="코로나 상황판"
      description={"국가 별 일일 확진자수를 지도에 시각화하여 제공합니다. 지도를 클릭하여 일일 확진자수를 확인해보세요. (※한국시간 기준 "+ ReferencDate +"에 업데이트 되었습니다.)"}
      breadcrumbs={[{ name: 'Insight', active: true }]}
    >
      <Row>
        <Col>
          <Covid19 />
        </Col>
      </Row>
      <Row>
        <VisitorsMain />
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
