
import tx from 'theme/utilities'
import { boxShadow } from 'theme/constants'
import { default as React, cloneElement } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { setDisplayName, pure, compose } from 'recompose'
import { zIndex as curtainZIndex } from 'layout/components/Curtain'

export const size = 70
const zIndex = curtainZIndex + 2

const sx = StyleSheet.create({
  outer: {
    boxShadow,
    width: '100%',
    height: size,
    zIndex,
    position: 'fixed',
    bottom: 0,
    overflow: 'hidden'
  }
})

const enhance = compose(
  setDisplayName('layout/components/PrimarySidebarMobile'),
  pure
)

export default enhance(({ nav }) =>
  <div className={css(sx.outer, tx.backgroundColor_teal, tx.flex, tx.alignCenter, tx.justifyCenter)}>
    {cloneElement(nav, { column: false })}
  </div>
)
