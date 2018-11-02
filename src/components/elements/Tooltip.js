
import React from 'react'
import Color from 'color'
import { pure, compose, setPropTypes } from 'recompose'
import tx from 'theme/utilities'
import { colors } from 'theme/constants'
import { css, StyleSheet } from 'aphrodite/no-important'

const arrowSize = 6
const backgroundColor = Color(colors.black).fade(0.2).rgb().string()

const sx = StyleSheet.create({
  children: {
    ':hover + .Tooltip > div': {
      display: 'block'
    }
  },
  tip: {
    backgroundColor,
    color: colors.white,
    display: 'none'
  },
  arrow: {
    width: 0,
    height: 0,
    left: '50%',
    bottom: -arrowSize,
    marginLeft: -arrowSize,
    position: 'absolute',
    borderLeft: `${arrowSize}px solid transparent`,
    borderRight: `${arrowSize}px solid transparent`,
    borderTop: `${arrowSize}px solid ${backgroundColor}`
  }
})

const enhance = compose(
  setPropTypes({
    children: React.PropTypes.node.isRequired,
    text: React.PropTypes.string.isRequired,
    style: React.PropTypes.object
  }),
  pure
)

export default enhance(props =>
  <div className={css(tx.relative)}>
    <div className={css(sx.children)}>
      {props.children}
    </div>
    <div
      className='Tooltip'
      style={{
        ...props.style,
        position: 'absolute'
      }}>
      <div
        className={css(sx.tip, tx.p1, tx.borderRadius)}>
        {props.text}
        <div className={css(sx.arrow)} />
      </div>
    </div>
  </div>
)
