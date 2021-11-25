import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import Page from 'components/Page';
import { features } from '../../assets/geo-data/countries.json';
import { IconWidget } from '../../components/Widget';
import WeatherWidget from '../Widget/WeatherWidget';
import TravleAlarmData from '../precleaning/TravelAlarmData';
import { Weather_URI, Weather_KEY } from '../Config';
import { MdCoronavirus, MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import {
  WiSolarEclipse,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiRain,
  WiDayLightning,
  WiSnow,
  WiFog,
} from 'weather-icons-react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

export const SearchPage = props => {
  const user = useSelector(state => state.user);
  const [Nation, setNation] = useState(features);
  const [ReturnType, setReturnType] = useState('JSON');
  const [NumOfRows, setNumOfRows] = useState(10);
  const [PageNo, setPageNo] = useState(1);
  const [CountryName, setCountryName] = useState(Nation[0].properties.NAME);
  const [CountryEnName, setCountryEnName] = useState(
    Nation[0].properties.ADMIN,
  );
  const [CountryIso, setCountryIso] = useState(Nation[0].properties.ISO_A2);
  const [Visible, setVisible] = useState(false);
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [CoronaInfo, setCoronaInfo] = useState([]);
  const [DefCnt, setDefCnt] = useState({});
  const [IsInfo, setIsInfo] = useState(true);
  const [WeatherInfo, setWeatherInfo] = useState({});
  const [IsFavorited, setIsFavorited] = useState(false);
  const WeatherIcon = {
    '01n': WiSolarEclipse,
    '02n': WiDayCloudy,
    '03n': WiCloud,
    '04n': WiCloudy,
    '09n': WiShowers,
    '10n': WiRain,
    '11n': WiDayLightning,
    '13n': WiSnow,
    '50n': WiFog,
    '01d': WiSolarEclipse,
    '02d': WiDayCloudy,
    '03d': WiCloud,
    '04d': WiCloudy,
    '09d': WiShowers,
    '10d': WiRain,
    '11d': WiDayLightning,
    '13d': WiSnow,
    '50d': WiFog,
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    Axios.get(`/api/info/Covid19Nat`).then(res => {
      if (res.data.success) {
        setCoronaInfo(res.data.data.body.response.body.items.item);
      }
    });
    if (props.location.name !== undefined) {
      init();
    }
  }, []);

  const init = () => {
    setCountryName(props.location.name);
  };

  const filterCnt = name => {
    CoronaInfo.filter(item => item.nationNm.indexOf(name) != -1).map(data => {
      if (name === data.nationNm) {
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
      }
    });
  };

  const onCountryNameHandler = event => {
    setCountryName(event.currentTarget.value);
  };

  const onChangeIsFavoritedHandler = () => {
    let data = {
      userFrom: localStorage.getItem('userId'),
      nationKrNm: CountryName,
      nationEnNm: CountryEnName,
      nationIso2: CountryIso,
    };
    if (!IsFavorited) {
      Axios.post(`/api/favorite/addToFavorite`, data).then(res => {
        if (res.data.success) {
          setIsFavorited(true);
        } else {
          alert('저장하지 못했습니다.');
        }
      });
    } else {
      Axios.post(`/api/favorite/removeFromFavorite`, data).then(res => {
        if (res.data.success) {
          setIsFavorited(false);
        }
      });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    setVisible(true);
    getArrivalsServiceInfo();
    filterCnt(CountryName);
    getWeatherInfo();
  };

  useEffect(() => {
    let data = {
      nationKrNm: CountryName,
      userFrom: localStorage.getItem('userId'),
    };
    if (user.userData && user.userData.isAuth) {
      Axios.post('/api/favorite/favorited', data).then(res => {
        if (res.data.success) {
          setIsFavorited(res.data.favorited);
        }
      });
    }
    const filterNameToIso = name => {
      features
        .filter(item => item.properties.NAME.indexOf(name) != -1)
        .map(data => {
          if (name === data.properties.NAME) {
            setCountryEnName(data.properties.ADMIN);
            setCountryIso(data.properties.ISO_A2);
          }
        });
    };
    filterNameToIso(CountryName);
  }, [CountryName]);

  const getWeatherInfo = () => {
    let endpointInfo2 = `${Weather_URI}?q=${CountryEnName}&appid=${Weather_KEY}`;
    Axios.get(endpointInfo2).then(res => {
      let tmp = {
        temp: Math.round(res.data.main.temp - 273.15),
        humidity: res.data.main.humidity,
        weather: res.data.weather[0].main,
        description: res.data.weather[0].description,
        icon: WeatherIcon[res.data.weather[0].icon],
        wind: res.data.wind.speed,
        cloud: res.data.clouds.all + '%',
      };
      setWeatherInfo(tmp);
    });
  };

  const getArrivalsServiceInfo = () => {
    let tmp = {
      CountryName,
      CountryIso,
    };
    Axios.post(`/api/info/ArrivalsService`, tmp).then(res => {
      if (res.data.success) {
        if (res.data.data.body.resultMsg == '정상') {
          if (res.data.data.body.data.length == 0) {
            setIsInfo(false);
          } else {
            setIsInfo(true);
            res.data.data.body.data.map(item => {
              setTitle(item.title);
              setContent(item.txt_origin_cn);
            });
          }
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
        <Col lg={12} md={12} sm={12} xs={12}>
              <Form inline className="cr-search-form" onSubmit={handleSubmit}>
              <InputGroup size="lg">
              <InputGroupAddon addonType="prepend">국가</InputGroupAddon>
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
                </InputGroup>
                &nbsp;&nbsp;&nbsp;
                <Button color="primary" onClick={handleSubmit} size="lg">
                  검색
                </Button>
              </Form>
        </Col>
        {user.userData && user.userData.isAuth && IsFavorited && (
          <Col>
            <Button
              outline
              onClick={onChangeIsFavoritedHandler}
              color="secondary"
            >
              <MdFavorite size={30} />
            </Button>
          </Col>
        )}
        {user.userData && user.userData.isAuth && !IsFavorited && (
          <Col>
            <Button
              outline
              onClick={onChangeIsFavoritedHandler}
              color="secondary"
            >
              <MdFavoriteBorder size={30} />
            </Button>
          </Col>
        )}
      </Row>
      {IsInfo && Visible && (
        <Row>
          <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
            <IconWidget
              bgColor={'secondary'}
              icon={MdCoronavirus}
              title="코로나 확진자 수"
              subtitle={DefCnt.natDefCnt + '명'}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
            <IconWidget
              bgColor={'secondary'}
              icon={MdCoronavirus}
              title="코로나 사망자 수"
              subtitle={DefCnt.natDeathCnt + '명'}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
            <WeatherWidget
              bgColor={'secondary'}
              icon={WeatherInfo.icon}
              info={WeatherInfo}
            />
          </Col>
          <TravleAlarmData nation={CountryName} />
        </Row>
      )}
      {IsInfo && Visible && (
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>각국의 해외입국자에 대한 조치 현황 </CardHeader>
              <CardBody>{Content}</CardBody>
            </Card>
          </Col>
        </Row>
      )}
      {!IsInfo && Visible && (
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>각국의 해외입국자에 대한 조치 현황</CardHeader>
              <CardBody>정보가 없습니다.</CardBody>
            </Card>
          </Col>
        </Row>
      )}

    </Page>
  );
};

export default SearchPage;
