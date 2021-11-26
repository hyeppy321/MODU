import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import Loading from '../map/Loading';
import { Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getColor } from 'utils/colors';

function Chart1() {
  const [Load, setLoad] = useState(true);
  const [ConfirmedData, setConfirmedData] = useState({});
  let arrReverse = [];
  let arr = [];

  useEffect(() => {
    window.scrollTo(0, 0);
    let dtData = makeWeek();
    Axios.post(`/api/info/Covid19Chart1`, dtData).then(res => {
      makeData(res.data.data.body.response.body.items.item);
      arrReverse = [...arr].reverse();
      setLoad(false);
      labeling();
    });
  }, []);

  const labeling = () => {
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
  };

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

  const makeWeek = () => {
    let hour = moment().format('HH');
    let createdt;
    let enddt;

    if(parseInt(hour)<10){
      createdt = moment().subtract(7, 'days').format('YYYYMMDD');
      enddt = moment().subtract(1, 'days').format('YYYYMMDD');
    } else {
      createdt = moment().subtract(6, 'days').format('YYYYMMDD');
      enddt = moment().format('YYYYMMDD');
    }

    let dtdata = {
      createdt: createdt,
      enddt: enddt,
    }

    return dtdata;
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
