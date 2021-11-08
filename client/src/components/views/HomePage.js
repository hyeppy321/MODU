import Page from 'components/Page';
import React, { useEffect } from 'react';
import Axios from 'axios';

export const HomePage = props => {
  useEffect(() => {
    window.scrollTo(0, 0);

    Axios.get('/api/users/info').then(response => {
      console.log(response.data);
    });
  }, []);
  return (
    <Page
      className="HomePage"
      title="Home"
      breadcrumbs={[{ name: '', active: true }]}
    >
      홈
    </Page>
  );
};

export default HomePage;
