
import React from 'react'
import Color from 'color'
import { get } from 'lodash'
import { setDisplayName, compose, pure, mapProps } from 'recompose'
import { buttonHeight, buttonHeightSmall, borderStyle, borderWidth, fontSizes, colors } from 'theme/constants'

const enhance = compose(
  setDisplayName('elements/Button'),
  mapProps(props => {
    const backgroundColor = get(colors, props.backgroundColor, 'secondary')
    return {
      ...props,
      backgroundColor: props.disabled ? Color(backgroundColor).fade(0.5).rgb().string() : backgroundColor
    }
  }),
  pure
)

export default enhance(({
  color,
  small,
  backgroundColor,
  borderColor,
  fullWidth,
  disabled,
  ...props
}) =>
  <button
    style={{
      fontSize: fontSizes[small ? 5 : 4],
      color: colors[color || 'white'],
      backgroundColor: colors[backgroundColor || 'secondary'] || backgroundColor,
      borderColor: colors[borderColor],
      borderWidth: borderColor && borderWidth,
      borderStyle: borderColor && borderStyle,
      height: small ? buttonHeightSmall : buttonHeight,
      width: fullWidth ? '100%' : 'auto',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }}
    {...props} />
)
