
import React from 'react'
import tx from 'theme/utilities'
import { Power4, TweenLite } from 'gsap'
import { borderRadius, inputHeight, colors } from 'theme/constants'
import { StyleSheet, css } from 'aphrodite/no-important'
import { defaultProps, setPropTypes } from 'recompose'
import WarningIcon from 'react-icons/lib/ti/warning-outline'

const hideX = 2000
const showX = 0
const speed = 0.2

const sx = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: `translate(${hideX}px, 0)`
  },
  message: {
    height: inputHeight,
    color: colors.white,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius
  }
})

@defaultProps({
  type: 'error'
})
@setPropTypes({
  type: React.PropTypes.oneOf(['error', 'warning'])
})
export default class InputErrorMessage extends React.PureComponent {
  componentDidMount () {
    TweenLite.to(this.el, speed, {
      x: showX,
      ease: Power4.easeInOut
    })
  }

  goAway () {
    TweenLite.to(this.el, speed, {
      x: hideX,
      ease: Power4.easeIn
    })
  }

  render () {
    const backgroundColor = colors[this.props.type]
    return (
      <div
        onClick={::this.goAway}
        className={css(sx.container, tx.flex, tx.alignCenter)}
        ref={ref => { this.el = ref }}>
        <div className={css(tx.px1)}>
          <WarningIcon color={backgroundColor} />
        </div>
        <div
          style={{ backgroundColor }}
          className={css(tx.px2, tx.fontSize5, tx.flex, tx.alignCenter, sx.message)}>
          {this.props.message}
        </div>
      </div>
    )
  }
}
