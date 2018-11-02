
import React from 'react'
import tx from 'theme/utilities'
import { InputErrorMessage } from 'elements'
import { css } from 'aphrodite/no-important'
import { pure, compose, defaultProps } from 'recompose'

const enhance = compose(
  defaultProps({
    meta: {}
  }),
  pure
)

export default enhance(({
  input,
  meta: { touched, error, warning },
  ...props
}) =>
  <div className={css(tx.relative, tx.overflowHidden)}>
    <input {...props} {...input} />
    <If condition={(touched && (error || warning))}>
      <InputErrorMessage
        type={error ? 'error' : 'warning'}
        message={error || warning} />
    </If>
  </div>
)
