import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { IconWidget } from '../Widget';
import { MdReport } from 'react-icons/md';
import { Col } from 'reactstrap';

export const TravelAlarmData2 = props => {
  const [Alarm, setAlarm] = useState([]);
  const [SpAlarm, setSpAlarm] = useState([]);
  const [TravelAlarm, setTravelAlarm] = useState([]);
  const [Nation, setNation] = useState(props.nation);

  let NationInfo = {};
  useEffect(() => {
    window.scrollTo(0, 0);
    Axios.get(`/api/info/TravelAlarm`).then(res => {
      setAlarm(res.data.data.body.data.filter(item => item.alarm_lvl != null));
    });
    Axios.get(`/api/info/SpecialWarning`).then(res => {
      setSpAlarm(
        res.data.data.body.response.body.items.item.filter(
          item =>
            !item.splimit ||
            !item.splimitPartial ||
            !item.spbanYan ||
            !item.spbanYnPartial,
        ),
      );
    });
  }, []);

  const load = () => {};
  useEffect(() => {
    Alarm.map(item => {
      setTravelAlarm(prevState => [
        ...prevState,
        {
          countryNm: item.country_nm,
          countryEnNm: item.country_eng_nm,
          ISO: item.country_iso_alp2,
          level: item.alarm_lvl + '단계',
          note: item.remark,
        },
      ]);
    });
  }, [Alarm]);

  useEffect(() => {
    SpAlarm.filter(sp => sp.splimit !== undefined).map(item => {
      setTravelAlarm(prevState => [
        ...prevState,
        {
          countryNm: item.countryName,
          countryEnNm: item.countryEnName,
          ISO: item.isoCode,
          level: item.splimit,
          note: item.splimitNote,
        },
      ]);
    });
    SpAlarm.filter(sp => sp.splimitPartial !== undefined).map(item => {
      setTravelAlarm(prevState => [
        ...prevState,
        {
          countryNm: item.countryName,
          countryEnNm: item.countryEnName,
          ISO: item.isoCode,
          level: item.splimitPartial,
          note: item.splimitNote,
        },
      ]);
    });
    SpAlarm.filter(sp => sp.spbanYna !== undefined).map(item => {
      setTravelAlarm(prevState => [
        ...prevState,
        {
          countryNm: item.countryName,
          countryEnNm: item.countryEnName,
          ISO: item.isoCode,
          level: item.spbanYna,
          note: item.spbanNote,
        },
      ]);
    });
    SpAlarm.filter(sp => sp.spbanYnPartial !== undefined).map(item => {
      setTravelAlarm(prevState => [
        ...prevState,
        {
          countryNm: item.countryName,
          countryEnNm: item.countryEnName,
          ISO: item.isoCode,
          level: item.spbanYnPartial,
          note: item.spbanNote,
        },
      ]);
    });
  }, [SpAlarm]);

  const filterNation = name => {
    TravelAlarm.filter(item => item.countryNm.indexOf(name) !== -1).map(
      data => {
        if (name === data.countryNm) {
          NationInfo = {
            level: data.level,
            note: data.note,
          };
        }
      },
    );
  };
  if (TravelAlarm.length === 237) {
    filterNation(Nation);
  }

  return (
    <Col xl={6} lg={12} md={12} className="mb-3">
      <IconWidget
        bgColor={'pink'}
        icon={MdReport}
        title="특별여행 경보단계"
        subtitle={NationInfo.level}
      />
    </Col>
  );
};

export default TravelAlarmData2;
