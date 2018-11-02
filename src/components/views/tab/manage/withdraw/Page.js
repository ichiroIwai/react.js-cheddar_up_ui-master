
import React from 'react'
import tx from 'theme/utilities'
import { css } from 'aphrodite/no-important'
import { Nav as TabNav } from 'views/tab'
import { Nav as ManageTabNav } from 'views/tab/manage'
import { DashboardLayout } from 'layout'
import { PageTitle } from 'layout/components'
import { compose, pure } from 'recompose'
import { asyncConnect } from 'helpers'
import { connect } from 'react-redux'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { getTab } from 'redux/modules/tabs/actions'
import { UserDrawerNav } from 'elements'

const enhance = compose(
  asyncConnect(props => {
    const promises = []
    const { tab } = props.match.params
    if (tab && tab !== 'create') {
      promises.push({ key: GET_TAB, promise: getTab, payload: { tab } })
    }
    return promises
  }),
  connect(({ tabs: { tab } }) => ({ tab })),
  pure
)

export default enhance(({ tab }) =>
  <DashboardLayout
    primarySidebar={{ tab, nav: <TabNav /> }}
    secondaryNavbar={{ tab }}
    drawerMenu={{ children: <UserDrawerNav /> }}
    secondarySidebar={{ tab, nav: <ManageTabNav /> }}>
    <div className={css(tx.px2)}>
      <PageTitle>Hey</PageTitle>
    </div>
  </DashboardLayout>
)
