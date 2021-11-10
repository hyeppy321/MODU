import world50m from '../../assets/geo-data/world-50m.json';
import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { API_ENCODED_KEY, getCovid19NatInfStateJson_URL } from '../Config';
import Axios from 'axios';
import { Geographies, Geography } from 'react-simple-maps';

export const SearchPage = props => {
  const [Defcnt, setDefcnt] = useState([]);
  const [NewWorld50m, setNewWorld50m] = useState([world50m]);

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
        cnt = item.natDefCnt;
      });
      return cnt;
    };

    NewWorld50m.map((item, index) => {
      item.objects.units.geometries.map((geo, i) => {
        geo.properties = {
          ...geo.properties,
          natDefCnt: filtercnt(geo.properties.name),
        };
      });
    });
    
    console.log(5555555555, NewWorld50m);
    console.log(5555555555, world50m);
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
