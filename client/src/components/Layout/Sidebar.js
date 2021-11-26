import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import logo from '../../assets/img/logo/logo.png';
import SourceLink from 'components/SourceLink';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  MdAccountCircle,
  MdFavorite,
  MdSearch,
  MdAirplanemodeActive,
  MdPanTool,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavLink as BSNavLink } from 'reactstrap';
import bn from 'utils/bemnames';

function Sidebar(props) {
  const user = useSelector(state => state.user);
  const sidebarBackground = {
    backgroundImage: `url("${sidebarBgImage}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const navItems = [
    { to: '/', name: '코로나 상황판', exact: true, Icon: MdAirplanemodeActive },
    { to: '/search', name: '국가 여행 정보', exact: true, Icon: MdSearch },
    { to: '/warning-info', name: '여행 경보', exact: true, Icon: MdPanTool },
  ];
  const navItemsLogin = [
    { to: '/favorite', name: '찜한 국가', exact: true, Icon: MdFavorite },
  ];
  const navItemsLogout = [
    {
      to: '/login',
      name: '로그인/회원가입',
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

  return (
    <aside className={bem.b()} data-image={sidebarBgImage}>
      <div className={bem.e('background')} style={sidebarBackground} />
      <div className={bem.e('content')}>
        <Navbar>
          <SourceLink className="navbar-brand d-flex">
            <img src={logo} width="40" height="30" className="pr-2" alt="" />
            <span className="text-white">MODU</span>
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
        </Nav>
      </div>
    </aside>
  );
}

export default Sidebar;
