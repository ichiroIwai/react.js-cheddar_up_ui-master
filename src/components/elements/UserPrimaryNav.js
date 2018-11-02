
import React from 'react'
import { Nav, NavItem } from 'elements'

export default () =>
  <Nav inline>
    <NavItem to='/tabs'>
      My Tabs
    </NavItem>
    <NavItem
      target='_blank'
      to={`${process.env.REACT_APP_RAILS_PATH}samples`}>
      Examples
    </NavItem>
    <NavItem to='/upgrade'>
      Upgrade
    </NavItem>
  </Nav>
