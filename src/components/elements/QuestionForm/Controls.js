
import React from 'react'
import tx from 'theme/utilities'
import { colors } from 'theme/constants'
import { StyleSheet, css } from 'aphrodite'

const sx = StyleSheet.create({
  controls: {
    opacity: 0,
    right: 0
  }
})

export const className = 'QuestionFormControls'

export default props => {
  const controls = [
    {
      children: require('react-icons/lib/io/close-circled'),
      onClick: props.onDelete
    },
    {
      children: require('react-icons/lib/io/ios-photos-outline'),
      onClick: props.onDuplicate
    },
    {
      children: require('react-icons/lib/io/arrow-move'),
      onClick: props.onMove
    }
  ]
  return (
    <div className={className}>
      <div className={css(tx.flex, tx.absolute, sx.controls)}>
        {controls.map(({ children, ...controlProps }, key) =>
          <div key={key} className={css(tx.ml1, tx.cursorPointer)}>
            {React.createElement(children, {
              size: 22,
              color: colors.gray,
              ...controlProps
            })}
          </div>
        )}
      </div>
    </div>
  )
}
