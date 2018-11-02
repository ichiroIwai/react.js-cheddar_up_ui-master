
import React from 'react'
import tx from 'theme/utilities'
import { mediaQueries, breakpoints, colors } from 'theme/constants'
import { TweenLite, Quint } from 'gsap'
import { CloseOverlayButton } from 'elements'
import { StyleSheet, css } from 'aphrodite/no-important'
import { default as Curtain, darkOpacity, lightOpacity, zIndex } from 'layout/components/Curtain'

const speed = 0.2

const sx = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%',
    zIndex: zIndex + 100
  },
  modalOuter: {
    zIndex: zIndex + 1,
    backgroundColor: colors.white,
    transform: 'matrix(0, 0, 0, 0, 0, 0)',
    [mediaQueries.max_small]: {
      maxWidth: '90%'
    }
  },
  modalInner: {
    maxWidth: breakpoints.small
  },
  closeButton: {
    top: 0,
    right: 0
  }
})

export default class Overlay extends React.PureComponent {
  componentDidMount () {
    TweenLite.to(this.curtain, speed, {
      opacity: darkOpacity,
      ease: Quint.easeInOut,
      onComplete: () => {
        TweenLite.to(this.overlay, speed, {
          ease: Quint.easeInOut,
          scale: 1
        })
      }
    })
  }

  handleExit () {
    TweenLite.to(this.overlay, speed, {
      scale: 0,
      ease: Quint.easeInOut,
      onComplete: () => {
        TweenLite.to(this.curtain, speed, {
          opacity: lightOpacity,
          ease: Quint.easeInOut,
          onComplete: () => {
            this.props.onDismiss()
          }
        })
      }
    })
  }

  render () {
    return (
      <div className={css(sx.container, tx.flex, tx.alignCenter, tx.justifyCenter)}>
        <div
          ref={ref => { this.overlay = ref }}
          className={css(sx.modalOuter, tx.fixed, tx.borderRadius)}>
          <div className={css(sx.modalInner, tx.relative, tx.p3)}>
            <div className={css(tx.absolute, sx.closeButton)}>
              <CloseOverlayButton
                size={24}
                onClick={::this.handleExit} />
            </div>
            {this.props.children}
          </div>
        </div>
        <Curtain
          onClick={::this.handleExit}
          getRef={ref => { this.curtain = ref }} />
      </div>
    )
  }
}
