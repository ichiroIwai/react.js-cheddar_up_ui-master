
import React from 'react'
import tx from 'theme/utilities'
import { Link } from 'react-router-dom'
import { css } from 'aphrodite/no-important'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { RESET_PASSWORD } from 'redux/modules/session/constants'
import { Status, Input, Button } from 'elements'
import { setPropTypes, setDisplayName, compose } from 'recompose'

export const displayName = 'views/forgot-password/Form'

const enhance = compose(
  setDisplayName(displayName),
  setPropTypes({
    onSubmit: React.PropTypes.func
  }),
  connect(
    ({
      async: { statuses, errors }
    }) => ({
      status: statuses[RESET_PASSWORD],
      error: errors[RESET_PASSWORD]
    })
  ),
  reduxForm({
    form: displayName,
    validate (values) {
      const err = {}
      if (!values.email) {
        err.email = 'Email required'
      }
      return err
    }
  })
)

export default enhance(({
  error,
  status,
  onSubmit,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        name='email'
        component={Input}
        placeholder='Email' />
      <div className={css(tx.my2)}>
        Forgot your password? We'll email you instructions on how to reset your password.
      </div>
      <Button fullWidth backgroundColor='primary'>
        Email me instructions
      </Button>
      <Link to='/login' className={css(tx.block, tx.py2, tx.textAlignRight)}>
        Return to login
      </Link>
      <If condition={status}>
        <div className={css(tx.mt1)}>
          <Status
            status={status}
            messages={{
              pending: 'Sending instructions...',
              success: 'Sent!',
              failure: error
            }} />
        </div>
      </If>
    </form>
  )
})
