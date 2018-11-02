
import React from 'react'
import tx from 'theme/utilities'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Nav as TabNav } from 'views/tab'
import { DashboardLayout } from 'layout'
import { compose, pure } from 'recompose'
import { asyncConnect } from 'helpers'
import { connect } from 'react-redux'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { getTab } from 'redux/modules/tabs/actions'
import { GET_PAYMENTS } from 'redux/modules/payments/constants'
import { getPayments } from 'redux/modules/payments/actions'
import { Button, UserDrawerNav } from 'elements'
import { Payment, NoPayments, Nav as ManageTabNav } from 'views/tab/manage'
import { borderWidth, borderColor, borderStyle } from 'theme/constants'

const sx = StyleSheet.create({
  header: {
    borderBottomWidth: borderWidth,
    borderBottomColor: borderColor,
    borderBottomStyle: borderStyle
  }
})

const enhance = compose(
  asyncConnect(props => [
    {
      key: GET_TAB,
      promise: getTab,
      payload: {
        tab: props.match.params.tab
      }
    },
    {
      key: GET_PAYMENTS,
      promise: getPayments,
      payload: {
        tab: props.match.params.tab
      }
    }
  ]),
  connect(({
    tabs: { tab },
    payments: { payments }
  }) => ({
    tab,
    payments
  })),
  pure
)

export default enhance(({ tab, payments }) =>
  <DashboardLayout
    primarySidebar={{ tab, nav: <TabNav /> }}
    secondaryNavbar={{ tab }}
    drawerMenu={{ children: <UserDrawerNav /> }}
    secondarySidebar={{ tab, nav: <ManageTabNav /> }}>
    <div className={css(tx.px2)}>
      <div className={css(sx.header, tx.flex, tx.justifySpaceBetween, tx.py2)}>
        <div>
          <h3 className={css(tx.mb0)}>
            Total Payments:
          </h3>
          <h1>$0</h1>
        </div>
        <Button
          disabled={!payments.length}
          backgroundColor='primary'>
          Withdraw
        </Button>
      </div>
      <Choose>
        <When condition={!payments.length}>
          <NoPayments />
        </When>
        <Otherwise>
          {payments.map((payment, key) =>
            <Payment payment={payment} key={key} />
          )}
        </Otherwise>
      </Choose>
    </div>
  </DashboardLayout>
)
