
import React from 'react'
import { get } from 'lodash'
import { PrimarySidebarNav, PrimarySidebarNavItem } from 'layout/components'
import { tabsPathHelper } from 'helpers'
import { connect } from 'react-redux'
import { mapProps, compose, pure } from 'recompose'

const enhance = compose(
  connect(({ tabs: { tab } }) => ({ tab })),
  mapProps(props => ({
    ...props,
    disabled: !get(props, 'tab.id')
  })),
  pure
)

export default enhance(({ disabled, tab, column }) =>
  <PrimarySidebarNav column={column}>
    <PrimarySidebarNavItem
      to={tabsPathHelper(tab, 'details')}
      label='Details'
      imgSrc={require('theme/images/DetailsIcon.svg')} />
    <PrimarySidebarNavItem
      disabled={disabled}
      to={tabsPathHelper(tab, 'items')}
      label='Items'
      imgSrc={require('theme/images/ItemsIcon.svg')} />
    <PrimarySidebarNavItem
      disabled={disabled}
      to={tabsPathHelper(tab, 'forms')}
      label='Forms'
      imgSrc={require('theme/images/FormsIcon.svg')} />
    <PrimarySidebarNavItem
      disabled={disabled}
      to={tabsPathHelper(tab, 'settings')}
      label='Settings'
      imgSrc={require('theme/images/SettingsIcon.svg')} />
  </PrimarySidebarNav>
)
