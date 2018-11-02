
import React from 'react'
import { DrawerMenu } from 'layout/components'
import { compose, setDisplayName, pure } from 'recompose'

const enhance = compose(
  setDisplayName('layout/Layout'),
  pure
)
export default enhance(({
  drawerMenu,
  children
}) =>
  <div>
    <DrawerMenu {...drawerMenu} />
    {children}
  </div>
)
