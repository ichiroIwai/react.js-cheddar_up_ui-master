
import { put } from 'redux-saga/effects'
import { STATUS } from 'redux/modules/async/constants'

export default (type, status) => put({
  type: STATUS,
  payload: { type, status }
})
