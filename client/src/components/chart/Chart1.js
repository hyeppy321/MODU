import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { getCovid19InfStateJson_URL, yeongin_key } from '../Config';
import Loading from '../map/Loading';
import { Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getColor } from 'utils/colors';

function Chart1() {
  const [Load, setLoad] = useState(true);
  const [ConfirmedData, setConfirmedData] = useState({});
  let arrReverse = [];
  let arr = [];
  useEffect(async () => {
    window.scrollTo(0, 0);
    let endpointInfo = `${getCovid19InfStateJson_URL}?serviceKey=${yeongin_key}&startCreateDt=20211108&endCreateDt=2021112`;
    await Axios.get(endpointInfo).then(res => {
      console.log(res.data);
      makeData(res.data.response.body.items.item);
      arrReverse = [...arr].reverse();
      setLoad(false);
    });
    const labels = arrReverse.map(a => `${a.month}월 ${a.date}일`);
    setConfirmedData({
      labels,
      datasets: [
        {
          label: '국내 치료 중인 환자 수',
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 2,
          fill: false,
          data: arrReverse.map(a => a.careCnt),
        },
      ],
    });
  }, []);

  const makeData = items => {
    items.map(item => {
      arr = [
        ...arr,
        {
          year: moment(item.createDt).format('YY'),
          month: moment(item.createDt).format('MM'),
          date: moment(item.createDt).format('DD'),
          careCnt: item.careCnt,
        },
      ];
    });
  };

  return (
    <Card>
      <CardHeader>국내 치료 중인 환자 수</CardHeader>
      <CardBody>
        {Load === true ? <Loading /> : <Line data={ConfirmedData} />}
      </CardBody>
    </Card>
  );
}

export default Chart1;
