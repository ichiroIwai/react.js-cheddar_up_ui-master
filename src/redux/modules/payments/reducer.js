
import * as cx from './constants'
import { success } from 'redux/modules/async/helpers'

const initialState = {
  payments: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_PAYMENTS):
      return { ...state, ...action.payload }
    default:
      return state
  }
}
