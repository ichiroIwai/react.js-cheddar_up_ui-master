
import * as fonts from './fonts'
import margins from 'rebass/dist/util/margins'
import padding from 'rebass/dist/util/padding'
import { StyleSheet } from 'aphrodite/no-important'
import { boxShadow, borderStyle, borderColor, borderWidth, borderRadius,
  breakpoints, scale, colors, fontSizes } from './constants'

const util = {
  container: {
    maxWidth: 1024,
    margin: '0 auto',
    width: '100%'
  },
  // flexbox classNames
  flex: {
    display: 'flex'
  },
  flexWrap: {
    flexWrap: 'wrap'
  },
  flexColumn: {
    flexDirection: 'column'
  },
  alignCenter: {
    alignItems: 'center'
  },
  alignFlexEnd: {
    alignItems: 'flex-end'
  },
  alignFlexStart: {
    alignItems: 'flex-start'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  justifySpaceAround: {
    justifyContent: 'space-around'
  },
  justifySpaceBetween: {
    justifyContent: 'space-between'
  },
  justifyFlexEnd: {
    justifyContent: 'flex-end'
  },
  justifyFlexStart: {
    justifyContent: 'flex-start'
  },
  // font family classNames
  openSans: {
    fontFamily: fonts.OpenSans
  },
  // text classNames
  uppercase: { textTransform: 'uppercase' },
  textAlignCenter: { textAlign: 'center' },
  textAlignLeft: { textAlign: 'left' },
  textAlignRight: { textAlign: 'right' },
  noWrap: { whiteSpace: 'nowrap' },
  // position classNames
  relative: { position: 'relative' },
  absolute: { position: 'absolute' },
  fixed: { position: 'fixed' },
  top: { top: 0 },
  right: { right: 0 },
  bottom: { bottom: 0 },
  left: { left: 0 },
  absoluteBottom: {
    position: 'absolute',
    bottom: 0
  },
  // display classNames
  block: { display: 'block' },
  // visibility classNames
  visibilityHidden: { visibility: 'hidden' },
  // overflow classNames
  overflowHidden: { overflow: 'hidden' },
  // media query classNames
  hide_small: {
    [`@media (max-width: ${breakpoints.small}px)`]: {
      display: 'none'
    }
  },
  show_small: {
    display: 'none',
    [`@media (max-width: ${breakpoints.small}px)`]: {
      display: 'inherit'
    }
  },
  hide_medium: {
    [`@media (max-width: ${breakpoints.medium}px)`]: {
      display: 'none'
    }
  },
  show_medium: {
    display: 'none',
    [`@media (max-width: ${breakpoints.medium}px)`]: {
      display: 'inherit'
    }
  },
  hide_large: {
    [`@media (min-width: ${breakpoints.large}px)`]: {
      display: 'none'
    }
  },
  show_large: {
    display: 'none',
    [`@media (min-width: ${breakpoints.large}px)`]: {
      display: 'inherit'
    }
  },
  // border classNames
  border: { borderWidth, borderStyle, borderColor },
  noBorder: { border: 0 },
  borderRadius: { borderRadius },
  noBorderRadius: { borderRadius: 0 },
  // shadow classNames
  shadow: { boxShadow },
  // cursor classNames
  cursorPointer: { cursor: 'pointer' },
  // maxWidth helpers
  maxWidth100: { maxWidth: '100%' }
}

// fontWeight classNames
// .fontWeight{100-900}
const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900]
weights.forEach(fontWeight => {
  util[`fontWeight${fontWeight}`] = { fontWeight }
})

// fontSize classNames
// .fontSize{0-6}
fontSizes.forEach((fontSize, idx) => {
  util[`fontSize${idx}`] = { fontSize }
})

// Flex column classNames
// .col{1-12}
// .col{1-12}{xs|sm|md|lg|xl}
const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
cols.forEach(num => {
  const width = `${(num / cols.length) * 100}%`
  util[`col${num}`] = { width }
  util[`col${num}xs`] = {
    [`@media (max-width: ${breakpoints.extraSmall}px)`]: { width }
  }
  util[`col${num}sm`] = {
    [`@media (min-width: ${breakpoints.extraSmall + 1}px) and (max-width: ${breakpoints.small}px)`]: { width }
  }
  util[`col${num}md`] = {
    [`@media (min-width: ${breakpoints.small + 1}px) and (max-width: ${breakpoints.medium}px)`]: { width }
  }
  util[`col${num}lg`] = {
    [`@media (min-width: ${breakpoints.medium + 1}px) and (max-width: ${breakpoints.large}px)`]: { width }
  }
  util[`col${num}xl`] = {
    [`@media (min-width: ${breakpoints.large + 1}px)`]: { width }
  }
})

// border classNames
// .border{Top|Right|Bottom|Left}Width
// .border{Top|Right|Bottom|Left}Style
// .border{Top|Right|Bottom|Left}Color
const directions = ['Top', 'Right', 'Bottom', 'Left']
directions.forEach(dir => {
  util[`border${dir}`] = {
    [`border${dir}Width`]: borderWidth,
    [`border${dir}Style`]: borderStyle,
    [`border${dir}Color`]: borderColor
  }
})

// color classNames
// .{prop}_color
Object.keys(colors).forEach(color => {
  ['backgroundColor', 'color'].forEach(attr => {
    util[`${attr}_${color}`] = { [attr]: colors[color] }
  })
})

// margin and padding classNames using scale of 0-4
// .{m|p}{t|r|b|l|x|y}{0-4}
// here are some examples:
// .mt3 (margin-top: medium size)
// .pb1 (padding-bottom: small size)
// .mx4 (margin-horiztal: xlarge)
// .pr0 (padding-right: xsmall)
// .py2 (padding-vertical: medium)
const m = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my']
const p = ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py']
scale.forEach((val, idx) => {
  m.forEach(x => {
    util[`${x}${idx}`] = margins({ [x]: idx }, scale)
  })
  p.forEach(x => {
    util[`${x}${idx}`] = padding({ [x]: idx }, scale)
  })
})

export default StyleSheet.create(util)
