
import React from 'react'
import Form from './Form'
import { css } from 'aphrodite/no-important'
import tx from 'theme/utilities'
import { connect } from 'react-redux'
import { DashboardLayout } from 'layout'
import asyncConnect from 'helpers/asyncConnect'
import { getThemes } from 'redux/modules/themes/actions'
import { GET_THEMES } from 'redux/modules/themes/constants'
import { setDisplayName, mapProps } from 'recompose'
import { getTab, updateTab } from 'redux/modules/tabs/actions'
import { GET_TAB, UPDATE_TAB, CREATE_TAB } from 'redux/modules/tabs/constants'
import { Nav } from 'views/tab/settings'
import { Nav as TabNav } from 'views/tab'
import { UserDrawerNav } from 'elements'

export const displayName = 'view/tab/settings/Page'

@setDisplayName(displayName)
@asyncConnect(props => {
  const promises = [{ key: GET_THEMES, promise: getThemes }]
  const { tab } = props.match.params
  if (tab && tab !== 'create') {
    promises.push({ key: GET_TAB, promise: getTab, payload: { tab } })
  }
  return promises
})
@connect(
  ({
    tabs: { tab, tabIsNew },
    async: { statuses }
  }) => ({
    tab,
    tabIsNew,
    status: statuses[CREATE_TAB] || statuses[UPDATE_TAB]
  }),
  {
    updateTab
  }
)
@mapProps(props => {
  const mapped = { ...props }
  const tab = props.tab
  if (tab) {
    mapped.initialValues = {
      enable_processing_preference: tab.processing_preference === 'user',
      display_member_list: tab.display_member_list,
      display_total_collected: tab.display_total_collected,
      allow_offline_payments: tab.allow_offline_payments,
      offline_payment_instructions: tab.offline_payment_instructions
    }
  }
  return mapped
})

export default class Page extends React.PureComponent {
  handleSubmit (formData) {
    formData.processing_preference = formData.enable_processing_preference ? 'user' : 'member'
    const { updateTab, tab } = this.props

    const data = {
      ...tab,
      ...formData
    }

    if (tab && tab.id) {
      updateTab(data)
    }
  }

  render () {
    const { tab, initialValues } = this.props
    return (
      <DashboardLayout
        primarySidebar={{ tab, nav: <TabNav /> }}
        secondaryNavbar={{ tab }}
        drawerMenu={{ children: <UserDrawerNav /> }}
        secondarySidebar={{ tab, nav: <Nav /> }}>
        <div className={css(tx.p2)}>
          <h2 className={css(tx.pb2)}>
            Optional Settings
          </h2>
          <Form
            tab={tab}
            initialValues={initialValues}
            onSubmit={::this.handleSubmit} />
        </div>
      </DashboardLayout>
    )
  }
}
