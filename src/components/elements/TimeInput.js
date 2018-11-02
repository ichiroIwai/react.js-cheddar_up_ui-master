
import React from 'react'
import moment from 'moment'
import tx from 'theme/utilities'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import { InputErrorMessage } from 'elements'
import { StyleSheet, css } from 'aphrodite/no-important'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import { withState, pure, compose, defaultProps } from 'recompose'
import { default as aphrodite, GLOBALS } from 'theme/helpers/aphrodite-global'
import { scale, colors, fontColor, fontSizes, lineHeight, inputHeight, borderWidth, borderColor, borderStyle } from 'theme/constants'

const gsx = aphrodite.StyleSheet.create({
  [GLOBALS]: {
    '.rc-time-picker': {
      width: '100%'
    },
    '.rc-time-picker-panel-inner': {
      boxShadow: 'none',
      borderWidth: 0,
      lineHeight
    },
    '.rc-time-picker-panel-input-wrap': {
      padding: 0,
      borderBottomColor: borderColor,
      borderRadius: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      height: 57
    },
    '.rc-time-picker-input, .rc-time-picker-panel-input': {
      borderColor,
      height: inputHeight,
      lineHeight,
      color: fontColor,
      paddingLeft: scale[1],
      paddingRight: scale[1],
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: fontSizes[4]
    },
    '.rc-time-picker-input': {
      borderRadius: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0
    },
    '.rc-time-picker-panel-input': {
      border: 'none',
      position: 'relative',
      top: 2
    },
    '.rc-time-picker-panel-clear-btn': {
      display: 'none',
      ':after': {
        fontSize: fontSizes[4],
        lineHeight,
        color: colors.black,
        content: '"×"',
        top: 0
      }
    },
    '.rc-time-picker-panel-select li': {
      paddingLeft: 0,
      textAlign: 'center',
      lineHeight,
      height: 'auto',
      paddingTop: scale[0],
      paddingBottom: scale[0],
      ':hover': {
        color: colors.teal,
        backgroundColor: colors.lightAqua
      }
    },
    'li.rc-time-picker-panel-select-option-selected': {
      color: colors.teal,
      backgroundColor: colors.lightAqua
    },
    '.rc-time-picker-panel-select': {
      width: '50%',
      borderColor,
      fontSize: fontSizes[4]
    }
  }
})

aphrodite.css(gsx[GLOBALS])

const sx = StyleSheet.create({
  icon: {
    height: inputHeight,
    borderBottomWidth: borderWidth,
    borderBottomColor: borderColor,
    borderBottomStyle: borderStyle
  }
})

const enhance = compose(
  defaultProps({
    meta: {}
  }),
  withState('value', 'setValue', moment().hour(12).minute(0)),
  pure
)

export default enhance(({
  input,
  value,
  meta: { touched, error, warning },
  ...props
}) =>
  <div className={css(tx.relative, tx.overflowHidden)}>
    <div className={css(tx.flex, tx.alignCenter)}>
      <div className={css(sx.icon, tx.flex, tx.alignCenter, tx.px1)}>
        <ClockIcon color={colors.gray} />
      </div>
      <TimePicker
        {...input}
        showSecond={false}
        defaultValue={value} />
    </div>
    <If condition={(touched && (error || warning))}>
      <InputErrorMessage
        type={error ? 'error' : 'warning'}
        message={error || warning} />
    </If>
  </div>
)
