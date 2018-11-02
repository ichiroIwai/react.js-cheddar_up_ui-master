
import React from 'react'
import tx from 'theme/utilities'
import { Link } from 'react-router-dom'
import { css } from 'aphrodite/no-important'
import { Field, reduxForm } from 'redux-form'
import { Status, Input, Button } from 'elements'
import { pure, setPropTypes, setDisplayName, compose } from 'recompose'

export const displayName = 'views/login/Form'

const enhance = compose(
  setDisplayName(displayName),
  setPropTypes({
    onSubmit: React.PropTypes.func,
    status: React.PropTypes.oneOf(['pending', 'success', 'failure']),
    error: React.PropTypes.string
  }),
  reduxForm({
    form: displayName,
    validate (values) {
      const err = {}
      if (!values.email) {
        err.email = 'Email required'
      }
      if (!values.password) {
        err.password = 'Password required'
      }
      return err
    }
  }),
  pure
)

export default enhance(({
  status,
  errorMessage,
  onSubmit,
  handleSubmit
}) =>
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      type='text'
      name='email'
      component={Input}
      className={css(tx.mb1)}
      placeholder='Email' />
    <Field
      type='password'
      name='password'
      component={Input}
      placeholder='Password' />
    <Link to='/login/forgot-password' className={css(tx.block, tx.py1, tx.textAlignRight)}>
      Forgot your password?
    </Link>
    <Button fullWidth backgroundColor='primary'>
      Log in
    </Button>
    <div className={css(tx.mt2)}>
      <Status
        status={status}
        messages={{
          pending: 'Logging in...',
          success: 'Logged in!',
          failure: errorMessage
        }} />
    </div>
  </form>
)
