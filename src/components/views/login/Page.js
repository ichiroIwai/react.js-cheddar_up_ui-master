
import React from 'react'
import tx from 'theme/utilities'
import { css } from 'aphrodite/no-important'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { BasicLayout } from 'layout'
import { Form } from 'views/login'
import { setDisplayName } from 'recompose'
import { login } from 'redux/modules/session/actions'
import { LOGIN } from 'redux/modules/session/constants'
import { GuestPrimaryNav, HrWithTitle, LoginWithFacebookButton } from 'elements'

@setDisplayName('views/login/Page')
@connect(
  ({
    user,
    async: { statuses, errors }
  }) => ({
    user,
    status: statuses[LOGIN],
    error: errors[LOGIN]
  }),
  { login }
)
export default class Page extends React.PureComponent {
  render () {
    return (
      <BasicLayout drawerMenu={{ children: <GuestPrimaryNav /> }}>
        <div className={css(tx.container, tx.px2, tx.col12xs, tx.col10sm, tx.col6md, tx.col4)}>
          <div className={css(tx.textAlignCenter, tx.pt4)}>
            <h1 className={css(tx.mb1)}>
              Welcome back!
            </h1>
            <h4 className={css(tx.mb2)}>
              Don't have an account? <Link to='/signup'>Create one</Link>
            </h4>
            <LoginWithFacebookButton />
            <HrWithTitle title='Or' />
          </div>
          <Form
            status={this.props.status}
            errorMessage={this.props.error}
            onSubmit={this.props.login} />
        </div>
      </BasicLayout>
    )
  }
}
