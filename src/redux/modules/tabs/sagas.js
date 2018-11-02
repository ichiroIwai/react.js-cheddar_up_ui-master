
import * as cx from './constants'
import { apiClient } from 'helpers'
import * as async from 'redux/modules/async/helpers'
import { takeLatest, call, put } from 'redux-saga/effects'

const getTab = async.apiCall({
  type: cx.GET_TAB,
  method: apiClient.get,
  path: action => `users/tabs/${action.payload.tab}`,
  success: res => ({ tab: res.data })
})

const getTabs = async.apiCall({
  type: cx.GET_TABS,
  path: 'users/tabs',
  method: apiClient.get,
  success: res => ({ tabs: res.data })
})

function* createTab (action) {
  try {
    yield async.reportPending(cx.CREATE_TAB)

    let res
    const { image, ...payload } = action.payload

    if (image) {
      const data = new window.FormData()
      data.append('images_attributes[0][file_name]', image)
      data.append('name', payload.name)
      data.append('description', payload.description)
      res = yield call(apiClient.post, 'users/tabs', data)
    } else {
      res = yield call(apiClient.post, 'users/tabs', action.payload)
    }

    yield put({ type: async.success(cx.CREATE_TAB), payload: { tab: res.data } })
    yield async.reportSuccess(cx.CREATE_TAB)
  } catch (err) {
    yield async.reportFailure(cx.CREATE_TAB)
    yield async.reportError(cx.CREATE_TAB, err)
  }
}

function* updateTab (action) {
  try {
    yield async.reportPending(cx.UPDATE_TAB)

    const { imageId, image, ...payload } = action.payload
    let { id } = payload

    if (!id) {
      const newTabRes = yield call(apiClient.post, 'users/tabs', { name: 'Untitled' })
      id = newTabRes.data.id
    }

    const res = yield call(apiClient.put, `users/tabs/${id}`, payload)

    if (image && image.id !== imageId) {
      const data = new window.FormData()
      data.append('images_attributes[0][file_name]', image)
      if (imageId) {
        data.append('images_attributes[0][id]', imageId)
      }
      yield call(apiClient.put, `users/tabs/${id}`, data)
    }

    yield put({ type: async.success(cx.UPDATE_TAB), payload: { tab: res.data } })
    yield async.reportSuccess(cx.UPDATE_TAB)
  } catch (err) {
    yield async.reportFailure(cx.UPDATE_TAB)
    yield async.reportError(cx.UPDATE_TAB, err)
  }
}

export default function* rootSaga () {
  yield takeLatest(cx.GET_TAB, getTab)
  yield takeLatest(cx.GET_TABS, getTabs)
  yield takeLatest(cx.CREATE_TAB, createTab)
  yield takeLatest(cx.UPDATE_TAB, updateTab)
}
