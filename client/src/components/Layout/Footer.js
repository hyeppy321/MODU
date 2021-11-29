import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          @2021 Hyebin Lee, Chanbi Bae, Yeongin Jang source on 
          <a href="https://github.com/hye-ppy/TravleingWithCorona"> Github</a>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
