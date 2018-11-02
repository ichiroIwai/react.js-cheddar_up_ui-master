
import React from 'react'
import Color from 'color'
import tx from 'theme/utilities'
import { colors } from 'theme/constants'
import { pure, mapProps, compose } from 'recompose'
import { StyleSheet, css } from 'aphrodite/no-important'
import { height } from 'layout/components/SecondaryNavbar'
import { Link } from 'react-router-dom'

const activeItemSx = {
  color: colors.white,
  ':after': {
    content: `''`,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 5,
    backgroundColor: colors.primary
  }
}

const itemSx = {
  height,
  width: 100,
  position: 'relative',
  display: 'block',
  color: colors.gray
}

const sx = StyleSheet.create({
  curtain: {
    backgroundColor: Color(colors.darkGray).fade(0.4).rgb().string(),
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  item: {
    ...itemSx,
    ':hover': activeItemSx
  },
  disabledItem: {
    ...itemSx,
    ':hover': {
      cursor: 'not-allowed'
    }
  },
  activeItem: activeItemSx,
  disabled: {
    cursor: 'not-allowed'
  },
  link: {
    color: colors.gray
  }
})

const enhance = compose(
  mapProps(props => {
    const sharedClassNames = [tx.flex, tx.alignCenter, tx.justifyCenter]
    const itemCx = css(sx.item, ...sharedClassNames)
    const activeItemCx = css(sx.item, sx.activeItem, ...sharedClassNames)
    const disabledItemCx = css(sx.disabledItem, ...sharedClassNames)
    return {
      ...props,
      cx: props.disabled ? disabledItemCx : (props.active ? activeItemCx : itemCx)
    }
  }),
  pure
)

export default enhance(({
  active,
  to,
  cx,
  children,
  disabled
}) =>
  <Choose>
    <When condition={disabled}>
      <div className={cx}>
        <div className={css(sx.curtain)} />
        {children}
      </div>
    </When>
    <Otherwise>
      <Link to={to} className={cx}>
        {children}
      </Link>
    </Otherwise>
  </Choose>
)
