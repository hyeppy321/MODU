import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import Auth from './hocs/auth';

const SearchPage = React.lazy(() => import('./components/views/SearchPage'));
const FavoritePage = React.lazy(() =>
  import('./components/views/FavoritePage'),
);
const InsightPage = React.lazy(() => import('./components/views/InsightPage'));
const WarningInfoPage = React.lazy(() =>
  import('./components/views/WarningInfoPage'),
);

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={Auth(InsightPage, null)} />
                <Route
                  exact
                  path="/search"
                  component={Auth(SearchPage, null)}
                />
                <Route
                  exact
                  path="/favorite"
                  component={Auth(FavoritePage, true)}
                />
                <Route
                  exact
                  path="/warning-info"
                  component={Auth(WarningInfoPage, null)}
                />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
