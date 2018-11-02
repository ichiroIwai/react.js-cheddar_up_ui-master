
import tx from 'theme/utilities'
import { connect } from 'react-redux'
import { Power4, TweenLite } from 'gsap'
import { colors } from 'theme/constants'
import { default as React, PropTypes } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { change } from 'redux/modules/drawerMenu/actions'
import { default as Curtain, darkOpacity, zIndex as curtainZindex } from 'layout/components/Curtain'

const speed = 0.1
const menuStart = -400
export const zIndex = curtainZindex + 1
export const id = 'DrawerMenu'

const sx = StyleSheet.create({
  outer: {
    width: '100%'
  },
  menu: {
    backgroundColor: colors.white,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    position: 'absolute',
    transform: `translate(0, ${menuStart}px)`,
    zIndex
  }
})

@connect(({ drawerMenu }) => drawerMenu, { change })
export default class DrawerMenu extends React.PureComponent {
  static propTypes = {
    finish: PropTypes.number.isRequired,
    style: PropTypes.object
  };

  static defaultProps = {
    open: false,
    style: {},
    finish: 0,
    curtain: false
  };

  componentDidMount () {
    if (this.props.open) {
      this.open()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.open && nextProps.open) {
      this.open(nextProps)
    } else if (this.props.open && !nextProps.open) {
      this.close()
    }
  }

  open ({ finish, curtain }) {
    TweenLite.to(this.menu, speed, {
      y: finish,
      ease: Power4.easeOut
    })

    if (!curtain) {
      return
    }

    TweenLite.to(this.curtain, speed, {
      opacity: darkOpacity
    })
  }

  close () {
    TweenLite.to(this.menu, speed, {
      y: menuStart,
      ease: Power4.easeIn,
      onComplete: () => {
        TweenLite.to(this.curtain, speed, {
          opacity: 0,
          ease: Power4.easeOut,
          onComplete: () => this.props.change({ open: false })
        })
      }
    })
  }

  render () {
    return (
      <div className={css(sx.outer)}>
        <div
          id={id}
          style={this.props.style}
          ref={ref => (this.menu = ref)}
          className={css(sx.menu, tx.shadow, tx.p2)}>
          {this.props.children}
        </div>
        <Curtain
          closed={this.props.open}
          onClick={::this.close}
          getRef={ref => (this.curtain = ref)} />
      </div>
    )
  }
}
