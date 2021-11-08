import Page from 'components/Page';
import React, { useEffect } from 'react';
import Axios from 'axios';

export const InsightPage = props => {
  useEffect(() => {
    window.scrollTo(0, 0);

    let dataToSubmit = {
      encodedKey:
        'r1%2FX7uK7cJ0DtLUvgK%2F9c95mWzoTl6toUTh7YKCij2%2BGRd8OaBD%2FjNqTcjoxP8uJTshSyggHh4ZIBjXCk1qGYA%3D%3D',
      decodedKey:
        'r1/X7uK7cJ0DtLUvgK/9c95mWzoTl6toUTh7YKCij2+GRd8OaBD/jNqTcjoxP8uJTshSyggHh4ZIBjXCk1qGYA==',
      returnType: 'JSON',
      numOfRows: 10,
      pageNo: 1,
      country_nm: '캐나다',
      country_iso: 'CA',
    };

    Axios.post('/api/users/info', dataToSubmit).then(response => {
      console.log(response.data);
    });
  }, []);
  return (
    <Page
      className="InsightPage"
      title="Insight"
      breadcrumbs={[{ name: 'Insight', active: true }]}
    >
      홈
    </Page>
  );
};

export default InsightPage;
