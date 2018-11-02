
import * as cx from './constants'
import { apiClient } from 'helpers'
import * as async from 'redux/modules/async/helpers'
import { takeLatest, call, put } from 'redux-saga/effects'

function* getThemes () {
  try {
    yield async.reportPending(cx.GET_THEMES)
    const res = yield call(apiClient.get, 'users/themes')
    yield put({ type: cx.GET_THEMES_SUCCESS, payload: { themes: res.data } })
    yield async.reportSuccess(cx.GET_THEMES)
  } catch (err) {
    yield async.reportFailure(cx.GET_THEMES)
    yield async.reportError(cx.GET_THEMES, err)
  }
}

export default function* rootSaga () {
  yield takeLatest(cx.GET_THEMES, getThemes)
}
