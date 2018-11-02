
import * as cx from './constants'

export function getThemes (payload) {
  return {
    type: cx.GET_THEMES,
    payload
  }
}
