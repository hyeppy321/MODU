import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { MdSearch, MdCoronavirus, MdAirplanemodeActive } from 'react-icons/md';
import SearchInput from 'components/SearchInput';
import { NumberWidget, IconWidget } from '../../components/Widget';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
  Form,
  Input,
  Label,
} from 'reactstrap';
import {
  SafetyNews_URL,
  ArrivalsService_URL,
  API_ENCODED_KEY,
  getCovid19NatInfStateJson_URL,
  EntranceVisaService_URL,
  KoreaDepartureService_URL,
  getTravelAlarm_URL,
  TravelWarning_URL,
  TravelWarningInfo_URL,
  SptravelWarningService_URL,
} from '../Config';
import Axios from 'axios';

export const SearchPage = props => {
  const nation = [
    { iso: 'US', kr: '미국' },
    { iso: 'NL', kr: '네덜란드' },
    { iso: 'MK', kr: '북마케도니아' },
  ];
  const [Info, setInfo] = useState([]);
  const [ReturnType, setReturnType] = useState('JSON');
  const [NumOfRows, setNumOfRows] = useState(10);
  const [PageNo, setPageNo] = useState(1);
  const [CountryName, setCountryName] = useState(nation[0].kr);
  const [CountryIso, setCountryIso] = useState(nation[0].iso);
  const [InfoVisible, setInfoVisible] = useState(false);
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [InfoCorona, setInfoCorona] = useState([]);
  const [Defcnt, setDefcnt] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let endpointInfo1 = `${getCovid19NatInfStateJson_URL}?serviceKey=${API_ENCODED_KEY}&startCreateDt=20211110`;
    Axios.get(endpointInfo1).then(res => {
      setInfoCorona(res.data.response.body.items.item);
    });
  }, []);

  const onCountryNameHandler = event => {
    setCountryName(event.currentTarget.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    setInfoVisible(true);
    console.log(4444444444, CountryName, CountryIso);
    getArrivalsServiceInfo();
  };
  useEffect(() => {
    const filterNameToIso = name => {
      nation
        .filter(item => item.kr.indexOf(name) != -1)
        .map(data => {
          setCountryIso(data.iso);
        });
    };
    const filterCnt = name => {
      InfoCorona.filter(item => item.nationNm.indexOf(name) != -1).map(data => {
        console.log(data);
      });
    };
    filterNameToIso(CountryName);
    filterCnt(CountryName);
  }, [CountryName]);

  const getArrivalsServiceInfo = () => {
    let endpointInfo =
      `${ArrivalsService_URL}?serviceKey=${API_ENCODED_KEY}&returnType=${ReturnType}
    &numOfRows=${NumOfRows}&pageNo=${PageNo}&cond[country_nm::EQ]=` +
      encodeURI(`${CountryName}`) +
      `&cond[country_iso_alp2::EQ]=${CountryIso}`;
    Axios.get(endpointInfo).then((res, body) => {
      if (res.data.resultMsg === '정상') {
        console.log(111, res.data.data);
        res.data.data.map((item, index) => {
          setTitle(item.title);
          setContent(item.txt_origin_cn);
          // console.log(item.title);
          // console.log(item.txt_origin_cn);
        });
      }
    });
  };

  return (
    <Page
      className="SearchPage"
      title="Search"
      breadcrumbs={[{ name: 'Search', active: true }]}
    >
      <Row>
        <Col md="6">
          <Card className="mb-3">
            <CardHeader>
              국가명을 입력해주세요.
              <Form inline className="cr-search-form" onSubmit={handleSubmit}>
                <Input
                  type="select"
                  name="select"
                  value={CountryName}
                  onChange={onCountryNameHandler}
                >
                  {nation.map((data, index) => {
                    return <option>{data.kr}</option>;
                  })}
                </Input>
                &nbsp;&nbsp;&nbsp;
                <Button color="secondary" onClick={handleSubmit}>
                  검색
                </Button>
              </Form>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      {InfoVisible && (
        <Row>
          <Col key={1} lg={4} md={6} sm={6} xs={12} className="mb-3">
            <NumberWidget
              title="코로나 감염 현황"
              subtitle="금일"
              number="사망자수"
              color="red"
              progress={{
                value: 75,
                label: '사망률',
              }}
            />
          </Col>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            <IconWidget
              bgColor={'primary'}
              icon={MdAirplanemodeActive}
              title="gg"
              subtitle="ggg"
            />
          </Col>
        </Row>
      )}
      {InfoVisible && (
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>{Title} </CardHeader>
              <CardBody>{Content}</CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </Page>
  );
};

export default SearchPage;
