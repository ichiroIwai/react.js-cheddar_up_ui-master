
import * as fonts from './fonts'
import { default as aphrodite, GLOBALS } from 'theme/helpers/aphrodite-global'
import { fontFamily, fontColor, lineHeight, inputHeight, scale, colors, fontSizes, borderColor, borderWidth, borderStyle, borderRadius } from './constants'

const headings = {}
fontSizes.forEach((val, idx) => {
  headings[`h${idx}`] = {
    fontSize: val
  }
})

const sx = aphrodite.StyleSheet.create({
  [GLOBALS]: {
    '*': { boxSizing: 'border-box' },
    body: {
      margin: 0,
      padding: 0,
      lineHeight,
      color: fontColor,
      backgroundColor: colors.lighterGray,
      fontFamily,
      fontSize: fontSizes[5]
    },
    ...headings,
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
      fontFamily: [fonts.AvenirRoman, 'sans-serif']
    },
    a: {
      color: colors.teal,
      textDecoration: 'none'
    },
    input: {
      height: inputHeight,
      fontSize: fontSizes[4],
      paddingLeft: scale[1],
      paddingRight: scale[1],
      borderColor,
      borderWidth,
      borderStyle,
      borderRadius,
      fontFamily: [fonts.AvenirRoman, 'sans-serif'],
      width: '100%',
      outline: 'none'
    },
    textarea: {
      padding: scale[1],
      fontSize: fontSizes[4],
      borderColor,
      borderWidth,
      borderStyle,
      borderRadius,
      fontFamily: [fonts.AvenirRoman, 'sans-serif'],
      width: '100%',
      outline: 'none'
    },
    select: {
      width: '100%',
      appearance: 'none',
      backgroundColor: colors.white,
      border: 'none',
      borderRadius,
      height: inputHeight,
      fontSize: fontSizes[4],
      fontFamily: [fonts.AvenirRoman, 'sans-serif'],
      paddingLeft: scale[1],
      paddingRight: scale[1]
    },
    hr: {
      borderTopColor: borderColor,
      borderTopWidth: borderWidth,
      borderTopStyle: borderStyle,
      borderBottom: 0
    },
    button: {
      border: 0,
      borderRadius,
      backgroundColor: 'transparent',
      paddingLeft: scale[1],
      paddingRight: scale[1],
      fontFamily,
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      outline: 'none'
    }
  }
})

export default aphrodite.css(sx[GLOBALS])
