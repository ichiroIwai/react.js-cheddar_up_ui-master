
import React from 'react'
import tx from 'theme/utilities'
import { CloseOverlayButton } from 'elements'
import { mediaQueries } from 'theme/constants'
import { StyleSheet, css } from 'aphrodite/no-important'

const sx = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    position: 'absolute',
    [mediaQueries.max_medium]: {
      paddingBottom: 110
    }
  },
  overlay: {
    width: '100%',
    height: '83vh',
    overflowY: 'scroll'
  },
  closeButton: {
    right: 0,
    top: 0
  }
})

export default props =>
  <div className={css(sx.container, tx.px2, tx.pt2)}>
    <div className={css(
      sx.overlay,
      tx.shadow,
      tx.borderRadius,
      tx.backgroundColor_white,
      tx.relative)}>
      <div className={css(tx.absolute, sx.closeButton)}>
        <CloseOverlayButton size={30} />
      </div>
      {props.children}
    </div>
  </div>
