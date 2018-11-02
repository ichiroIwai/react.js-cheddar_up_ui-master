
import React from 'react'
import tx from 'theme/utilities'
import checkMark from 'theme/images/CheckMarkWhite.svg'
import { StyleSheet, css } from 'aphrodite/no-important'
import { colors, borderRadius, borderColor, borderWidth, borderStyle } from 'theme/constants'

const size = 17

const sx = StyleSheet.create({
  container: {
    height: size,
    width: size
  },
  checkbox: {
    position: 'absolute',
    left: -9999,
    ':checked + label:before': {
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${checkMark})`,
      backgroundColor: colors.teal,
      backgroundPosition: 'center'
    }
  },
  label: {
    position: 'relative',
    ':before': {
      content: `''`,
      position: 'absolute',
      top: 0,
      left: 0,
      width: size,
      height: size,
      borderRadius,
      borderColor,
      borderWidth,
      borderStyle,
      backgroundColor: colors.white
    }
  }
})

export default ({
  label,
  input,
  meta: { touched, error, warning },
  ...props
}) =>
  <div className={css(tx.flex)}>
    <div className={css(sx.container, tx.mr1)}>
      <input
        type='checkbox'
        name={props.id}
        className={css(sx.checkbox)}
        {...input}
        {...props} />
      {/* this label is for faking the form control */}
      <label
        htmlFor={props.id}
        className={css(sx.label)} />
    </div>
    {/* this label is for display */}
    <If condition={label}>
      <label
        htmlFor={props.id}
        className={css(tx.cursorPointer)}>
        {label}
      </label>
    </If>
    <If condition={touched && (error || warning)}>
      {error || warning}
    </If>
  </div>
