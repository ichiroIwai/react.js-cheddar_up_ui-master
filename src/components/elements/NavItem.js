
import React from 'react'
import tx from 'theme/utilities'
import { css } from 'aphrodite/no-important'
import { Link } from 'react-router-dom'

export default props =>
  <Link
    className={css(tx.mr2, tx.color_black, tx.py0)}
    {...props} />
