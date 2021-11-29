import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import Loading from '../map/Loading';
import { Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getColor } from 'utils/colors';
import Page from 'components/Page';

function CovidRateCnt() {
  let nowddd = moment().format('ddd');
  let nowHH = moment().format('HH');
  console.log(nowHH);
  let sysToday = moment().format('YYYYMMDD');
  let sysYesterday = moment().subtract(1, 'days').format('YYYYMMDD');

  let CountryName = '미국';
  let CountryIso = 'US';

  const [percentByPeople, setpercentByPeople] = useState(0);

  let tmp = {
    CountryName,
    CountryIso,
  };
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    let res = await Axios.post(`/api/info/getCountryPopulation`, tmp);
    let popltnCnt = res.data.data.body.data[0].popltn_cnt;
    const result = getDay();
    const today = result[0];
    const yesterday = result[1];

    let resY = await Axios.get(`api/info/YesterdayCovid19Nat/${yesterday}`);
    let yesterdayDefcnt = resY.data.data.body.response.body.items.item;

    let resT = await Axios.get(`api/info/TodayCovid19Nat/${today}`);
    let todayDefcnt = resT.data.data.body.response.body.items.item;

    todayDefcnt = filterNation(CountryName, todayDefcnt);
    yesterdayDefcnt = filterNation(CountryName, yesterdayDefcnt);

    getOnedayDefcnt(todayDefcnt, yesterdayDefcnt, popltnCnt);
  };

  const getDay = () => {
    let t = '';
    let y = '';
    if (nowddd == 'Sun') {
      t = moment(sysToday).subtract(1, 'days').format('YYYYMMDD');
      y = moment(sysYesterday).subtract(1, 'days').format('YYYYMMDD');
    } else if (nowddd == 'Mon') {
      t = moment(sysToday).subtract(2, 'days').format('YYYYMMDD');
      y = moment(sysYesterday).subtract(2, 'days').format('YYYYMMDD');
    } else if (nowddd == 'Tue' && nowHH < 12) {
      t = moment(sysToday).subtract(3, 'days').format('YYYYMMDD');
      y = moment(sysYesterday).subtract(3, 'days').format('YYYYMMDD');
    } else if (nowHH < 12) {
      t = moment(sysToday).subtract(1, 'days').format('YYYYMMDD');
      y = moment(sysYesterday).subtract(1, 'days').format('YYYYMMDD');
    }
    return [t, y];
  };

  const getOnedayDefcnt = (todayDefcnt, yesterdayDefcnt, popltnCnt) => {
    todayDefcnt = {
      ...todayDefcnt,
      todayNatDefCnt: todayDefcnt.natDefCnt - yesterdayDefcnt.natDefCnt,
    };
    console.log(
      todayDefcnt.todayNatDefCnt,
      popltnCnt,
      todayDefcnt.todayNatDefCnt / popltnCnt,
    );
    setpercentByPeople(todayDefcnt.todayNatDefCnt / popltnCnt);
    console.log(percentByPeople);
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
    <Page
      className="HomePage"
      title="Home"
      breadcrumbs={[{ name: '', active: true }]}
    >
      홈
    </Page>
  );
}

export default CovidRateCnt;
