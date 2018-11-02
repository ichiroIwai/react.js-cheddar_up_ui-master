
import React from 'react'
import tx from 'theme/utilities'
import { css } from 'aphrodite/no-important'
import { connect } from 'react-redux'
import { BasicLayout } from 'layout'
import Form from './Form'
import { mapProps, setDisplayName } from 'recompose'
import { signUp } from 'redux/modules/session/actions'
import { SIGNUP } from 'redux/modules/session/constants'
import { GuestPrimaryNav, HrWithTitle, LoginWithFacebookButton, Select } from 'elements'

@setDisplayName('views/login/Page')
@connect(
  ({
    user,
    browser,
    async: { statuses, errors }
  }) => ({
    user,
    browser,
    status: statuses[SIGNUP],
    error: errors[SIGNUP]
  }),
  { signUp }
)
@mapProps(props => ({
  ...props,
  leftColCx: css(
    tx.col12xs,
    tx.col12sm,
    tx.col6,
    props.browser.lessThan.medium ? tx.mb1 : tx.pr0
  ),
  rightColCx: css(
    tx.col12xs,
    tx.col12sm,
    tx.col6,
    props.browser.greaterThan.medium && tx.pl0
  )
}))
export default class Page extends React.PureComponent {
  render () {
    return (
      <BasicLayout drawerMenu={{ children: <GuestPrimaryNav /> }}>
        <div className={css(tx.container, tx.px2, tx.col12xs, tx.col10sm, tx.col8)}>
          <div className={css(tx.textAlignCenter, tx.pt4)}>
            <h1 className={css(tx.mb1)}>
              Start Collecting
            </h1>
            <h4 className={css(tx.mb2)}>
              Create an account on Cheddar Up with:
            </h4>
            <div className={css(tx.flex, tx.flexWrap)}>
              <div className={this.props.leftColCx}>
                <LoginWithFacebookButton />
              </div>
              <div className={this.props.rightColCx}>
                <Select
                  color='teal'
                  backgroundColor='lightAqua'
                  options={[
                    { children: 'Partner Access', value: '' },
                    { children: 'DECA', value: 'DECA' },
                    { children: 'Girl Scouts of America', value: 'Girl Scouts of America' },
                    { children: 'Illinois PTA', value: 'Illinois PTA' },
                    { children: 'Noonday', value: 'Noonday' },
                    { children: 'Stella & Dot', value: 'Stella & Dot' },
                    { children: 'Storm Soccer', value: 'Storm Soccer' }
                  ]} />
              </div>
            </div>
            <HrWithTitle title='Or' />
          </div>
          <If condition={this.props.error}>
            <h2>
              I need a good place for these {this.props.error}
            </h2>
          </If>
          <Form
            user={this.props.user}
            onSubmit={(data) => this.props.signUp(data)} />
        </div>
      </BasicLayout>
    )
  }
}
