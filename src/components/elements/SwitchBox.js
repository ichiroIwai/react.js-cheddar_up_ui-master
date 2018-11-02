
import React from 'react'
import { get } from 'lodash'
import tx from 'theme/utilities'
import { compose, pure, defaultProps, setPropTypes } from 'recompose'
import { boxShadow, colors, transition } from 'theme/constants'
import { css, StyleSheet } from 'aphrodite/no-important'

const knobSize = 26

const sx = StyleSheet.create({
  switch: {
    width: 55
  },
  checkbox: {
    left: -9999,
    position: 'absolute',
    ':checked + label': {
      backgroundColor: colors.secondary
    },
    ':checked + label:before': {
      left: `calc(100% - ${knobSize}px)`
    }
  },
  label: {
    height: knobSize,
    display: 'block',
    borderRadius: knobSize / 2,
    cursor: 'pointer',
    position: 'relative',
    backgroundColor: colors.gray,
    transition,
    ':before': {
      content: `''`,
      display: 'block',
      position: 'absolute',
      height: knobSize,
      width: knobSize,
      top: 0,
      left: 0,
      right: 'auto',
      borderRadius: '100%',
      backgroundColor: colors.white,
      transition,
      boxShadow
    }
  }
})

const enhance = compose(
  defaultProps({ meta: {} }),
  setPropTypes({
    meta: React.PropTypes.object,
    id: React.PropTypes.string.isRequired
  }),
  pure
)

export default enhance(({
  input,
  label,
  meta: { touched, error, warning },
  ...props
}) =>
  <div className={css(tx.flex, tx.alignCenter)}>
    <div className={css(sx.switch)}>
      <input
        {...input}
        type='checkbox'
        name={props.id}
        checked={!input ? null : !!get(input, 'value', false)}
        className={css(sx.checkbox)}
        onChange={({target: {checked}}) =>
          input.onChange(checked)
        }
        {...props} />
      {/* this label is for faking the form control */}
      <label
        htmlFor={props.id}
        className={css(sx.label)} />
    </div>
    {/* this label is for display */}
    <If condition={label}>
      <label htmlFor={props.id} className={css(tx.ml1, tx.cursorPointer)}>
        {label}
      </label>
    </If>
    <If condition={(touched && (error || warning))}>
      {error || warning}
    </If>
  </div>
)
