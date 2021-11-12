import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../_actions/user_actions';
import { MdClearAll, MdExitToApp } from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';

function Header(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const bem = bn.create('header');
  const [State, setState] = useState({
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  });

  const logoutHandler = () => {
    dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        console.log('로그아웃성공!');
        window.localStorage.setItem('userId', '');
        window.localStorage.setItem('login', false);
        // props.history.push('/');
        document.location.href = '/';
      } else {
        alert('로그아웃을 실패했습니다.');
      }
    });
  };

  const toggleUserCardPopover = () => {
    setState({
      isOpenUserCardPopover: !State.isOpenUserCardPopover,
    });
  };

  const handleSidebarControlButton = () => event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  return (
    <Navbar light expand className={bem.b('bg-white')}>
      <Nav navbar className="mr-2">
        <Button outline onClick={handleSidebarControlButton()}>
          <MdClearAll size={25} />
        </Button>
      </Nav>
      {/* <Nav navbar>
          <SearchInput />
        </Nav> */}

      <Nav navbar className={bem.e('nav-right')}>
        {user.userData && user.userData.isAuth && (
          <NavItem>
            <NavLink id="Popover2">
              <Avatar onClick={toggleUserCardPopover} className="can-click" />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={State.isOpenUserCardPopover}
              toggle={toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title="USER"
                  subtitle={user.userData.email}
                  // text="Last updated 3 mins ago"
                  className="border-light"
                >
                  <ListGroup flush>
                    <ListGroupItem
                      tag="button"
                      onClick={logoutHandler}
                      className="border-light"
                    >
                      <MdExitToApp /> Signout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
}

export default Header;
