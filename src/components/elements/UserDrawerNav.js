
import React from 'react'
import { Nav, NavItem } from 'elements'

export default () =>
  <Nav>
    <NavItem to='/tabs'>
      My Tabs
    </NavItem>
    <NavItem
      target='_blank'
      to={`${process.env.REACT_APP_RAILS_PATH}user/edit`}>
      My Account
    </NavItem>
    <NavItem
      target='_blank'
      to={`${process.env.REACT_APP_RAILS_PATH}user/withdrawal_info/edit`}>
      Withdrawal Settings
    </NavItem>
    <NavItem to='/payment-history'>
      Payment History
    </NavItem>
    <NavItem
      target='_blank'
      to={`${process.env.REACT_APP_RAILS_PATH}faqs`}>
      Support
    </NavItem>
    <NavItem to='/logout'>
      Log Out
    </NavItem>
  </Nav>
