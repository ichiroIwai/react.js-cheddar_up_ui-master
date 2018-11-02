
import React from 'react'
import Color from 'color'
import { pure } from 'recompose'
import { css, StyleSheet } from 'aphrodite/no-important'
import { boxShadow, colors, borderColor, borderWidth, borderStyle } from 'theme/constants'

const size = 50

const sx = StyleSheet.create({
  container: {
    borderColor,
    borderWidth,
    borderStyle,
    borderRadius: '100%',
    overflow: 'hidden',
    position: 'relative',
    ':hover': {
      borderColor: colors.teal,
      boxShadow
    }
  },
  haze: {
    height: size,
    width: size,
    position: 'absolute',
    backgroundColor: Color(colors.white).fade(0.5).rgb().string(),
    ':hover': {
      backgroundColor: 'transparent'
    }
  },
  flag: {
    height: size,
    width: size
  },
  US: {
    backgroundImage: `url(${require('theme/images/USFlag.svg')})`
  },
  CA: {
    backgroundImage: `url(${require('theme/images/CAFlag.svg')})`
  }
})

export default pure(props =>
  <div className={css(sx.container)}>
    <div className={css(sx.haze)} />
    <div className={css(sx.flag, sx[props.country])} />
  </div>
)
