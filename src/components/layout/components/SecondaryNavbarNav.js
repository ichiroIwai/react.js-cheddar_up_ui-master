
import React from 'react'
import { get } from 'lodash'
import { Nav } from 'elements'
import { withMatch, tabsPathHelper } from 'helpers'
import { compose, mapProps, pure } from 'recompose'
import { SecondaryNavbarNavItem } from 'layout/components'
import { withRouter } from 'react-router'

const enhance = compose(
  withRouter,
  withMatch,
  mapProps(props => {
    const matchUrl = get(props, 'match.url', '')
    const shareUrlMatch = matchUrl.indexOf('/share') > -1
    const manageUrlMatch = matchUrl.indexOf('/manage') > -1
    const buildUrlMatch = !shareUrlMatch && !manageUrlMatch
    return {
      ...props,
      buildUrlMatch,
      manageUrlMatch,
      shareUrlMatch,
      disabled: !get(props, 'tab.id')
    }
  }),
  pure
)

export default enhance(({
  tab,
  disabled,
  shareUrlMatch,
  buildUrlMatch,
  manageUrlMatch
}) =>
  <Nav inline>
    <SecondaryNavbarNavItem
      to={tabsPathHelper(tab)}
      active={buildUrlMatch}>
      Build
    </SecondaryNavbarNavItem>
    <SecondaryNavbarNavItem
      disabled={disabled}
      to={tabsPathHelper(tab, 'share')}
      active={shareUrlMatch}>
      Share
    </SecondaryNavbarNavItem>
    <SecondaryNavbarNavItem
      disabled={disabled}
      to={tabsPathHelper(tab, 'manage')}
      active={manageUrlMatch}>
      Manage
    </SecondaryNavbarNavItem>
  </Nav>
)
