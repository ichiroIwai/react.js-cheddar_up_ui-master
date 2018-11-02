
import React from 'react'
import { PanelOverlay } from 'layout/components'
import DashboardLayout from './DashboardLayout'
import { compose, pure, setDisplayName } from 'recompose'

const enhance = compose(
  setDisplayName('layout/PanelOverlayLayout'),
  pure
)

export default enhance(({ children, ...props }) =>
  <DashboardLayout
    {...props}
    panelOverlay={
      <PanelOverlay>
        {children}
      </PanelOverlay>
    } />
)
