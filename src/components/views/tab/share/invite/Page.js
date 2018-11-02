
import React from 'react'
import tx from 'theme/utilities'
import { setDisplayName, compose, pure } from 'recompose'
import { DashboardLayout } from 'layout'
import { asyncConnect } from 'helpers'
import { connect } from 'react-redux'
import { css } from 'aphrodite/no-important'
import { getTab } from 'redux/modules/tabs/actions'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { Nav as TabShareNav } from 'views/tab/share'
import Form from './Form'
import { UserDrawerNav } from 'elements'

const enhance = compose(
  setDisplayName('views/tab/share/invite/Page'),
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

export default enhance(({ tab, match }) =>
  <DashboardLayout
    primarySidebar={{ tab, nav: <TabShareNav match={match} /> }}
    secondaryNavbar={{ tab }}
    drawerMenu={{ children: <UserDrawerNav /> }}>
    <div className={css(tx.container, tx.p2)}>
      <h1 className={css(tx.pb2)}>
        Invite people to view your tab
      </h1>
      <Form onSubmit={() => ''} />
    </div>
  </DashboardLayout>
)
