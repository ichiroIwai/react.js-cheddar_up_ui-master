
import React from 'react'
import tx from 'theme/utilities'
import FlagButton from './FlagButton'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { Status, Input, Button } from 'elements'
import { css } from 'aphrodite/no-important'
import { SIGNUP } from 'redux/modules/session/constants'
import { mapProps, setPropTypes, setDisplayName, compose } from 'recompose'

export const displayName = 'views/login/Form'

const enhance = compose(
  setDisplayName(displayName),
  setPropTypes({
    onSubmit: React.PropTypes.func,
    user: React.PropTypes.object
  }),
  connect(
    ({
      browser,
      async: { statuses },
      session: { user }
    }) => ({
      user,
      browser,
      status: statuses[SIGNUP]
    })
  ),
  mapProps(props => ({
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
  })),
  reduxForm({
    form: displayName,
    validate (values) {
      const err = {}
      if (!values.first_name) {
        err.first_name = 'Required'
      }
      if (!values.last_name) {
        err.last_name = 'Required'
      }
      if (!values.email) {
        err.email = 'Required'
      }
      if (!values.password || values.password.length < 6) {
        err.password = 'Please make your password at least 6 characters.'
      }
      return err
    }
  })
)

export default enhance(({
  user,
  status,
  onSubmit,
  leftColCx,
  rightColCx,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={css(tx.flex, tx.flexWrap, tx.mb1)}>
        <div className={leftColCx}>
          <Field
            name='first_name'
            component={Input}
            placeholder='First Name' />
        </div>
        <div className={rightColCx}>
          <Field
            name='last_name'
            component={Input}
            placeholder='Last Name' />
        </div>
      </div>
      <Field
        name='email'
        className={css(tx.mb1)}
        component={Input}
        placeholder='Email' />
      <Field
        type='password'
        name='password'
        className={css(tx.mb1)}
        component={Input}
        placeholder='Password' />
      <Field
        name='how_did_hear_about_us'
        className={css(tx.mb1)}
        component={Input}
        placeholder='How did you hear about Cheddar Up? (optional)' />
      <div className={css(tx.flex, tx.alignCenter, tx.flexColumn, tx.pb4)}>
        <div className={css(tx.flex, tx.mb2)}>
          <div className={css(tx.pr0)}>
            <FlagButton country='US' />
          </div>
          <div className={css(tx.pl0)}>
            <FlagButton country='CA' />
          </div>
        </div>
        <div className={css(tx.col12xs, tx.col12sm, tx.col7)}>
          <Button fullWidth backgroundColor='primary'>
            Get Started
          </Button>
          <Status status={status} />
          <div className={css(tx.mt1, tx.textAlignCenter)}>
            By continuing, I agree to Cheddar Up's <Link to='/terms-and-conditions'>Terms of Use</Link>
          </div>
        </div>
      </div>
    </form>
  )
})
