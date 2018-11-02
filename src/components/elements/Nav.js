
import React from 'react'
import tx from 'theme/utilities'
import { Link } from 'react-router-dom'
import { css, StyleSheet } from 'aphrodite/no-important'
import { compose, setDisplayName, pure } from 'recompose'

const sx = StyleSheet.create({
  outer: {
    width: '100%',
    zIndex: 'inherit',
    display: 'inherit',
    justifyContent: 'inherit',
    flexDirection: 'inherit'
  }
})

const enhance = compose(
  setDisplayName('elements/Nav'),
  pure
)

export default enhance(({
  children,
  items,
  inline,
  ...props
}) =>
  <nav className={css(sx.outer, inline && tx.flex)} {...props}>
    <Choose>
      <When condition={children}>
        {children}
      </When>
      <Otherwise>
        {items.map((item, key) =>
          <Link {...item} key={key} />
        )}
      </Otherwise>
    </Choose>
  </nav>
)
