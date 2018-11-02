
import React from 'react'
import { connect } from 'react-redux'
import { setDisplayName, compose, pure } from 'recompose'
import { change } from 'redux/modules/drawerMenu/actions'

const enhance = compose(
  setDisplayName('layout/components/DrawerMenuControl'),
  connect(
    ({ drawerMenu: { open } }) => ({ open }),
    { change }
  ),
  pure
)

export default enhance(({
  change,
  open,
  children,
  ...props
}) =>
  <div onClick={() => change({
    open: !open,
    ...props
  })}>
    {children}
  </div>
)
