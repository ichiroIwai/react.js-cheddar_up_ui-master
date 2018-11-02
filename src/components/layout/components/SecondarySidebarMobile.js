
import React from 'react'
import tx from 'theme/utilities'
import { TweenLite, Power4 } from 'gsap'
import withState from 'recompose/withState'
import { StyleSheet, css } from 'aphrodite/no-important'
import PlusCircleIcon from 'react-icons/lib/io/plus-circled'
import { default as Curtain, zIndex as curtainZIndex, darkOpacity } from 'layout/components/Curtain'
import { boxShadow, colors, borderRadius } from 'theme/constants'
import { width } from 'layout/components/SecondarySidebar'

const speed = 0.1
export const ctrlZIndex = curtainZIndex + 1

const sx = StyleSheet.create({
  nav: {
    width,
    zIndex: curtainZIndex + 1,
    minHeight: '100vh',
    boxShadow,
    position: 'absolute',
    transform: `translate(-${width}px, 0)`
  },
  mobileNavCtrl: {
    zIndex: ctrlZIndex + 1,
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomRightRadius: borderRadius
  }
})

@withState('isVisible', 'setVisible', false)
export default class SecondarySidebar extends React.Component {
  showMenu () {
    TweenLite.to(this.ctrl, speed, {
      x: -50
    })

    TweenLite.to(this.menu, speed, {
      x: 0,
      ease: Power4.easeOut,
      onComplete: () => {
        this.props.setVisible(true, () => {
          TweenLite.to(this.curtain, speed, {
            opacity: darkOpacity,
            ease: Power4.easeInOut
          })
        })
      }
    })
  }

  hideMenu () {
    TweenLite.to(this.menu, speed, {
      x: -width,
      ease: Power4.easeOut,
      onComplete: () => {
        TweenLite.to(this.curtain, speed, {
          opacity: 0,
          ease: Power4.easeInOut,
          onComplete: () => {
            TweenLite.to(this.ctrl, speed, {
              x: 0,
              ease: Power4.easeOut,
              onComplete: () => {
                this.props.setVisible(false)
              }
            })
          }
        })
      }
    })
  }

  render () {
    return (
      <div>
        <div
          onClick={::this.showMenu}
          ref={ref => (this.ctrl = ref)}
          className={css(sx.mobileNavCtrl, tx.show_medium, tx.backgroundColor_lightAqua, tx.p0, tx.shadow)}>
          <PlusCircleIcon color={colors.teal} />
        </div>
        <div
          ref={ref => (this.menu = ref)}
          className={css(sx.nav, tx.backgroundColor_lightAqua)}>
          {this.props.nav}
        </div>
        <Curtain
          closed={this.props.isVisible}
          onClick={::this.hideMenu}
          getRef={ref => (this.curtain = ref)} />
      </div>
    )
  }
}
