
import { css } from 'aphrodite/no-important'
import tx from 'theme/utilities'
import React from 'react'
import { pure } from 'recompose'

export default pure(({ column, ...props }) =>
  <div
    {...props}
    className={css(tx.col12, tx.flex, tx.justifyCenter, column && tx.flexColumn)} />
)
