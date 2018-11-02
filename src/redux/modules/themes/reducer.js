
import * as cx from './constants'

const initialState = {
  themes: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case cx.GET_THEMES_SUCCESS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
