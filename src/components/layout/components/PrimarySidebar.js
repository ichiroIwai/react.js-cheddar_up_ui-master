
import tx from 'theme/utilities'
import { pure } from 'recompose'
import { default as React, cloneElement } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

export const width = 120

const sx = StyleSheet.create({
  outer: {
    width,
    height: '100%',
    minHeight: '90vh'
  }
})

export default pure(({ tab, nav }) =>
  <div className={css(sx.outer, tx.backgroundColor_teal, tx.flex, tx.flexColumn, tx.alignCenter)}>
    {cloneElement(nav, { column: true })}
  </div>
)
