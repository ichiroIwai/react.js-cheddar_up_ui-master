
import React from 'react'
import { Nav } from 'elements'
import tx from 'theme/utilities'
import { borderWidth, colors } from 'theme/constants'
import { css, StyleSheet } from 'aphrodite/no-important'

const sx = StyleSheet.create({
  navItem: {
    display: 'block',
    borderBottomWidth: borderWidth,
    borderBottomColor: colors.white,
    borderBottomStyle: 'solid'
  }
})

const navItemCx = css(sx.navItem, tx.p2)

export default props =>
  <Nav items={props.items.map(i => ({ ...i, className: navItemCx }))} />
