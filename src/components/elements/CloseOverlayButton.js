
import React from 'react'
import tx from 'theme/utilities'
import { css } from 'aphrodite/no-important'
import { compose, pure } from 'recompose'
import CloseIcon from 'react-icons/lib/md/close'
import { withRouter } from 'react-router'

const enhance = compose(
  withRouter,
  pure
)

export default enhance(props =>
  <div
    className={css(tx.p1, tx.cursorPointer)}
    onClick={props.goBack}>
    <CloseIcon size={props.size} />
  </div>
)
