
import React from 'react'
import { colors } from 'theme/constants'
import { css, StyleSheet } from 'aphrodite/no-important'
import { setDisplayName, compose, pure, defaultProps, setPropTypes } from 'recompose'

export const id = 'Curtain'
export const zIndex = 10
export const lightOpacity = 0
export const darkOpacity = 0.2

const sx = StyleSheet.create({
  curtain: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%',
    backgroundColor: colors.black,
    opacity: lightOpacity
  }
})

const enhance = compose(
  setDisplayName('layout/components/Curtain'),
  defaultProps({ getRef: x => x }),
  setPropTypes({ getRef: React.PropTypes.func.isRequired }),
  pure
)

export default enhance(({ closed, getRef, ...props }) =>
  <div
    id={id}
    ref={x => getRef(x)}
    style={{ zIndex: closed ? zIndex : -999 }}
    className={css(sx.curtain)}
    {...props} />
)
