
import React from 'react'
import tx from 'theme/utilities'
import { css } from 'aphrodite/no-important'
import { connect } from 'react-redux'
import { BasicLayout } from 'layout'
import Form from './Form'
import { resetPassword } from 'redux/modules/session/actions'
import { RESET_PASSWORD } from 'redux/modules/session/constants'
import { setDisplayName, compose } from 'recompose'

export const displayName = 'views/forgot-password/Page'

const enhance = compose(
  setDisplayName(displayName),
  connect(
    ({ async: { statuses } }) => ({ status: statuses[RESET_PASSWORD] }),
    { resetPassword }
  )
)
export default enhance(({
  resetPassword,
  status
}) => {
  return (
    <BasicLayout>
      <div className={css(tx.container, tx.px2, tx.col12xs, tx.col10sm, tx.col6md, tx.col4)}>
        <div className={css(tx.textAlignCenter, tx.pt4)}>
          <h1 className={css(tx.mb2)}>
            Forgot your password?
          </h1>
        </div>
        <Choose>
          <When condition={status === 'success'}>
            <h4 className={css(tx.textAlignCenter, tx.mb2)}>
              Instructions sent to your inbox.
            </h4>
          </When>
          <Otherwise>
            <Form
              onSubmit={data => resetPassword(data)} />
          </Otherwise>
        </Choose>
      </div>
    </BasicLayout>
  )
})
