import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Col, Card, CardBody, CardHeader } from 'reactstrap';
import { getColor } from 'utils/colors';
import { Bar, Doughnut } from 'react-chartjs-2';
import Loading from '../map/Loading';
import { nations } from '../../assets/geo-data/nations.json';

function VisitorsBar(props) {
  const [Load, setLoad] = useState(true);
  const [LoadD, setLoadD] = useState(true);
  const MONTHS = [
    '2021년1월',
    '2021년2월',
    '2021년3월',
    '2021년4월',
    '2021년5월',
    '2021년6월',
    '2021년7월',
    '2021년8월',
    '2021년9월',
  ];
  const leaveKr = [
    86143, 68213, 79446, 71302, 75416, 73999, 116615, 101963, 137712,
  ];
  const nationNm = props.nation;
  const touristKr = props.visitorsList; // 우리나라 -> 타국
  const [tourist, settourist] = useState([]); // 타국 -> 우리나라
  const [barData, setbarData] = useState(0);
  const [percentByPeople, setpercentByPeople] = useState(0);

  useEffect(() => {
    load();
  }, [props.nation]);

  const load = async () => {
    let tmp = {
      YM: '',
      natCd: '',
      edCd: 'E',
    };
    tmp = { ...tmp, natCd: filterNameToCode(nationNm) };
    let ym = '20210';
    let result = [];
    for (let i = 1; i < 10; i++) {
      tmp = { ...tmp, YM: ym + i };
      await Axios.post(`/api/info/TourismStats`, tmp).then(res => {
        result = [...result, res.data.data.body.response.body.items.item.num];
      });
      if (i == 9) {
        settourist(result);
      }
    }
  };

  useEffect(() => {
    if (tourist !== []) {
      setbarData(genLineData(tourist));
      setpercentByPeople(
        genPieData(Math.round((touristKr[8] / leaveKr[8]) * 10000) / 100),
      );
      setLoadD(false);
      setLoad(false);
    }
  }, [tourist]);

  const filterNameToCode = nation => {
    let code = '';
    nations
      .filter(item => item.name.indexOf(nation) != -1)
      .map(data => {
        if (nation === data.name) {
          code = data.code;
        }
      });
    return code;
  };

  const genLineData = data => {
    return {
      labels: MONTHS,
      datasets: [
        {
          label: `국민${nationNm}관광객`,
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 1,
          data: touristKr,
        },
        {
          label: `방한${nationNm}관광객`,
          backgroundColor: getColor('pink'),
          borderColor: getColor('pink'),
          borderWidth: 1,
          data: data,
        },
      ],
    };
  };

  const genPieData = p => {
    return {
      datasets: [
        {
          data: [p, 100 - p],
          backgroundColor: [getColor('primary'), getColor('lightgray')],
          label: 'Dataset 1',
        },
      ],
      labels: [`2021년 9월 한국인 출국자 중 ${nationNm} 방문객 비율`, '그 외'],
    };
  };

  return (
    <>
      <Col xl={6} lg={12} md={12}>
        <Card>
          <CardBody>
            {Load === true ? <Loading /> : <Bar data={barData} />}
          </CardBody>
        </Card>
      </Col>
      <Col xl={6} lg={12} md={12}>
        <Card>
          <CardBody>
            {LoadD === true ? <Loading /> : <Doughnut data={percentByPeople} />}
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default VisitorsBar;
