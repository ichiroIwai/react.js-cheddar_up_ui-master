
import React from 'react'
import Form from './Form'
import tx from 'theme/utilities'
import { connect } from 'react-redux'
import { PanelOverlayLayout } from 'layout'
import { setDisplayName } from 'recompose'
import { Nav as SettingsNav } from 'views/tab/settings'
import { css } from 'aphrodite/no-important'
import { getTab, updateTab } from 'redux/modules/tabs/actions'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { asyncConnect } from 'helpers'
import { Nav as TabNav } from 'views/tab'
import { UserDrawerNav } from 'elements'

@setDisplayName('view/tab/settings/gather-data/Page')
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
    browser,
    tabs: { tab }
  }) => ({
    tab,
    browser
  }), {
    updateTab
  }
)
export default class Page extends React.PureComponent {
  handleSubmit (formData) {
    const { tab, updateTab } = this.props

    updateTab({
      ...tab,
      ...formData
    })
  }

  render () {
    const { browser, tab } = this.props
    return (
      <PanelOverlayLayout
        primarySidebar={{ tab, nav: <TabNav /> }}
        secondaryNavbar={{ tab }}
        secondarySidebar={{ nav: <SettingsNav /> }}
        drawerMenu={{ children: <UserDrawerNav /> }}>
        <h2 className={css(tx.p3)}>
          Gather the names and emails of everyone who views
          <br />
          your tab (payers and viewers). Great for follow up!
        </h2>
        <div className={css(tx.px3)}>
          <Form
            tab={tab}
            onSubmit={::this.handleSubmit} />
        </div>
        <hr className={css(tx.my3)} />
        <div className={css(tx.textAlignCenter)}>
          <img
            role='presentation'
            className={css(tx.maxWidth100)}
            src={require(browser.lessThan.large ? 'theme/images/Settings.Report.jpg' : 'theme/images/Settings.Report.Text.jpg')} />
        </div>
      </PanelOverlayLayout>
    )
  }
}
