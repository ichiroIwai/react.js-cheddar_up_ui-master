
import React from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem } from 'elements'
import { compose, pure } from 'recompose'

const enhance = compose(
  connect(({ browser }) => ({ browser })),
  pure
)

export default enhance(props =>
  <Nav inline>
    <NavItem to='/signup'>
      Start Collecting
    </NavItem>
    <NavItem
      target='_blank'
      to={`${process.env.REACT_APP_RAILS_PATH}samples`}>
      Examples
    </NavItem>
    <NavItem
      target='_blank'
      to={`${process.env.REACT_APP_RAILS_PATH}plans`}>
      Plans
    </NavItem>
    <If condition={props.browser.lessThan.medium}>
      <NavItem to='/signup'>
        Sign Up Free
      </NavItem>
      <NavItem to='/login'>
        Log in
      </NavItem>
    </If>
  </Nav>
)
