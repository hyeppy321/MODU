import Page from 'components/Page';
import React from 'react';
import { getColor } from 'utils/colors';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class HomePage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="HomePage"
        title="Home"
        breadcrumbs={[{ name: 'Home', active: true }]}
      >
        홈
      </Page>
    );
  }
}
export default HomePage;
