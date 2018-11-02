
import Form from './Form'
import React from 'react'
import { connect } from 'react-redux'
import { PanelOverlayLayout } from 'layout'
import { setDisplayName, mapProps } from 'recompose'
import { getTab, updateTab } from 'redux/modules/tabs/actions'
import { GET_TAB, UPDATE_TAB } from 'redux/modules/tabs/constants'
import { Nav as SettingsNav } from 'views/tab/settings'
import { asyncConnect } from 'helpers'
import { Nav as TabNav } from 'views/tab'
import { UserDrawerNav } from 'elements'

@setDisplayName('view/tab/settings/make-it-exclusive/Page')
@asyncConnect(props => {
  const promises = []
  const { tab } = props.match.params
  if (tab && tab !== 'create') {
    promises.push({ key: GET_TAB, promise: getTab, payload: { tab } })
  }
  return promises
})
@connect(
  ({
    tabs: { tab },
    async: { statuses }
  }) => ({
    tab,
    status: statuses[UPDATE_TAB]
  }), {
    updateTab
  }
)
@mapProps(props => {
  const mapped = { ...props }

  if (props.tab && props.tab.access_code) {
    mapped.initialValues = {
      access_code: props.tab.access_code
    }
  }

  return mapped
})
export default class Page extends React.PureComponent {
  componentWillReceiveProps (next) {
    if (this.props.status !== 'success' &&
      next.status === 'success' &&
      next.tab.access_code !== '') {
      return this.props.push(`/tab/${next.tab.id}/settings`)
    }
  }

  handleSubmit (formData) {
    const { tab, updateTab } = this.props

    const data = {
      ...tab,
      ...formData
    }

    updateTab(data)
  }

  render () {
    const { tab } = this.props

    return (
      <PanelOverlayLayout
        primarySidebar={{ tab, nav: <TabNav /> }}
        secondaryNavbar={{ tab }}
        secondarySidebar={{ nav: <SettingsNav /> }}
        drawerMenu={{ children: <UserDrawerNav /> }}>
        <If condition={tab}>
          <Form
            tab={tab}
            initialValues={this.props.initialValues}
            onSubmit={::this.handleSubmit} />
        </If>
      </PanelOverlayLayout>
    )
  }
}
