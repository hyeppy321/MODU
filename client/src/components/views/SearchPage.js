import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import moment from 'moment';
import Page from 'components/Page';
import { features } from '../../assets/geo-data/countries.json';
import { visitors } from '../../assets/geo-data/visitorsList.json';
import { IconWidget } from '../../components/Widget';
import WeatherWidget from '../Widget/WeatherWidget';
import TravleAlarmData from '../precleaning/TravelAlarmData';
import VisitorsBar from '../chart/VisitorsBar';
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
  const [Alarm, setAlarm] = useState();
  const [visitorsList, setvisitorsList] = useState([]);

  let nowddd = moment().format('ddd');
  let nowHH = moment().format('HH');
  let sysToday = moment().format('YYYYMMDD');
  let sysYesterday = moment().subtract(1, 'days').format('YYYYMMDD');

  useEffect(() => {
    window.scrollTo(0, 0);
    load();
  }, []);

  const init = () => {
    setCountryName(props.location.name);
    setAlarm(props.location.name);
  };

  const load = async () => {
    const result = getDay();
    const today = result[0];
    const yesterday = result[1];

    // let resY = await Axios.get(`api/info/YesterdayCovid19Nat/${yesterday}`);
    let yesterdayDefcnt = '';
    await Axios.get(`api/info/YesterdayCovid19Nat/${yesterday}`).then(res => {
      yesterdayDefcnt = res.data.data.body.response.body.items.item;
    });

    // let resT = await Axios.get(`api/info/TodayCovid19Nat/${today}`);
    let todayDefcnt = '';
    Axios.get(`api/info/TodayCovid19Nat/${today}`).then(res => {
      todayDefcnt = res.data.data.body.response.body.items.item;
      getOnedayDefcnt(todayDefcnt, yesterdayDefcnt);
    });

    if (props.location.name !== undefined) {
      init();
    }
  };

  const getDay = () => {
    let t = '';
    let y = '';
    if (nowddd == 'Sun') {
      t = moment(sysToday).subtract(1, 'days').format('YYYYMMDD');
      y = moment(sysYesterday).subtract(1, 'days').format('YYYYMMDD');
    } else if (nowddd == 'Mon') {
      t = moment(sysToday).subtract(2, 'days').format('YYYYMMDD');
      y = moment(sysYesterday).subtract(2, 'days').format('YYYYMMDD');
    } else if (nowddd == 'Tue' && nowHH < 12) {
      t = moment(sysToday).subtract(3, 'days').format('YYYYMMDD');
      y = moment(sysYesterday).subtract(3, 'days').format('YYYYMMDD');
    } else if (nowddd == 'Tue' && nowHH >= 12) {
      t = sysToday;
      y = moment(sysYesterday).subtract(2, 'days').format('YYYYMMDD');
    } else if (nowddd == 'Wed' && nowHH < 12) {
      t = moment(sysToday).subtract(1, 'days').format('YYYYMMDD');
      y = moment(sysYesterday).subtract(3, 'days').format('YYYYMMDD');
    } else if (nowHH < 12) {
      t = moment(sysToday).subtract(1, 'days').format('YYYYMMDD');
      y = moment(sysYesterday).subtract(1, 'days').format('YYYYMMDD');
    } else {
      t = sysToday;
      y = sysYesterday;
    }
    return [t, y];
  };

  const getOnedayDefcnt = (todayDefcnt, yesterdayDefcnt) => {
    todayDefcnt.map((item, index) => {
      todayDefcnt[index] = {
        ...todayDefcnt[index],
        todayNatDefCnt: item.natDefCnt - yesterdayDefcnt[index].natDefCnt,
        todayNatDeathCnt: item.natDeathCnt - yesterdayDefcnt[index].natDeathCnt,
      };
    });
    setCoronaInfo(todayDefcnt);
  };

  const filterCheck = nation => {
    let arr = [];
    visitors
      .filter(item => item.name.indexOf(nation) != -1)
      .map(data => {
        if (nation === data.name) {
          arr = data.num;
          // setvisitorsList(data.num);
        }
      });
    setvisitorsList(arr);
  };

  const filterCnt = name => {
    CoronaInfo.filter(item => item.nationNm.indexOf(name) != -1).map(data => {
      if (name === data.nationNm) {
        let tmp = {
          natDefCnt: data.todayNatDefCnt,
          natDeathRate: {
            value: Math.round(data.natDeathRate),
            label: '사망률',
          },
          natDeathCnt: data.todayNatDeathCnt,
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
    setVisible(false);
    await getArrivalsServiceInfo();
    filterCnt(CountryName);
    filterCheck(CountryName);
    getWeatherInfo();
    setAlarm(CountryName);
    setVisible(true);
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
    let enName = CountryEnName;
    if (CountryEnName === 'Hong Kong S.A.R.') {
      enName = 'HongKong';
    }
    let endpointInfo2 = `${Weather_URI}?q=${enName}&appid=${Weather_KEY}`;
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
      title="국가 여행 정보"
      description="국가별 코로나상황과 현재날씨,특별여행경보단계,입국자 조치현황을 제공합니다."
      breadcrumbs={[{ name: 'Search', active: true }]}
    >
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Form inline className="cr-search-form" onSubmit={handleSubmit}>
            <Col sm={7}>
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
            </Col>
            &nbsp;&nbsp;&nbsp;
            <Button color="primary" onClick={handleSubmit} size="lg">
              검색
            </Button>
            &nbsp;&nbsp;&nbsp;
            {user.userData && user.userData.isAuth && IsFavorited && (
              <Button
                outline
                onClick={onChangeIsFavoritedHandler}
                color="secondary"
              >
                <MdFavorite size={30} />
              </Button>
            )}
            {user.userData && user.userData.isAuth && !IsFavorited && (
              <Button
                outline
                onClick={onChangeIsFavoritedHandler}
                color="secondary"
              >
                <MdFavoriteBorder size={30} />
              </Button>
            )}
          </Form>
        </Col>
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
          <TravleAlarmData nation={Alarm} />
        </Row>
      )}
      {IsInfo && Visible && visitorsList.length !== 0 && (
        <Row>
          <VisitorsBar nation={Alarm} visitorsList={visitorsList} />
        </Row>
      )}
      {IsInfo && Visible && (
        <Row>
          <Col>
            <Card className="mb-3" style={{ whiteSpace: 'pre-wrap' }}>
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
