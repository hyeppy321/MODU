import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import SearchInput from 'components/SearchInput';
import { Row, Col, Button } from 'reactstrap';
import {
  ArrivalsService_URL,
  API_ENCODED_KEY,
  getCovid19NatInfStateJson_URL,
} from '../Config';
import Axios from 'axios';

export const SearchPage = props => {
  const [Info, setInfo] = useState([]);
  const [ReturnType, setReturnType] = useState('JSON');
  const [NumOfRows, setNumOfRows] = useState(10);
  const [PageNo, setPageNo] = useState(1);
  const [CountryName, setCountryName] = useState('미국');
  const [CountryIso, setCountryIso] = useState('US');
  const userId = localStorage.getItem('userId');
  console.log(userId);
  useEffect(() => {
    window.scrollTo(0, 0);
    let endpointInfo = `${getCovid19NatInfStateJson_URL}?serviceKey=${API_ENCODED_KEY}&startCreateDt=20211109`;
    Axios.get(endpointInfo).then(res => {
      // if (res.data.resultMsg === '정상') {
      // setInfo(res.data.data);
      console.log(res.data.response.body.items.item[0]);
      console.log('gggg');
      // }
    });
  }, []);
  return (
    <Page
      className="SearchPage"
      title="Search"
      breadcrumbs={[{ name: 'Search', active: true }]}
    >
      국가명을 입력해주세요.
      <Row>
        <Col md="6" sm="12" xs="12">
          <SearchInput />
        </Col>
        <Col md="6" sm="12" xs="12">
          <Button color="secondary">Normal Button</Button>
        </Col>
      </Row>
    </Page>
  );
};

export default SearchPage;
