import React, { useEffect, useState } from 'react';
import {
  API_ENCODED_KEY,
  getCovid19InfStateJson_URL,
  chanbi_key,
  yeongin_key,
} from '../Config';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getColor } from 'utils/colors';
import { Line } from 'react-chartjs-2';
import Axios from 'axios';
import Loading from '../map/Loading';

function Chart1() {
  const [Load, setLoad] = useState(true);
  const [ConfirmedData, setConfirmedData] = useState({});
  let arr = [];
  useEffect(() => {
    window.scrollTo(0, 0);
    let endpointInfo = `${getCovid19InfStateJson_URL}?serviceKey=${API_ENCODED_KEY}&startCreateDt=20210501`;
    Axios.get(endpointInfo).then(res => {
      makeData(res.data.response.body.items.item);
      setLoad(false);
    });
    const arrReverse = [...arr].reverse();
    const labels = arrReverse.map(a => `${a.date + 1}일`);
    setConfirmedData({
      labels,
      datasets: [
        {
          label: '국내 치료 중인 환자 수',
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 1,
          data: arrReverse.map(a => a.careCnt),
        },
      ],
    });
  }, []);
  const makeData = items => {
    arr = items.reduce((acc, cur) => {
      const currentDate = new Date(cur.createDt);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const date = currentDate.getDate();
      const careCnt = cur.careCnt;

      acc.push({ year, month, date, careCnt });

      return acc;
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
