import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Row,
  Table,
  Button,
  FormGroup,
  CardHeader,
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
  const [Content, setContent] = useState([]);

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
    await setContent([]);
    await setWeatherInfo([]);
    await setsubmitItem(tmp);
    await setsubmitItemW(tmp2);
    setComp(false);
    setComp(true);
  };

  const checkHandler = ({ target }) => {
    let id = target.value;
    let isChecked = target.checked;
    if (isChecked && cnt < 2) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
      setcnt(cnt + 1);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
      setcnt(cnt - 1);
    } else {
      target.checked = false;
    }
  };

  const getWeatherInfo = (item) => {
    let enName = item;
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
      setWeatherInfo((prevState) => [...prevState, tmp]);
      if(WeatherInfo.length==2){
        let tmp2 = submitItem[1].split(' ');
        if(tmp2[0]!=enName){
          let n = WeatherInfo[0];
          WeatherInfo[0]=WeatherInfo[1];
          WeatherInfo[1]=n;
        }
      }
    });
  };

  useEffect(() => {
    submitItemW.map(item => {
      getWeatherInfo(item);
    })
  },[submitItemW]);

  useEffect(() => {
    let tmp = [];
    for (let i of submitItem) {
      let words = i.split(' ');
      tmp = [...tmp, {CountryName:words[0],CountryIso:words[1]}];
    }
    tmp.map((item)=>{
      Axios.post(`/api/info/ArrivalsService`, item).then(res => {
        if (res.data.success) {
          if (res.data.data.body.resultMsg == '정상') {
            if (res.data.data.body.data.length == 0) {
              setContent((prevState)=>[...prevState, '정보가 없습니다.']);
            } else {
              res.data.data.body.data.map(item => {
                setContent((prevState)=>[...prevState, item.txt_origin_cn]);
                if(Content.length==2){
                  let tmp2 = submitItem[0].split(' ');
                  if(tmp2[0]!=Content[0].CountryName){
                    let n = Content[0];
                    Content[0]=Content[1];
                    Content[1]=n;
                  }
                }
              });
            }
          }
        }
      });
    })
  },[submitItem]);

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
        description="찜한 국가의 여행정보를 쉽게 확인할 수 있는 검색 기능과 국가 간 비교 기능을 제공합니다."
        breadcrumbs={[{ name: 'favorite', active: true }]}
        className="TablePage"
      >
        <Row>
          <Col>
            <Card className="mb-3">
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
                    {pagedFavorites.map((data, index) => {
                      let tmp = {
                        name: data.nationKrNm,
                        iso: data.nationIso2,
                      };
                      return (
                        <tr
                          key={index}
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
              <CardFooter>
                <Row>
                  <Col md={{ span: 6, offset: 3 }}>
                      <small className="text-muted">
                      비교하고 싶은 두 국가를 선택하여, 출입국 현황과 확진자 비율을 차트로 확인해 보세요.&nbsp;&nbsp;
                      </small>
                      <Button color="primary" onClick={handleSubmit}>
                        비교하기
                      </Button>
                  </Col>
                </Row>
              </CardFooter>

            </Card>
          </Col>
        </Row>
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
                bgColor={'pink'}
                icon={item.icon}
                info={item}
              />
            </Col>);
            })}
          </Row>
        )}
        {Comp && (
          <Row>
            {Content.map(item=>{
              return(
                <Col>
                <Card className="mb-3" style={{ whiteSpace: 'pre-wrap' }}>
                  <CardHeader tag="h5">각국의 해외 입국자에 대한 조치 현황 </CardHeader>
                  <CardBody>{item}</CardBody>
                </Card>
              </Col>
              );
            })}
        </Row>
        )}
      </Page>
    );
  }
}

export default FavoritePage;
