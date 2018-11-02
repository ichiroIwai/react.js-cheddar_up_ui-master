
import { get } from 'lodash'
import * as cx from './constants'
import { apiClient } from 'helpers'
import { takeLatest } from 'redux-saga/effects'
import { apiCall } from 'redux/modules/async/helpers'

const login = apiCall({
  path: 'login',
  type: cx.LOGIN,
  method: apiClient.post,
  success: res => ({ user: res.data }),
  failure: res => get(res, 'data.errors[0]')
})

const resetPassword = apiCall({
  path: 'password/reset',
  type: cx.RESET_PASSWORD,
  method: apiClient.post
})

const signUp = apiCall({
  path: 'signup',
  type: cx.SIGNUP,
  method: apiClient.post,
  success: res => ({ user: res.data })
})

const logout = apiCall({
  path: 'logout',
  type: cx.LOGOUT,
  method: apiClient.delete,
  success: () => ({ user: null })
})

const getSession = apiCall({
  path: 'session',
  type: cx.GET_SESSION,
  method: apiClient.get,
  success: res => ({ user: res.data })
})

export default function* rootSaga () {
  yield takeLatest(cx.LOGIN, login)
  yield takeLatest(cx.SIGNUP, signUp)
  yield takeLatest(cx.LOGOUT, logout)
  yield takeLatest(cx.GET_SESSION, getSession)
  yield takeLatest(cx.RESET_PASSWORD, resetPassword)
}
