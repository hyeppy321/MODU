import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, Form, Input, Button, FormGroup } from 'reactstrap';
import Pagination from '../../utils/Pagination';
import { paginate } from '../../utils/paginate';

function FavoritePage(props) {
  const userId = localStorage.getItem('userId');
  const [Favorites, setFavorites] = useState([]);
  const [Count, setCount] = useState(0);
  const [CP, setCP] = useState(1);
  const [Comp, setComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  let cnt = 0;

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
    setComp(true);
  };

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
      cnt++;
      console.log(id, "checked", cnt);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
      cnt--;
      console.log(id, "unchecked", cnt);
    }

    if(isChecked && cnt>2){
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
      cnt--;
      console.log(id, "over", cnt);
    }
  };

  const checkHandler = ({ target }) => {
    let id = target.value;
    let isChecked = target.checked;
    if (isChecked && cnt<2) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
      cnt++;
      console.log(id, "checked", cnt);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
      cnt--;
      console.log(id, "unchecked", cnt);
    } else{
      target.checked=false;
    }
  };

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
        description= "찜한 국가의 여행정보를 쉽게 확인할 수 있는 검색기능과 국가 간 비교기능을 제공합니다."
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
                          <input type="checkbox" value={data.nationKrNm} onChange={(e) => checkHandler(e)} />
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
        {Comp && (
        'ㅇㅇㅇㅇㅇ'
      )}
      </Page>
    );
  }
}

export default FavoritePage;
