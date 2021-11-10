import { features } from 'assets/geo-data/countries.json';
import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { API_ENCODED_KEY, getCovid19NatInfStateJson_URL, getTravelAlarm_URL } from '../Config';
import Axios from 'axios';
import { Geographies, Geography } from 'react-simple-maps';

export const SearchPage = props => {
    const [Alarm, setAlarm] = useState([]);
  const [SpAlarm, setSpAlarm] = useState([]);
  const [TravelAlarm,setTravelAlarm] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let endpointInfo =`${getTravelAlarm_URL}?serviceKey=${API_ENCODED_KEY}&pageNo=1&numOfRows=200`;
    Axios.get(endpointInfo).then(res => {
      setAlarm(res.data.data.filter(item=> item.alarm_lvl!=null));
    });
    let endpointInfo2 =`${TravelSpecialWarningService_URL}?serviceKey=${API_ENCODED_KEY}&pageNo=1&numOfRows=200`;
    Axios.get(endpointInfo2).then(res => {
      setSpAlarm(res.data.response.body.items.item.filter(item=>!item.splimit || !item.splimitPartial || !item.spbanYan || !item.spbanYnPartial));
    });
  }, []);
  
  useEffect(()=>{
    Alarm.map((item)=> {
      setTravelAlarm((prevState) =>([
        ...prevState,
        {countryNm : item.country_nm,
        countryEnNm : item.country_eng_nm,
        ISO : item.country_iso_alp2,
        level : item.alarm_lvl+"단계",
        note : item.remark}
      ]))
    })
  },[Alarm]);

  useEffect(()=>{
    SpAlarm.filter(sp=>sp.splimit!=undefined)
      .map((item)=> {
      setTravelAlarm((prevState) =>([
        ...prevState,
        {countryNm : item.countryName,
        countryEnNm : item.countryEnName,
        ISO : item.isoCode,
        level : item.splimit,
        note : item.splimitNote}
      ]))
    })
    SpAlarm.filter(sp=>sp.splimitPartial!=undefined)
      .map((item)=> {
      setTravelAlarm((prevState) =>([
        ...prevState,
        {countryNm : item.countryName,
        countryEnNm : item.countryEnName,
        ISO : item.isoCode,
        level : item.splimitPartial,
        note : item.splimitNote}
      ]))
    })
    SpAlarm.filter(sp=>sp.spbanYna!=undefined)
      .map((item)=> {
      setTravelAlarm((prevState) =>([
        ...prevState,
        {countryNm : item.countryName,
        countryEnNm : item.countryEnName,
        ISO : item.isoCode,
        level : item.spbanYna,
        note : item.spbanNote}
      ]))
    })
    SpAlarm.filter(sp=>sp.spbanYnPartial!=undefined)
      .map((item)=> {
      setTravelAlarm((prevState) =>([
        ...prevState,
        {countryNm : item.countryName,
        countryEnNm : item.countryEnName,
        ISO : item.isoCode,
        level : item.spbanYnPartial,
        note : item.spbanNote}
      ]))
    })
  },[SpAlarm]);

  return (
    <Page
      className="SearchPage"
      title="Search"
      breadcrumbs={[{ name: 'Search', active: true }]}
    >
      데이터가공
    </Page>
  );
};

export default SearchPage;
