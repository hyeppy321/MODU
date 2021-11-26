import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { getCovid19InfStateJson_URL, chanbi_key } from '../Config';
import Loading from '../map/Loading';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getColor } from 'utils/colors';
import { Line } from 'react-chartjs-2';

function Chart2() {
  const [Load, setLoad] = useState(true);
  const [ConfirmedData, setConfirmedData] = useState({});
  let arr = [];
  let arrReverse = [];
  useEffect(() => {
    window.scrollTo(0, 0);
    let dtData = makeWeek();
    console.log(dtData);
    Axios.post(`/api/info/Covid19Chart2`, dtData).then(res => {
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
          label: '국내 누적 확진자',
          backgroundColor: getColor('secondary'),
          borderColor: getColor('secondary'),
          borderWidth: 2,
          fill: false,
          data: arrReverse.map(a => a.decideCnt),
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
          decideCnt: item.decideCnt,
        },
      ];
    });
  };

  const makeWeek = () => {
    let hour = moment('2021-11-26 09:00:00','YYYY-MM-DD HH:mm:ss').format('HH');
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
      <CardHeader>국내 누적 확진자</CardHeader>
      <CardBody>
        {Load === true ? <Loading /> : <Line data={ConfirmedData} />}
      </CardBody>
    </Card>
  );
}

export default Chart2;
