import Page from 'components/Page';
import React from 'react';
import { getColor } from 'utils/colors';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class FavoritePage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="FavoritePage"
        title="Favorite"
        breadcrumbs={[{ name: 'Favorite', active: true }]}
      >
        저장 로그인하면 보이게
      </Page>
    );
  }
}
export default FavoritePage;
