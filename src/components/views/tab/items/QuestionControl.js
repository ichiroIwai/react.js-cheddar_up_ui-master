
import React from 'react'
import tx from 'theme/utilities'
import { colors } from 'theme/constants'
import { css } from 'aphrodite'
import { mapProps } from 'recompose'

const enhance = mapProps(props => {
  return {
    ...props,
    controls: [
      {
        children: require('react-icons/lib/io/close-circled'),
        onClick: props.onDelete
      },
      {
        children: require('react-icons/lib/io/arrow-move'),
        onClick: props.onMove
      },
      {
        children: require('react-icons/lib/io/gear-b'),
        onClick: props.onEdit
      }
    ]
  }
})

export default enhance(({
  controls
}) =>
  <div className={css(tx.flex)}>
    {controls.map(({ children, ...controlProps }, key) =>
      <div key={key} className={css(tx.ml1, tx.cursorPointer, tx.flex, tx.alignCenter)}>
        {React.createElement(children, {
          size: 22,
          color: colors.gray,
          ...controlProps
        })}
      </div>
    )}
  </div>
)
