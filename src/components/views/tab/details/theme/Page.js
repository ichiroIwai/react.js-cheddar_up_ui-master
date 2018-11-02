
import Form from './Form'
import tx from 'theme/utilities'
import { connect } from 'react-redux'
import { PanelOverlayLayout } from 'layout'
import { css } from 'aphrodite/no-important'
import asyncConnect from 'helpers/asyncConnect'
import { setDisplayName } from 'recompose'
import { getThemes } from 'redux/modules/themes/actions'
import { GET_THEMES } from 'redux/modules/themes/constants'
import { default as React, PureComponent } from 'react'
import { createTab, updateTab, getTab } from 'redux/modules/tabs/actions'
import { CREATE_TAB, UPDATE_TAB, GET_TAB } from 'redux/modules/tabs/constants'
import { Nav as TabNav } from 'views/tab'
import { UserDrawerNav } from 'elements'

@setDisplayName('views/details/theme/Page')
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
    tabs: { tab, imageId },
    async: { statuses }
  }) => ({
    tab,
    imageId,
    status: statuses[UPDATE_TAB] || statuses[CREATE_TAB]
  }),
  {
    updateTab,
    createTab
  }
)
export default class page extends PureComponent {
  componentWillReceiveProps (next) {
    if (this.props.status !== 'success' && next.status === 'success') {
      this.props.push(`/tab/${next.tab.id}/details`)
    }
  }

  render () {
    const { match, tab, createTab, updateTab, imageId, ...props } = this.props
    return (
      <PanelOverlayLayout
        primarySidebar={{ tab, nav: <TabNav match={match} /> }}
        secondaryNavbar={{ tab }}
        drawerMenu={{ children: <UserDrawerNav /> }}
        {...props}>
        <div className={css(tx.borderBottom)}>
          <h2 className={css(tx.p2)}>
            Apply a Theme to this Tab
          </h2>
        </div>
        <Form onSubmit={data => {
          if (!tab) {
            return createTab({
              name: 'Untitled',
              ...data
            })
          }
          return updateTab({ ...tab, ...data, imageId })
        }} />
      </PanelOverlayLayout>
    )
  }
}
