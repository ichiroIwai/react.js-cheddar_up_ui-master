
import React from 'react'
import LoginSignupNav from './LoginSignupNav'
import tx from 'theme/utilities'
import AvatarMenu from './AvatarMenu'
import { connect } from 'react-redux'
import { mediaQueries, borderRadius, scale, colors } from 'theme/constants'
import logo from 'theme/images/TopNavLogoCube.svg'
import wordmark from 'theme/images/WordMark.svg'
import { css, StyleSheet } from 'aphrodite/no-important'
import { DrawerMenuControl } from 'layout/components'
import { GuestPrimaryNav, UserPrimaryNav } from 'elements'
import { AvenirBlack } from 'theme/fonts'
import { Link } from 'react-router-dom'
import { zIndex as curtainZIndex } from 'layout/components/Curtain'
import MenuIcon from 'react-icons/lib/md/menu'
import { mapProps, compose, pure } from 'recompose'

const height = 75
const zIndex = curtainZIndex + 2

const sx = StyleSheet.create({
  navbar: {
    height,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.lighterGray,
    color: colors.darkerGray,
    zIndex,
    position: 'relative',
    width: '100%'
  },
  logo: {
    height: 31,
    marginRight: scale[1],
    [mediaQueries.max_medium]: {
      marginRight: 0
    }
  },
  wordmark: {
    height: 18
  },
  drawer: {
    zIndex: curtainZIndex + 1
  },
  title: {
    fontFamily: [AvenirBlack]
  }
})
const enhance = compose(
  connect(({ browser, session: { user } }) => ({
    browser,
    user
  })),
  mapProps(props => ({
    ...props,
    leftColCx: css(
      tx.col7,
      tx.flex,
      tx.alignCenter
    ),
    rightColCx: css(
      tx.col5,
      tx.flex,
      tx.justifyFlexEnd
    )
  })),
  pure
)

export default enhance(({
  browser,
  user,
  leftColCx,
  rightColCx
}) =>
  <div className={css(sx.navbar, tx.flex, tx.alignCenter, tx.px2)}>
    <div className={leftColCx}>
      <Link to='/tabs' className={css(tx.flex, tx.alignCenter)}>
        <img
          src={logo}
          className={css(sx.logo, tx.mr1)}
          role='presentation' />
        <If condition={browser.greaterThan.medium}>
          <img
            src={wordmark}
            alt='Cheddar Up'
            className={css(sx.wordmark)} />
        </If>
      </Link>
      <If condition={browser.greaterThan.small}>
        <div className={css(tx.pl2)}>
          <Choose>
            <When condition={user}>
              <UserPrimaryNav user={user} />
            </When>
            <Otherwise>
              <GuestPrimaryNav />
            </Otherwise>
          </Choose>
        </div>
      </If>
    </div>
    <div className={rightColCx}>
      <Choose>
        <When condition={browser.lessThan.medium}>
          <DrawerMenuControl
            curtain
            finish={height}
            style={{ width: '100%' }}>
            <MenuIcon size={30} />
          </DrawerMenuControl>
        </When>
        <Otherwise>
          <Choose>
            <When condition={user}>
              <DrawerMenuControl
                style={{
                  borderRadius,
                  width: 300,
                  right: scale[1],
                  zIndex: zIndex + 2
                }}
                finish={height - scale[1]}>
                <AvatarMenu user={user} />
              </DrawerMenuControl>
            </When>
            <Otherwise>
              <LoginSignupNav />
            </Otherwise>
          </Choose>
        </Otherwise>
      </Choose>
    </div>
  </div>
)
