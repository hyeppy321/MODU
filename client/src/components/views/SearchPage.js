import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { features } from '../../assets/geo-data/countries.json';
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
  Weather_URI,
  Weather_KEY,
} from '../Config';
import Axios from 'axios';

export const SearchPage = props => {
  const nation = [
    { iso: 'US', kr: '미국' },
    { iso: 'NL', kr: '네덜란드' },
    { iso: 'MK', kr: '북마케도니아' },
  ];
  const [Nation, setNation] = useState(features);
  const [Info, setInfo] = useState([]);
  const [ReturnType, setReturnType] = useState('JSON');
  const [NumOfRows, setNumOfRows] = useState(10);
  const [PageNo, setPageNo] = useState(1);
  const [CountryName, setCountryName] = useState(Nation[0].properties.NAME);
  const [CountryIso, setCountryIso] = useState(Nation[0].properties.ISO_A2);
  const [InfoVisible, setInfoVisible] = useState(false);
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [InfoCorona, setInfoCorona] = useState([]);
  const [DefCnt, setDefCnt] = useState({});
  const [IsInfo, setIsInfo] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    let endpointInfo1 = `${getCovid19NatInfStateJson_URL}?serviceKey=${API_ENCODED_KEY}&startCreateDt=20211110`;
    Axios.get(endpointInfo1).then(res => {
      setInfoCorona(res.data.response.body.items.item);
    });
    // features.map(item => {
    //   console.log('aaaaaaaaa', item.properties.NAME);
    // });
    //"http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+"내APIKEY"
    let endpointInfo2 = `${Weather_URI}?q=seoul&appid=${Weather_KEY}`;
    Axios.get(endpointInfo2).then(res => {
      console.log('----==+++', res);
    });
  }, []);

  const filterCnt = name => {
    InfoCorona.filter(item => item.nationNm.indexOf(name) != -1).map(data => {
      let tmp = {
        natDefCnt: data.natDefCnt,
        natDeathRate: {
          value: Math.round(data.natDeathRate * 100),
          label: '사망률',
        },
        natDeathCnt: data.natDeathCnt,
        nm: data.nationNm,
      };
      setDefCnt(tmp);
      // console.log('ㅡㅡㅡㅡ', Math.round(data.natDeathRate * 100));
      // console.log(data);
      // console.log(11111111, DefCnt);
    });
  };

  const onCountryNameHandler = event => {
    setCountryName(event.currentTarget.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    setInfoVisible(true);
    console.log(4444444444, CountryName, CountryIso);
    getArrivalsServiceInfo();
    filterCnt(CountryName);
  };

  useEffect(() => {
    const filterNameToIso = name => {
      features
        .filter(item => item.properties.NAME.indexOf(name) != -1)
        .map(data => {
          setCountryIso(data.properties.ISO_A2);
        });
    };

    filterNameToIso(CountryName);
  }, [CountryName]);

  const getArrivalsServiceInfo = () => {
    let endpointInfo =
      `${ArrivalsService_URL}?serviceKey=${API_ENCODED_KEY}&returnType=${ReturnType}
    &numOfRows=${NumOfRows}&pageNo=${PageNo}&cond[country_nm::EQ]=` +
      encodeURI(`${CountryName}`) +
      `&cond[country_iso_alp2::EQ]=${CountryIso}`;
    Axios.get(endpointInfo).then((res, body) => {
      if (res.data.resultMsg === '정상') {
        if (res.data.data.length == 0) {
          setIsInfo(false);
        } else {
          setIsInfo(true);
          console.log(111, res.data.data);
          console.log(23233, res.data.data.length);
          res.data.data.map((item, index) => {
            setTitle(item.title);
            setContent(item.txt_origin_cn);
            // console.log(item.title);
            // console.log(item.txt_origin_cn);
          });
        }
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
              국가를 선택해주세요.
              <Form inline className="cr-search-form" onSubmit={handleSubmit}>
                <Input
                  type="select"
                  name="select"
                  value={CountryName}
                  onChange={onCountryNameHandler}
                >
                  {features.map((data, index) => {
                    return <option>{data.properties.NAME}</option>;
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
      {IsInfo && InfoVisible && (
        <Row>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            <IconWidget
              bgColor={'secondary'}
              icon={MdCoronavirus}
              title="코로나 확진자 수"
              subtitle={DefCnt.natDefCnt + '명'}
            />
          </Col>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            <IconWidget
              bgColor={'secondary'}
              icon={MdCoronavirus}
              title="코로나 사망자 수"
              subtitle={DefCnt.natDeathCnt + '명'}
            />
          </Col>
        </Row>
      )}
      {IsInfo && InfoVisible && (
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>{Title} </CardHeader>
              <CardBody>{Content}</CardBody>
            </Card>
          </Col>
        </Row>
      )}
      {!IsInfo && InfoVisible && (
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>
                각국의 해외입국자에 대한 조치 현황(국가 순서별)
              </CardHeader>
              <CardBody>정보가 없습니다.</CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </Page>
  );
};

export default SearchPage;
