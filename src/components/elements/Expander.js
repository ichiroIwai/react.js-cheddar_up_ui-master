
import React from 'react'
import tx from 'theme/utilities'
import { SwitchBox } from 'elements'
import { css, StyleSheet } from 'aphrodite/no-important'
import { compose, withState, setPropTypes, lifecycle } from 'recompose'
import { colors, borderColor, borderWidth, borderStyle } from 'theme/constants'

const sx = StyleSheet.create({
  description: {
    color: colors.gray,
    borderTopWidth: borderWidth,
    borderTopStyle: borderStyle,
    borderTopColor: borderColor
  }
})

const enhance = compose(
  setPropTypes({id: React.PropTypes.string.isRequired}),
  withState('isExpanded', 'toggleExpand', (props) => props.input.value),
  lifecycle({
    shouldComponentUpdate (nextProps, nextState) {
      if (this.props.input.value !== nextProps.input.value) {
        if (nextProps.input.value === true) {
          this.props.toggleExpand(true)
        }
      }
      return true
    }
  })
)

export default enhance(({
  input,
  isExpanded,
  toggleExpand,
  ...props
}) =>
  <div className={css(tx.border, tx.mb1)}>
    <div className={css(tx.flex, tx.alignCenter, tx.justifySpaceBetween, tx.cursorPointer, tx.px1, tx.py1)}>
      <div className={css(tx.fontSize4)}>
        {props.label}
      </div>
      <SwitchBox
        id={props.id}
        name={props.id}
        onChange={({ target: { checked } }) => {
          toggleExpand(checked)
          input.onChange(checked)
        }}
        checked={input.value ? 'checked' : ''} />
    </div>
    <If condition={props.description && isExpanded}>
      <div className={css(tx.px1, tx.py1, sx.color_gray)}>
        {props.description}
      </div>
    </If>
  </div>
)
