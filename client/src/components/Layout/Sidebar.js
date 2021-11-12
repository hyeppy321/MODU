import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  MdAccountCircle,
  MdArrowDropDownCircle,
  MdBorderAll,
  MdBrush,
  MdChromeReaderMode,
  MdDashboard,
  MdExtension,
  MdGroupWork,
  MdInsertChart,
  MdKeyboardArrowDown,
  MdNotificationsActive,
  MdPages,
  MdRadioButtonChecked,
  MdSend,
  MdStar,
  MdTextFields,
  MdViewCarousel,
  MdViewDay,
  MdViewList,
  MdWeb,
  MdWidgets,
  MdFavorite,
  MdSearch,
  MdAirplanemodeActive,
  MdPanTool,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

function Sidebar(props) {
  const user = useSelector(state => state.user);
  const sidebarBackground = {
    backgroundImage: `url("${sidebarBgImage}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const navComponents = [
    {
      to: '/buttons',
      name: 'buttons',
      exact: false,
      Icon: MdRadioButtonChecked,
    },
    {
      to: '/button-groups',
      name: 'button groups',
      exact: false,
      Icon: MdGroupWork,
    },
    { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
    {
      to: '/input-groups',
      name: 'input groups',
      exact: false,
      Icon: MdViewList,
    },
    {
      to: '/dropdowns',
      name: 'dropdowns',
      exact: false,
      Icon: MdArrowDropDownCircle,
    },
    { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
    {
      to: '/alerts',
      name: 'alerts',
      exact: false,
      Icon: MdNotificationsActive,
    },
    { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
    { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
  ];

  const navContents = [
    { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
    { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
  ];

  const pageContents = [
    {
      to: '/login',
      name: 'login / signup',
      exact: false,
      Icon: MdAccountCircle,
    },
  ];

  const navItems = [
    { to: '/', name: 'insight', exact: true, Icon: MdAirplanemodeActive },
    { to: '/search', name: 'search', exact: true, Icon: MdSearch },
    // { to: '/warning-info', name: 'WarningInfo', exact: true, Icon: MdPanTool },
    // { to: '/dashboard', name: 'dashboard', exact: true, Icon: MdDashboard },
    // { to: '/cards', name: 'cards', exact: false, Icon: MdWeb },
    // { to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
    // { to: '/widgets', name: 'widgets', exact: false, Icon: MdWidgets },
  ];
  const navItemsLogin = [
    { to: '/favorite', name: 'favorite', exact: true, Icon: MdFavorite },
  ];
  const navItemsLogout = [
    {
      to: '/login',
      name: 'login / signup',
      exact: false,
      Icon: MdAccountCircle,
    },
  ];

  const bem = bn.create('sidebar');
  const [State, setState] = useState({
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  });

  const handleClick = name => () => {
    setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  return (
    <aside className={bem.b()} data-image={sidebarBgImage}>
      <div className={bem.e('background')} style={sidebarBackground} />
      <div className={bem.e('content')}>
        <Navbar>
          <SourceLink className="navbar-brand d-flex">
            {/* <img
              src={logo200Image}
              width="40"
              height="30"
              className="pr-2"
              alt=""
            /> */}
            <span className="text-white">여행 다모아</span>
          </SourceLink>
        </Navbar>
        <Nav vertical>
          {navItems.map(({ to, name, exact, Icon }, index) => (
            <NavItem key={index} className={bem.e('nav-item')}>
              <BSNavLink
                id={`navItem-${name}-${index}`}
                className="text-uppercase"
                tag={NavLink}
                to={to}
                activeClassName="active"
                exact={exact}
              >
                <Icon className={bem.e('nav-item-icon')} />
                <span className="">{name}</span>
              </BSNavLink>
            </NavItem>
          ))}
          {user.userData &&
            user.userData.isAuth &&
            navItemsLogin.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          {user.userData &&
            !user.userData.isAuth &&
            navItemsLogout.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          {/* <NavItem
            className={bem.e('nav-item')}
            onClick={handleClick('Components')}
          >
            <BSNavLink className={bem.e('nav-item-collapse')}>
              <div className="d-flex">
                <MdExtension className={bem.e('nav-item-icon')} />
                <span className=" align-self-start">Components</span>
              </div>
              <MdKeyboardArrowDown
                className={bem.e('nav-item-icon')}
                style={{
                  padding: 0,
                  transform: State.isOpenComponents
                    ? 'rotate(0deg)'
                    : 'rotate(-90deg)',
                  transitionDuration: '0.3s',
                  transitionProperty: 'transform',
                }}
              />
            </BSNavLink>
          </NavItem>
          <Collapse isOpen={State.isOpenComponents}>
            {navComponents.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Collapse>

          <NavItem
            className={bem.e('nav-item')}
            onClick={handleClick('Contents')}
          >
            <BSNavLink className={bem.e('nav-item-collapse')}>
              <div className="d-flex">
                <MdSend className={bem.e('nav-item-icon')} />
                <span className="">Contents</span>
              </div>
              <MdKeyboardArrowDown
                className={bem.e('nav-item-icon')}
                style={{
                  padding: 0,
                  transform: State.isOpenContents
                    ? 'rotate(0deg)'
                    : 'rotate(-90deg)',
                  transitionDuration: '0.3s',
                  transitionProperty: 'transform',
                }}
              />
            </BSNavLink>
          </NavItem>
          <Collapse isOpen={State.isOpenContents}>
            {navContents.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Collapse>

          <NavItem className={bem.e('nav-item')} onClick={handleClick('Pages')}>
            <BSNavLink className={bem.e('nav-item-collapse')}>
              <div className="d-flex">
                <MdPages className={bem.e('nav-item-icon')} />
                <span className="">Pages</span>
              </div>
              <MdKeyboardArrowDown
                className={bem.e('nav-item-icon')}
                style={{
                  padding: 0,
                  transform: State.isOpenPages
                    ? 'rotate(0deg)'
                    : 'rotate(-90deg)',
                  transitionDuration: '0.3s',
                  transitionProperty: 'transform',
                }}
              />
            </BSNavLink>
          </NavItem>
          <Collapse isOpen={State.isOpenPages}>
            {pageContents.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Collapse> */}
        </Nav>
      </div>
    </aside>
  );
}

export default Sidebar;
