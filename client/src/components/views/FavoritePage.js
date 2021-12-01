import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  FormGroup,
} from 'reactstrap';
import Pagination from '../../utils/Pagination';
import { paginate } from '../../utils/paginate';

import CovidRateCnt from '../chart/CovidRateCnt';
import TravleAlarmData2 from '../precleaning/TravelAlarmData2';

import { Weather_URI, Weather_KEY } from '../Config';
import WeatherWidget from '../Widget/WeatherWidget';
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

function FavoritePage(props) {
  const userId = localStorage.getItem('userId');
  const [Favorites, setFavorites] = useState([]);
  const [Count, setCount] = useState(0);
  const [CP, setCP] = useState(1);
  const [Comp, setComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [submitItem, setsubmitItem] = useState([]);
  const [checkedItemsE, setCheckedItemsE] = useState(new Set());
  const [submitItemW, setsubmitItemW] = useState([]);
  const [WeatherInfo, setWeatherInfo] = useState([]);

  const [cnt, setcnt] = useState(0);
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
    getFavored();
  }, []);

  const getFavored = () => {
    Axios.post(`/api/favorite/getFavored`, { userFrom: userId }).then(res => {
      if (res.data.success) {
        setFavorites({
          data: res.data.favorites,
          pageSize: 5,
          currentPage: CP,
        });
        setCount(res.data.favorites.length);
      } else {
        alert('데이터를 가져오는데 실패했습니다.');
      }
    });
  };

  const onClickHandler = nation => event => {
    console.log(nation);
  };

  const handlePageChange = page => {
    setCP(page);
    setFavorites({ ...Favorites, currentPage: page });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    let tmp = [];
    let tmp2 =[];
    for (let i of checkedItems) {
      let words = i.split(',');
      tmp = [...tmp, words[0]];
      tmp2 = [...tmp2, words[1]];
    }
    await setsubmitItem(tmp);
    await setsubmitItemW(tmp2);
    setComp(false);
    setComp(true);
  };

  const checkHandler = ({ target }) => {
    // for (let i of checkedItems) {
    //   console.log(i);
    // }
    let id = target.value;
    let isChecked = target.checked;
    if (isChecked && cnt < 2) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
      setcnt(cnt + 1);
      //console.log(id, 'checked', cnt);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
      setcnt(cnt - 1);
      //console.log(id, 'unchecked', cnt);
    } else {
      target.checked = false;
    }
  };

  const getWeatherInfo = (item) => {
    let enName = item;
    //console.log(item);
    if (item=== 'Hong Kong S.A.R.') {
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
      //console.log(tmp);
      setWeatherInfo((prevState) => [...prevState, tmp]);
    });
  };

  useEffect(() => {
    submitItemW.map(item => {
      getWeatherInfo(item);
      //console.log(item);
    })
  },[submitItemW]);

  const { data, pageSize, currentPage } = Favorites;
  const pagedFavorites = paginate(data, currentPage, pageSize);

  if (Count === 0) {
    return (
      <Page
        title="Favorite"
        breadcrumbs={[{ name: 'favorite', active: true }]}
        className="TablePage"
      >
        저장한 정보가 없습니다.
      </Page>
    );
  } else {
    return (
      <Page
        title="Favorite"
        description="찜한 국가의 여행정보를 쉽게 확인할 수 있는 검색기능과 국가 간 비교기능을 제공합니다."
        breadcrumbs={[{ name: 'favorite', active: true }]}
        className="TablePage"
      >
        <FormGroup>
          <Button color="primary" onClick={handleSubmit} size="lg">
            비교하기
          </Button>
        </FormGroup>
        <Row>
          <Col>
            <Card className="mb-3">
              {/* <CardHeader>저장한 나라</CardHeader>
               */}
              <CardBody>
                <Table hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>국가명</th>
                      <th>국가명(영문)</th>
                      <th>국가코드</th>
                      <th>검색버튼</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 여기서 맵으로 뿌려  */}
                    {pagedFavorites.map((data, index) => {
                      let tmp = {
                        name: data.nationKrNm,
                        iso: data.nationIso2,
                      };
                      return (
                        <tr
                          key={index}
                          // onClick={onClickHandler(data.nationKrNm)}
                        >
                          <th scope="row">{index + 1}</th>
                          <td>{data.nationKrNm}</td>
                          <td>{data.nationEnNm}</td>
                          <td>{data.nationIso2}</td>
                          <td>
                            <Link
                              to={{
                                pathname: '/search',
                                name: `${data.nationKrNm}`,
                              }}
                            >
                              search
                            </Link>
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              value={data.nationKrNm + ' ' + data.nationIso2 + ',' + data.nationEnNm}
                              onChange={e => checkHandler(e)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Pagination
                  pageSize={pageSize}
                  itemsCount={Count}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* 출국자 수 비교 5일치 */}
        {/* 도넛차트 - 확진자 비율 */}
        {Comp && (
          <Row>
            {submitItem.map(item => {
              return <CovidRateCnt data={item} />;
            })}
          </Row>
        )}
        {/* 여행 경보 단계 */}
        {Comp && (
          <Row>
            {submitItem.map(item => {
              let tmp = item.split(' ');
              return <TravleAlarmData2 nation={tmp[0]} />;
            })}
          </Row>
        )}
        {/* 날씨 위젯 */}
        {Comp && (
          <Row>
            {WeatherInfo.map(item => {
              return(
              <Col xl={6} lg={12} md={12} className="mb-3">
              <WeatherWidget
                bgColor={'secondary'}
                icon={item.icon}
                info={item}
              />
            </Col>);
            })}
          </Row>
        )}
      </Page>
    );
  }
}

export default FavoritePage;
