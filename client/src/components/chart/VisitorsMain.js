import React, { useEffect, useState } from 'react';
import { Col, Card, CardBody, CardHeader } from 'reactstrap';
import { getColor } from 'utils/colors';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import Loading from '../map/Loading';
import { visitors } from '../../assets/geo-data/visitorsList.json';

function VisitorsMain() {
  const [Load, setLoad] = useState(true);
  const [LoadD, setLoadD] = useState(true);
  const MONTHS = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
  ];
  const MONTHS2 = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
  ];
  const leaveKr = [
    86143, 68213, 79446, 71302, 75416, 73999, 116615, 101963, 137712, 124399,
  ];
  const [list, setlist] = useState([]);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setlist(filterTenNation());
  };

  useEffect(() => {
    if (list !== []) {
      setLoad(false);
      setLoadD(false);
    }
  }, [list]);

  const filterTenNation = () => {
    let tmp = [];
    visitors
      .filter(
        item =>
          item.name.indexOf('일본') != -1 ||
          item.name.indexOf('태국') != -1 ||
          item.name.indexOf('괌') != -1 ||
          item.name.indexOf('싱가포르') != -1 ||
          item.name.indexOf('독일') != -1 ||
          item.name.indexOf('캐나다') != -1 ||
          item.name.indexOf('멕시코') != -1 ||
          item.name.indexOf('도미니카 공화국') != -1 ||
          item.name.indexOf('오스트리아') != -1,
      )
      .map(data => {
        if (
          data.name === '일본' ||
          data.name === '태국' ||
          data.name === '괌' ||
          data.name === '싱가포르' ||
          data.name === '독일' ||
          data.name === '캐나다' ||
          data.name === '멕시코' ||
          data.name === '도미니카 공화국' ||
          data.name === '오스트리아'
        ) {
          tmp = [...tmp, data];
        }
      });
    return tmp;
  };

  const genLineData = () => {
    let data = [];
    let tmp = {
      label: ``,
      backgroundColor: getColor('primary'),
      borderColor: getColor('primary'),
      borderWidth: 1,
      data: [],
      fill: false,
    };
    for (let i = 0; i < 8; i++) {
      tmp = {
        ...tmp,
        label: list[i].name,
        data: list[i].num,
      };
      data = [...data, tmp];
    }
    return {
      labels: MONTHS2,
      datasets: data,
    };
  };

  const genBarData = data => {
    return {
      labels: MONTHS,
      datasets: [
        {
          label: `한국 출국자 수`,
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 1,
          data: data,
        },
      ],
    };
  };

  const genPieData = () => {
    return {
      datasets: [
        {
          data: [
            20400, 2200, 1160, 573, 516, 394, 278, 229, 82, 34, 11, 4, 3, 1, 1,
            111826,
          ],
          backgroundColor: [getColor('primary'), getColor('secondary')],
          label: 'Dataset 1',
        },
      ],
      labels: [
        '미국',
        '일본',
        '터키',
        '괌',
        '싱가포르',
        '대만',
        '도미니카 공화국',
        '슬로베니아',
        '홍콩',
        '스와질랜드',
        '스리랑카',
        '세이셸',
        '모리셔스',
        '마카오',
        '세르비아',
        '그 외 국가(목적지 불명?)',
      ],
    };
  };

  return (
    <>
      <Col xl={6} lg={12} md={12}>
        <Card>
          <CardHeader>2021년 월별 우리나라 출국자 수</CardHeader>
          <CardBody>
            {Load === true ? <Loading /> : <Bar data={genBarData(leaveKr)} />}
          </CardBody>
        </Card>
      </Col>
      <Col xl={6} lg={12} md={12}>
        <Card>
          <CardHeader>2021년 1~9월 10개국을 방문한 한국 관광객 수</CardHeader>
          <CardBody>
            {Load === true ? <Loading /> : <Line data={genLineData(leaveKr)} />}
          </CardBody>
        </Card>
      </Col>
      {/* <Col xl={6} lg={12} md={12}>
        <Card>
          <CardHeader>2021년 9월 목적지 별 출국자 수</CardHeader>
          <CardBody>
            {LoadD === true ? <Loading /> : <Doughnut data={genPieData()} />}
          </CardBody>
        </Card>
      </Col> */}
    </>
  );
}

export default VisitorsMain;
