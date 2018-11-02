
import * as cx from './constants'
import { CALCULATE_RESPONSIVE_STATE } from 'redux-responsive'
import { LOCATION_CHANGE } from '@bentatum/react-router-redux'

const initialState = {
  open: false,
  curtain: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case cx.CHANGE:
      return { ...state, ...action.payload }
    case LOCATION_CHANGE:
    case CALCULATE_RESPONSIVE_STATE:
      return {
        ...state,
        open: false,
        curtain: false
      }
    default:
      return state
  }
}
