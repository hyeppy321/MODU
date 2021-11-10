import { features } from 'assets/geo-data/countries.json';
import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { API_ENCODED_KEY, getCovid19NatInfStateJson_URL } from '../Config';
import Axios from 'axios';
import { Geographies, Geography } from 'react-simple-maps';

export const SearchPage = props => {
  const [Defcnt, setDefcnt] = useState([]);
  const [NewFeatures, setNewFeatures] = useState(features);
  useEffect(() => {
    window.scrollTo(0, 0);
    let endpointInfo = `${getCovid19NatInfStateJson_URL}?serviceKey=${API_ENCODED_KEY}&startCreateDt=20211109`;
    Axios.get(endpointInfo).then(res => {
      setDefcnt(res.data.response.body.items.item);
    });
  }, []);
  useEffect(() => {
    const filtercnt = nation => {
      let cnt = 0;
      Defcnt.filter(item => item.nationNmEn.indexOf(nation) != -1).map(item => {
        console.log(item);
        cnt = item.natDefCnt;
      });
      return cnt;
    };
    NewFeatures.map((item, index) => {
      item.properties = {
        ...item.properties,
        natDefCnt: filtercnt(item.properties.ADMIN),
      };
      console.log(item);
    });
  }, [Defcnt]);

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
