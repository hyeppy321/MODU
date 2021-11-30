import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import Loading from '../map/Loading';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { getColor } from 'utils/colors';
import Page from 'components/Page';
import { Doughnut } from 'react-chartjs-2';

function CovidRateCnt(props) {
  const [Load, setLoad] = useState(true);

  let nowddd = moment().format('ddd');
  let nowHH = moment().format('HH');
  let sysToday = moment().format('YYYYMMDD');
  let sysYesterday = moment().subtract(1, 'days').format('YYYYMMDD');
  // console.log(props.data);
  let arr = props.data.split(' ');
  let CountryName = arr[0];
  let CountryIso = arr[1];

  const [percentByPeople, setpercentByPeople] = useState(0);

  let tmp = {
    CountryName,
    CountryIso,
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    load();
  }, []);
  const load = async () => {
    let res = await Axios.post(`/api/info/getCountryPopulation`, tmp);
    let popltnCnt = res.data.data.body.data[0].popltn_cnt;
    const result = getDay();
    const today = result;

    let resT = await Axios.get(`api/info/TodayCovid19Nat/${today}`);
    let todayDefcnt = resT.data.data.body.response.body.items.item;

    todayDefcnt = filterNation(CountryName, todayDefcnt);
    setpercentByPeople(
      genPieData(Math.round((todayDefcnt.natDefCnt / popltnCnt) * 10000) / 100),
    );
    setLoad(false);
  };

  const genPieData = p => {
    return {
      datasets: [
        {
          data: [p, 100 - p],
          backgroundColor: [getColor('primary'), getColor('secondary')],
          label: 'Dataset 1',
        },
      ],
      labels: ['인구대비 누적 확진자 비율'],
    };
  };

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
    }
    return t;
  };

  const filterNation = (nation, arr) => {
    let result = {};
    arr
      .filter(item => item.nationNm.indexOf(nation) != -1)
      .map((item, index) => {
        if (nation === item.nationNm) {
          result = item;
        }
      });
    return result;
  };

  return (
    <Col xl={6} lg={12} md={12}>
      <Card>
        <CardHeader>{CountryName}</CardHeader>
        <CardBody>
          {Load === true ? <Loading /> : <Doughnut data={percentByPeople} />}
        </CardBody>
      </Card>
    </Col>
  );
}

export default CovidRateCnt;
