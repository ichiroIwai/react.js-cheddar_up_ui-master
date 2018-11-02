
import React from 'react'
import { PrimarySidebarNav, PrimarySidebarNavItem } from 'layout/components'
import { tabsPathHelper } from 'helpers'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'

const enhance = compose(
  connect(({ tabs: { tab } }) => ({ tab })),
  pure
)

export default enhance(({ tab, column }) =>
  <PrimarySidebarNav column={column}>
    <PrimarySidebarNavItem
      label='Share Link'
      to={tabsPathHelper(tab, 'share/link')}
      imgSrc={require('theme/images/ShareLink.svg')} />
    <PrimarySidebarNavItem
      label='Invite'
      to={tabsPathHelper(tab, 'share/invite')}
      imgSrc={require('theme/images/Invite.svg')} />
    <PrimarySidebarNavItem
      label='Follow Up'
      to={tabsPathHelper(tab, 'share/follow-up')}
      imgSrc={require('theme/images/Followup.svg')} />
  </PrimarySidebarNav>
)
