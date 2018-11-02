
import React from 'react'
import tx from 'theme/utilities'
import { css, StyleSheet } from 'aphrodite/no-important'
import checkMarkIcon from 'theme/images/CheckMarkPrimary.svg'
import { defaultProps, compose, setPropTypes, setDisplayName } from 'recompose'
import { colors, borderColor, borderWidth, borderStyle } from 'theme/constants'

const sx = StyleSheet.create({
  radio: {
    position: 'absolute',
    left: -9999,
    ':checked + label': {
      borderColor: colors.primary,
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${checkMarkIcon})`,
      backgroundPosition: 'center'
    }
  },
  label: {
    display: 'block',
    textIndent: -9999,
    borderRadius: '100%',
    height: 30,
    width: 30,
    borderColor,
    borderWidth,
    borderStyle,
    backgroundColor: colors.white,
    position: 'relative',
    cursor: 'pointer'
  }
})

const enhance = compose(
  setDisplayName('BigRadioButton'),
  defaultProps({
    meta: {}
  }),
  setPropTypes({
    id: React.PropTypes.string.isRequired
  })
)

export default enhance(({
  label,
  input,
  meta: { touched, error, warning },
  ...props
}) =>
  <div className={css(tx.flex, tx.alignCenter)}>
    <input
      type='radio'
      className={css(sx.radio)}
      {...input}
      {...props} />
    {/* this label is for faking the form control */}
    <label
      htmlFor={props.id}
      className={css(sx.label)} />
    {/* this label is for display */}
    <If condition={label}>
      <label htmlFor={props.id} className={css(tx.ml1, tx.cursorPointer)}>
        {label}
      </label>
    </If>
    <If condition={touched && (error || warning)}>
      <div className={css(tx.fontSize6, tx.ml1, tx[`color_${error ? 'error' : 'warning'}`])}>
        {error || warning}
      </div>
    </If>
  </div>
)
