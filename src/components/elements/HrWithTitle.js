
import React from 'react'
import tx from 'theme/utilities'
import { css, StyleSheet } from 'aphrodite/no-important'

const sx = StyleSheet.create({
  divider: {
    textAlign: 'center',
    width: '100%'
  }
})

export default props =>
  <div className={css(tx.flex, tx.justifyCenter, tx.py2)}>
    <div className={css(sx.divider, tx.flex, tx.alignCenter, tx.justifySpaceBetween)}>
      <hr className={css(tx.col5)} />
      <div className={css(tx.col2)}>{props.title}</div>
      <hr className={css(tx.col5)} />
    </div>
  </div>
