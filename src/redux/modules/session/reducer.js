
import * as cx from './constants'
import { success, failure } from 'redux/modules/async/helpers'

const initialState = {
  user: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.LOGIN):
    case success(cx.SIGNUP):
    case success(cx.LOGOUT):
    case success(cx.GET_SESSION):
      return { ...state, ...action.payload }
    case failure(cx.GET_SESSION):
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}
