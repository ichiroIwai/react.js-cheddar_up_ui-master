
import React from 'react'
import moment from 'moment'
import tx from 'theme/utilities'
import DatePicker from 'react-datepicker'
import { StyleSheet, css } from 'aphrodite/no-important'
import 'react-datepicker/dist/react-datepicker.css'
import { withState, pure, compose, defaultProps } from 'recompose'
import { default as aphrodite, GLOBALS } from 'theme/helpers/aphrodite-global'
import { borderStyle, borderWidth, inputHeight, fontFamily, borderRadius, scale, colors, borderColor } from 'theme/constants'
import CalendarIcon from 'react-icons/lib/fa/calendar-o'

const gsx = aphrodite.StyleSheet.create({
  [GLOBALS]: {
    '.react-datepicker': {
      borderColor,
      borderRadius,
      boxShadow: 'none',
      borderWidth: 0,
      fontFamily
    },
    '.react-datepicker__day-name': {
      margin: scale[0]
    },
    '.react-datepicker__header': {
      borderColor,
      backgroundColor: colors.lightAqua,
      paddingTop: scale[1]
    },
    '.react-datepicker__navigation': {
      top: 17
    },
    '.react-datepicker__input-container': {
      width: '100%'
    },
    '.react-datepicker__input-container input': {
      borderRadius: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      width: '100%'
    },
    '.react-datepicker__navigation--previous': {
      borderRightColor: colors.gray,
      ':hover': {
        borderRightColor: colors.teal
      }
    },
    '.react-datepicker__navigation--next': {
      borderLeftColor: colors.gray,
      ':hover': {
        borderLeftColor: colors.teal
      }
    },
    '.react-datepicker__day': {
      margin: scale[0],
      borderRadius,
      ':hover': {
        backgroundColor: colors.lighterGray
      }
    },
    '.react-datepicker__month': {
      margin: scale[0]
    },
    '.react-datepicker__day--selected': {
      color: colors.white,
      backgroundColor: colors.primary,
      ':hover': {
        color: colors.white,
        backgroundColor: colors.primary
      }
    },
    '.react-datepicker__day--today': {
      color: colors.black,
      backgroundColor: colors.lighterGray,
      ':hover': {
        color: colors.black,
        backgroundColor: colors.lightGray
      }
    },
    '.react-datepicker__tether-element-attached-top .react-datepicker__triangle': {
      borderBottomColor: colors.lightAqua,
      ':before': {
        borderWidth: 0,
        borderBottomColor: borderColor
      }
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
  defaultProps({ meta: {} }),
  withState('showPicker', 'togglePicker', false),
  withState('value', 'setValue', moment()),
  pure
)

export default enhance(({
  input,
  meta: { touched, error, warning },
  value,
  setValue,
  showPicker,
  togglePicker,
  ...props
}) =>
  <div className={css(tx.relative)}>
    <div className={css(tx.relative, tx.overflowHidden)}>
      <div className={css(tx.flex, tx.alignCenter)}>
        <div className={css(sx.icon, tx.flex, tx.alignCenter, tx.px1)}>
          <CalendarIcon color={colors.gray} />
        </div>
        <DatePicker
          dateFormat='M/D/YY'
          selected={input.value}
          onChange={date => {
            setValue(date)
            input.onChange(date)
          }} />
      </div>
    </div>
  </div>
)
