import Page from 'components/Page';
import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

function FavoritePage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Page
      title="Favorite"
      breadcrumbs={[{ name: 'favorite', active: true }]}
      className="TablePage"
    >
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>저장한 나라</CardHeader>
            <CardBody>
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>국가명</th>
                    <th>국가명(영문)</th>
                    <th>국가코드</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 여기서 맵으로 뿌려  */}
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
}

export default FavoritePage;
