
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setDisplayName, compose, pure } from 'recompose'
import { StyleSheet, css } from 'aphrodite/no-important'
import { UserDrawerNav, Panel } from 'elements'
import { tabsPathHelper } from 'helpers'
import { DashboardLayout } from 'layout'
import tx from 'theme/utilities'
import asyncConnect from 'helpers/asyncConnect'
import { PageTitle } from 'layout/components'
import { Nav as TabNav } from 'views/tab'
import { Nav as FormsNav } from 'views/tab/forms'
import { getTab } from 'redux/modules/tabs/actions'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { getForms } from 'redux/modules/forms/actions'
import { GET_FORMS } from 'redux/modules/forms/constants'

const sx = StyleSheet.create({
  addFormIcon: {
    height: 75
  },
  panel: {
    width: '100%',
    maxWidth: 700
  }
})

const enhance = compose(
  setDisplayName('views/tab/forms/Page'),
  asyncConnect(props => {
    const promises = []
    const { tab } = props.match.params
    if (tab && tab !== 'create') {
      promises.push({ key: GET_TAB, promise: getTab, payload: { tab } })
      promises.push({ key: GET_FORMS, promise: getForms, payload: { tab } })
    }
    return promises
  }),
  connect(
    ({
      tabs: { tab },
      forms: { forms }
    }) => ({
      tab,
      forms
    })
  ),
  pure
)

export default enhance(({
  tab,
  forms
}) =>
  <DashboardLayout
    primarySidebar={{ tab, nav: <TabNav /> }}
    secondaryNavbar={{ tab }}
    drawerMenu={{ children: <UserDrawerNav /> }}
    secondarySidebar={{ tab, nav: <FormsNav /> }}>
    <div className={css(tx.container, tx.px2)}>
      <Choose>
        <When condition={tab && forms.length}>
          <PageTitle className={css(tx.py2)}>
            Your form(s):
          </PageTitle>
        </When>
        <Otherwise>
          <div className={css(tx.p2, tx.flex, tx.justifyCenter)}>
            <div className={css(sx.panel)}>
              <Link to={tabsPathHelper(tab, 'forms/add-form')}>
                <Panel>
                  <div className={css(tx.p2, tx.textAlignCenter, tx.color_black)}>
                    <h2 className={css(tx.pb2)}>
                      Need to collect information?
                      <br />
                      Add forms to your tab:
                    </h2>
                    <img
                      className={css(sx.addFormIcon)}
                      src={require('theme/images/AddForm.svg')}
                      role='presentation' />
                  </div>
                </Panel>
              </Link>
            </div>
          </div>
        </Otherwise>
      </Choose>
    </div>
  </DashboardLayout>
)
