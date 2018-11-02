
import React from 'react'
import tx from 'theme/utilities'
import { get } from 'lodash'
import { compose, pure } from 'recompose'
import { DashboardLayout } from 'layout'
import { tabsPathHelper, asyncConnect } from 'helpers'
import { connect } from 'react-redux'
import { css } from 'aphrodite/no-important'
import { getTab } from 'redux/modules/tabs/actions'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { UserDrawerNav, Button, Input } from 'elements'
import FacebookIcon from 'react-icons/lib/io/social-facebook'
import TwitterIcon from 'react-icons/lib/io/social-twitter'
import MailIcon from 'react-icons/lib/md/mail'
import { Link } from 'react-router-dom'
import { Nav as TabShareNav } from 'views/tab/share'

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

export default enhance(({ match, tab }) =>
  <DashboardLayout
    primarySidebar={{ tab, nav: <TabShareNav match={match} /> }}
    secondaryNavbar={{ tab }}
    drawerMenu={{ children: <UserDrawerNav /> }}>
    <div className={css(tx.container, tx.p2)}>
      <h1 className={css(tx.pb2)}>
        Share With a Link
      </h1>
      <div className={css(tx.flex, tx.mb1)}>
        <div className={css(tx.col10, tx.pr0)}>
          <Input value={`https://${get(tab, 'slug', 'ERROR')}.cheddarup.com`} readOnly />
        </div>
        <div className={css(tx.col2, tx.pl0)}>
          <Button fullWidth>
            Copy
          </Button>
        </div>
      </div>
      <div className={css(tx.mb2)}>
        <Link to={tabsPathHelper(tab, 'share')}>Edit Link</Link>
      </div>
      <div className={css(tx.flex)}>
        <div className={css(tx.pr0)}>
          <Button>
            <FacebookIcon size={20} />
          </Button>
        </div>
        <div className={css(tx.px0)}>
          <Button backgroundColor='yellow'>
            <TwitterIcon size={20} />
          </Button>
        </div>
        <div className={css(tx.pl0)}>
          <Button backgroundColor='primary'>
            <MailIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  </DashboardLayout>
)
