
import * as cx from './constants'

export const login = payload => ({ type: cx.LOGIN, payload })
export const resetPassword = payload => ({ type: cx.RESET_PASSWORD, payload })
export const signUp = payload => ({ type: cx.SIGNUP, payload })
export const getSession = payload => ({ type: cx.GET_SESSION, payload })

export function logout (payload) {
  return {
    type: cx.LOGOUT,
    payload,
    storage: {
      [cx.SESSION]: null
    }
  }
}

export function storeSession (session) {
  return {
    type: cx.STORE_SESSION,
    storage: {
      [cx.SESSION]: session
    }
  }
}
