
import * as async from 'redux/modules/async/helpers'
import { get } from 'lodash'
import { call, put } from 'redux-saga/effects'

export default ({
  type,
  method,
  path,
  onSuccess,
  onFailure,
  success,
  failure
}) => function* (action) {
  try {
    yield async.reportPending(type)

    const res = yield call(
      method,
      typeof path === 'function' ? path(action) : path,
      action.payload
    )

    if (onSuccess) {
      onSuccess(res)
    }

    yield put({
      type: async.success(type),
      payload: success ? success(res) : res
    })

    yield async.reportSuccess(type)
  } catch (err) {
    const errRes = get(err, 'response', err)
    if (onFailure) {
      onFailure(errRes)
    }

    const errPayload = failure ? failure(errRes) : errRes

    yield put({
      type: async.failure(type),
      payload: errPayload
    })

    yield async.reportError(type, errPayload)
    yield async.reportFailure(type)
  }
}
