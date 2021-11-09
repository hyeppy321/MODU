import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { ArrivalsService_URL, API_ENCODED_KEY } from '../Config';
import Axios from 'axios';

export const SearchPage = props => {
  const [Info, setInfo] = useState([]);
  const [ReturnType, setReturnType] = useState('JSON');
  const [NumOfRows, setNumOfRows] = useState(10);
  const [PageNo, setPageNo] = useState(1);
  const [CountryName, setCountryName] = useState('미국');
  const [CountryIso, setCountryIso] = useState('US');

  useEffect(() => {
    window.scrollTo(0, 0);
    let endpointInfo =
      `${ArrivalsService_URL}?serviceKey=${API_ENCODED_KEY}&returnType=${ReturnType}
      &numOfRows=${NumOfRows}&pageNo=${PageNo}&cond[country_nm::EQ]=` +
      encodeURI(`${CountryName}`) +
      `&cond[country_iso_alp2::EQ]=${CountryIso}`;
    Axios.get(endpointInfo).then(res => {
      if (res.data.resultMsg === '정상') {
        setInfo(res.data.data);
        console.log(res.data.data);
      }
    });
  }, []);
  return (
    <Page
      className="SearchPage"
      title="Search"
      breadcrumbs={[{ name: 'Search', active: true }]}
    >
      검색
    </Page>
  );
};

export default SearchPage;
