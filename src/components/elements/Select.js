
import React from 'react'
import tx from 'theme/utilities'
import { css } from 'aphrodite/no-important'
import ArrowIcon from 'react-icons/lib/io/arrow-down-b'
import { pure, defaultProps, compose, setPropTypes } from 'recompose'
import { borderColor as defaultBorderColor, colors } from 'theme/constants'

const enhance = compose(
  defaultProps({
    meta: {}
  }),
  setPropTypes({
    meta: React.PropTypes.object,
    options: React.PropTypes.array.isRequired
  }),
  pure
)

export default enhance(({
  options,
  input,
  color,
  meta: { touched, error, warning },
  backgroundColor,
  borderColor,
  ...props
}) =>
  <div
    style={{ borderColor: colors[borderColor] || defaultBorderColor }}
    className={css(tx.relative, tx.flex, tx.alignCenter)}>
    <select
      style={{
        color: colors[color],
        backgroundColor: colors[backgroundColor] || colors.white
      }}
      {...props}
      {...input}>
      {options.map((x, key) =>
        <option key={key} {...x} />
      )}
    </select>
    <div className={css(tx.absolute, tx.right, tx.p1)}>
      <ArrowIcon color={colors[color]} />
    </div>
    <If condition={touched && (error || warning)}>
      {error || warning}
    </If>
  </div>
)
