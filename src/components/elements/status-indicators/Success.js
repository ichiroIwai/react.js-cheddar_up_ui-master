
import React from 'react'
import tx from 'theme/utilities'
import { colors } from 'theme/constants'
import { StyleSheet, css } from 'aphrodite/no-important'
import checkMark from 'theme/images/CheckMarkWhite.svg'

const size = 26

const sx = StyleSheet.create({
  success: {
    backgroundColor: colors.teal,
    backgroundImage: `url(${checkMark})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '100%',
    height: size,
    width: size
  }
})

export default props =>
  <div className={css(
    sx.success,
    tx.flex,
    tx.alignCenter,
    tx.justifyCenter
  )} />
