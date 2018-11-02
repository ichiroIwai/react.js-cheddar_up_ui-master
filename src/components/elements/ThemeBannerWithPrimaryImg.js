
import React from 'react'
import { get } from 'lodash'
import tx from 'theme/utilities'
import * as fonts from 'theme/fonts'
import { css, StyleSheet } from 'aphrodite/no-important'

const sx = StyleSheet.create({
  banner: {
    fontFamily: fonts.AvenirRoman,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  primary: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }
})

export default ({ theme, banner, primary }) =>
  <div
    className={css(sx.banner, tx.flex, tx.alignCenter, tx.justifyCenter)}
    style={{
      backgroundImage: `url(${theme.banner_background_image.url})`,
      ...get(banner, 'style', {})
    }}>
    <div
      className={css(sx.primary)}
      style={{
        backgroundImage: `url(${theme.header_image.url})`,
        ...get(primary, 'style', {})
      }} />
  </div>
