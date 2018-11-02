
import React from 'react'
import tx from 'theme/utilities'
import { StyleSheet, css } from 'aphrodite/no-important'
import { compose, setDisplayName, pure } from 'recompose'

const sx = StyleSheet.create({
  ctrl: {
    height: 30,
    width: 30
  },
  ellipsis: {
    position: 'relative',
    bottom: 4
  }
})

const enhance = compose(
  setDisplayName('elements/SmallMoreButton'),
  pure
)

export default enhance(() =>
  <div
    className={css(
      sx.ctrl,
      tx.backgroundColor_teal,
      tx.color_white,
      tx.flex,
      tx.alignCenter,
      tx.justifyCenter,
      tx.borderRadius
    )}>
    <div className={css(sx.ellipsis)}>…</div>
  </div>
)
