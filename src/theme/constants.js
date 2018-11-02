
import Color from 'color'
import * as fonts from './fonts'
import { getMediaQueries } from 'theme/helpers'

export const breakpoints = {
  extraSmall: 500,
  small: 700,
  medium: 1000,
  large: 1280,
  extraLarge: 1400
}

const baseColors = {
  white: '#fff',
  black: '#000',
  darkerGray: '#373737',
  darkGray: '#5d5d5d',
  gray: '#9e9e9e',
  lightGray: '#e7e7e7',
  lighterGray: '#f5f6f8',
  orange: '#f36d36',
  darkNeutral: '#ebe6c9',
  neutral: '#f2efdc',
  darkTeal: '#1c5a68',
  teal: '#2c7b91',
  aqua: '#b0e0e6',
  lightAqua: '#d7eff2',
  yellow: '#fbb040'
}

export const colors = {
  ...baseColors,
  primary: baseColors.orange,
  secondary: baseColors.teal,
  warning: baseColors.orange,
  error: baseColors.orange
  // info: baseColors.blue
  // default: baseColors.white,
  // success: baseColors.green,
}

export const scale = [5, 14, 30, 45, 100]
export const fontSizes = [35, 40, 26, 22, 16, 14, 12]
export const fontFamily = [fonts.AvenirMedium, 'sans-serif']
export const borderColor = colors.lightGray
export const borderWidth = 1
export const borderStyle = 'solid'
export const borderRadius = 5
export const boxShadow = `0 0 10px ${Color(colors.black).fade(0.8).rgb().string()}`
export const transition = '.05s ease-in-out'
export const inputHeight = 45
export const mediaQueries = getMediaQueries(breakpoints)
export const lineHeight = 1.3
export const fontColor = colors.black
export const buttonHeight = inputHeight
export const buttonHeightSmall = inputHeight - 10

