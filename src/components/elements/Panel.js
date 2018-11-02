
import React from 'react'
import { css } from 'aphrodite'
import tx from 'theme/utilities'
import { defaultProps } from 'recompose'

const enhance = defaultProps({
  p: -1
})

export default enhance(({ p, ...props }) =>
  <div
    className={css(p > -1 && tx[`p${p}`], tx.border, tx.borderRadius)}
    {...props} />
)
