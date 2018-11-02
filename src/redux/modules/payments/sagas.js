
import * as cx from './constants'
import { apiClient } from 'helpers'
import { takeLatest } from 'redux-saga/effects'
import * as async from 'redux/modules/async/helpers'

const getPayments = async.apiCall({
  type: cx.GET_PAYMENTS,
  method: apiClient.get,
  path: action => `users/tabs/${action.payload.tab}/payments`,
  success: res => ({ payments: res.data })
})

export default function* rootSaga () {
  yield takeLatest(cx.GET_PAYMENTS, getPayments)
}
