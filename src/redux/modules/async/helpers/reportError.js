
import { put } from 'redux-saga/effects'
import { ERROR } from 'redux/modules/async/constants'

export default (type, error) => put({
  type: ERROR,
  payload: { type, error }
})
