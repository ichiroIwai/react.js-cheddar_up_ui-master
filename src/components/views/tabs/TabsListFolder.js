
import React from 'react'
import { css } from 'aphrodite'
import tx from 'theme/utilities'

export default props =>
  <div>
    <div className={css(tx.uppercase, tx.fontSize6, tx.backgroundColor_lightAqua, tx.px2, tx.py1, tx.mb2)}>
      {props.folder.name}
    </div>
    {props.children}
  </div>
