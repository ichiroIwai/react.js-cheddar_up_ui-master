
import tx from 'theme/utilities'
import { default as React, cloneElement } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

export const width = 230

const sx = StyleSheet.create({
  outer: {
    width,
    minHeight: '90vh',
    height: '100%'
  }
})

export default ({ nav, tab }) =>
  <div className={css(sx.outer, tx.backgroundColor_lightAqua)}>
    {cloneElement(nav, { tab })}
  </div>
