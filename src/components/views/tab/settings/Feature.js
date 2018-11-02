
import React from 'react'
import tx from 'theme/utilities'
import { compose, setPropTypes } from 'recompose'
import { css, StyleSheet } from 'aphrodite/no-important'
import { colors, borderWidth, borderStyle, fontSizes, scale } from 'theme/constants'
import { Link } from 'react-router-dom'

const sx = StyleSheet.create({
  desc: {
    color: colors.gray,
    borderTopWidth: borderWidth,
    borderTopStyle: borderStyle,
    borderTopColor: colors.lightGray
  },

  box: {
    marginBottom: scale[1]
  },

  imgWrapper: {
    width: 58,
    height: 58,
    padding: scale[1],
    marginRight: scale[1],
    borderRightWidth: borderWidth,
    borderRightStyle: borderStyle,
    borderRightColor: colors.lightGray
  },

  img: {
    width: 30,
    height: 'auto'
  },

  action: {
    marginLeft: 'auto',
    padding: `${scale[1]}px ${scale[1]}px`,
    fontSize: fontSizes[3],
    color: colors.gray
  }
})

const enhance = compose(
  setPropTypes({
    icon: React.PropTypes.string.isRequired,
    desc: React.PropTypes.object.isRequired,
    actionPath: React.PropTypes.string.isRequired,
    actionIcon: React.PropTypes.object.isRequired
  }),
)

export default enhance(({icon, desc, actionPath, actionIcon}) =>
  <div className={css(tx.flex, tx.border, sx.box)}>
    <div className={css(sx.imgWrapper, tx.flex, tx.alignCenter)}>
      <img src={icon} role='presentation' className={css(sx.img)} />
    </div>
    <div className={css(tx.fontWeight400, tx.fontSize4, tx.flex, tx.alignCenter)}>{desc}</div>
    <Link to={actionPath} className={css(sx.action, tx.flex, tx.alignCenter)}>{actionIcon}</Link>
  </div>
)
