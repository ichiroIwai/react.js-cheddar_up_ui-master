
import React from 'react'
import Form from './Form'
import { css } from 'aphrodite'
import tx from 'theme/utilities'
import { connect } from 'react-redux'
import { DashboardLayout } from 'layout'
import asyncConnect from 'helpers/asyncConnect'
import { getThemes } from 'redux/modules/themes/actions'
import { GET_THEMES } from 'redux/modules/themes/constants'
import { setDisplayName } from 'recompose'
import { getTab, updateTab, createTab } from 'redux/modules/tabs/actions'
import { GET_TAB, UPDATE_TAB, CREATE_TAB } from 'redux/modules/tabs/constants'
import { Nav as TabNav } from 'views/tab'
import { UserDrawerNav } from 'elements'

@setDisplayName('views/tab/details/Page')
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
    tabs: { tab, tabIsNew, imageId },
    async: { statuses }
  }) => ({
    tab,
    tabIsNew,
    imageId,
    status: statuses[CREATE_TAB] || statuses[UPDATE_TAB]
  }),
  {
    updateTab,
    createTab
  }
)
export default class Page extends React.PureComponent {
  componentWillReceiveProps (next) {
    if (next.tabIsNew && this.props.status !== 'success' &&
      next.status === 'success' && next.tab && next.tab.id) {
      this.props.replace(`/tab/${next.tab.id}/items`)
    }
  }

  handleSubmit ({ image, ...formData }) {
    const { imageId, createTab, updateTab, tab } = this.props

    const data = {
      ...tab,
      ...formData
    }

    if (data.id) {
      return updateTab({ ...data, imageId })
    }

    createTab(data)
  }

  render () {
    const { tab } = this.props
    return (
      <DashboardLayout
        primarySidebar={{ tab, nav: <TabNav /> }}
        secondaryNavbar={{ tab }}
        drawerMenu={{ children: <UserDrawerNav /> }}>
        <div className={css(tx.container, tx.px2, tx.pb4)}>
          <h1 className={css(tx.py2)}>
            Details
          </h1>
          <Form
            tab={tab}
            onSubmit={data => this.handleSubmit(data)}
            onThemeRemoval={data => this.handleSubmit(data)} />
        </div>
      </DashboardLayout>
    )
  }
}
