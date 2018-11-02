
import React from 'react'
import Form from './Form'
import moment from 'moment'
import { connect } from 'react-redux'
import { PanelOverlayLayout } from 'layout'
import { setDisplayName, withHandlers, mapProps } from 'recompose'
import { getTab, updateTab } from 'redux/modules/tabs/actions'
import { GET_TAB, UPDATE_TAB } from 'redux/modules/tabs/constants'
import { Nav as SettingsNav } from 'views/tab/settings'
import { asyncConnect } from 'helpers'
import { Nav as TabNav } from 'views/tab'
import { UserDrawerNav } from 'elements'

@setDisplayName('view/tab/settings/set-timing/Page')
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
@withHandlers({
  handleSubmit: props => data => {
    const { tab, updateTab } = props
    const ud = {
      ...tab,
      open_datetime: data.openDate === null ? null : moment(data.openDate.format('YYYY-MM-DD') + ' ' + data.openTime.format('HH:mm:00')).utc(),
      close_datetime: data.closeDate === null ? null : moment(data.closeDate.format('YYYY-MM-DD') + ' ' + data.closeTime.format('HH:mm:00')).utc()
    }

    updateTab(ud)
  }
})
@mapProps(props => {
  const mapped = { ...props }
  const { tab } = props

  mapped.initialValues = {
    openDate: (tab && tab.open_datetime) ? moment(tab.open_datetime) : moment(),
    openTime: (tab && tab.open_datetime) ? moment(tab.open_datetime) : moment().hours(12).minute(0),
    closeDate: (tab && tab.close_datetime) ? moment(tab.close_datetime) : moment(),
    closeTime: (tab && tab.close_datetime) ? moment(tab.close_datetime) : moment().hours(12).minute(0)
  }

  return mapped
})
export default class Page extends React.PureComponent {
  componentWillReceiveProps (next) {
    if (this.props.status !== 'success' &&
      next.status === 'success' &&
      next.tab.open_datetime !== null) {
      return this.props.push(`/tab/${next.tab.id}/settings`)
    }
  }

  render () {
    const { tab, handleSubmit, initialValues } = this.props

    return (
      <PanelOverlayLayout
        primarySidebar={{ tab, nav: <TabNav /> }}
        secondaryNavbar={{ tab }}
        drawerMenu={{ children: <UserDrawerNav /> }}
        secondarySidebar={{ nav: <SettingsNav /> }}>
        <If condition={tab}>
          <Form
            initialValues={initialValues}
            isSwitchOpen={tab && tab.open_datetime && tab.close_datetime}
            onSubmit={handleSubmit}
          />
        </If>
      </PanelOverlayLayout>
    )
  }
}
