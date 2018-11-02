
import React from 'react'
import { TweenLite } from 'gsap'
import { StyleSheet, css } from 'aphrodite/no-important'
import { pure, defaultProps, setPropTypes, setDisplayName } from 'recompose'

const sx = StyleSheet.create({
  container: {
    opacity: 0
  }
})

@setDisplayName('elements/FadeIn')
@defaultProps({ speed: 1 })
@setPropTypes({ speed: React.PropTypes.number.isRequired })
@pure
export default class Loading extends React.Component {
  componentDidMount () {
    TweenLite.to(this.el, this.props.speed, {
      opacity: 1
    })
  }

  render () {
    return (
      <div
        className={css(sx.container)}
        ref={ref => { this.el = ref }}>
        {this.props.children}
      </div>
    )
  }
}
