
import React from 'react'
import tx from 'theme/utilities'
import { StyleSheet, css } from 'aphrodite/no-important'
import { connect } from 'react-redux'
import { BasicLayout } from 'layout'
import { setDisplayName } from 'recompose'
import { delay } from 'lodash'
import { logout } from 'redux/modules/session/actions'
import { UserDrawerNav } from 'elements'
import { RotatingPlane } from 'better-react-spinkit'

const sx = StyleSheet.create({
  container: {
    minHeight: '100vh'
  }
})

@setDisplayName('views/logout/Page')
@connect(() => ({}), { logout })
export default class Page extends React.PureComponent {
  componentDidMount () {
    delay(this.props.logout, 1500)
  }

  render () {
    return (
      <BasicLayout drawerMenu={{ children: <UserDrawerNav /> }}>
        <div className={css(sx.container, tx.flex, tx.alignCenter, tx.justifyCenter)}>
          <div className={css(tx.flex, tx.flexColumn, tx.justifyCenter, tx.alignCenter, tx.py4)}>
            <h4 className={css(tx.mb1)}>
              Logging out...
            </h4>
            <RotatingPlane />
          </div>
        </div>
      </BasicLayout>
    )
  }
}
