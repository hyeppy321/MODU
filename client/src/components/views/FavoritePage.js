import Page from 'components/Page';
import React, { useEffect } from 'react';

export const FavoritePage = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Page
      className="FavoritePage"
      title="Favorite"
      breadcrumbs={[{ name: 'Favorite', active: true }]}
    >
      저장 로그인하면 보이게
    </Page>
  );
};

export default FavoritePage;
