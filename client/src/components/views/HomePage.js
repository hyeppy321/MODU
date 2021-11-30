import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { nations } from '../../assets/geo-data/nations.json';

export const HomePage = props => {
  const [touristKr, settouristKr] = useState([]);
  let tmp = {
    YM: '202106',
    natCd: '100',
    edCd: 'D',
  };
  useEffect(() => {
    Axios.post(`/api/info/TourismStats`, tmp).then(res => {
      console.log(res);
    });
  }, []);
  // let a = '한국';
  // let t = nations;
  // console.log(t);
  // let nowddd = moment().format('ddd');
  // let nowHH = moment().format('HH');
  // const [today, settoday] = useState(moment().format('YYYYMMDD'));
  // const [yesterday, setyesterday] = useState(
  //   moment().subtract(1, 'days').format('YYYYMMDD'),
  // );
  // useEffect(() => {
  //   if (nowddd == 'Sun') {
  //     settoday(moment(today).subtract(1, 'days').format('YYYYMMDD'));
  //     setyesterday(moment(yesterday).subtract(1, 'days').format('YYYYMMDD'));
  //   } else if (nowddd == 'Mon') {
  //     settoday(moment(today).subtract(2, 'days').format('YYYYMMDD'));
  //     setyesterday(moment(yesterday).subtract(2, 'days').format('YYYYMMDD'));
  //   } else if (nowddd == 'Tue' && nowHH < 12) {
  //     settoday(moment(today).subtract(3, 'days').format('YYYYMMDD'));
  //     setyesterday(moment(yesterday).subtract(3, 'days').format('YYYYMMDD'));
  //   } else if (nowHH < 12) {
  //     settoday(moment(today).subtract(1, 'days').format('YYYYMMDD'));
  //     setyesterday(moment(yesterday).subtract(1, 'days').format('YYYYMMDD'));
  //   }
  // }, []);

  // console.log(today);
  return (
    <Page
      className="HomePage"
      title="Home"
      breadcrumbs={[{ name: '', active: true }]}
    >
      홈
    </Page>
  );
};

export default HomePage;
