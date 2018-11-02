/* eslint-disable camelcase */
import * as cx from './constants'
import { apiClient } from 'helpers'
import * as async from 'redux/modules/async/helpers'
import { takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import { getQuestionsData } from 'redux/modules/fields/helpers'

const getItem = async.apiCall({
  type: cx.GET_ITEM,
  method: apiClient.get,
  path: action => `users/tabs/${action.payload.tab}/items/${action.payload.item}`,
  success: res => ({ item: res.data })
})

const getItems = async.apiCall({
  type: cx.GET_ITEMS,
  path: action => `users/tabs/${action.payload.tab}/items`,
  method: apiClient.get,
  success: res => ({ items: res.data })
})

const sortItems = async.apiCall({
  type: cx.SORT_ITEMS,
  path: action => `users/tabs/${action.payload.tab.id}/sort`,
  method: apiClient.patch
})

function* createItem (action) {
  try {
    yield async.reportPending(cx.CREATE_ITEM)

    let { tab_id } = action.payload

    if (!tab_id) {
      const tab = yield call(apiClient.post, 'users/tabs', { name: 'Untitled' })
      tab_id = tab.id
    }

    const { image_file, questions, ...payload } = action.payload

    const newItem = {
      tab_id,
      ...payload
    }

    if (image_file) {
      const formData = new window.FormData()
      formData.append('image[image_file]', image_file)
      const imageItem = yield call(apiClient.post, 'users/images', formData)
      newItem.image_id = imageItem.data.id
    }

    const res = yield call(apiClient.post, `users/tabs/${tab_id}/items`, newItem)
    yield put({ type: cx.CREATE_ITEM_SUCCESS, payload: { item: res.data } })

    if (questions.length > 0) {
      yield call(apiClient.patch, `batch`, getQuestionsData(tab_id, res.data.id, questions))
    }

    yield async.reportSuccess(cx.CREATE_ITEM)
  } catch (err) {
    yield async.reportFailure(cx.CREATE_ITEM)
    yield async.reportError(cx.CREATE_ITEM, err)
  }
}

function* updateItem (action) {
  try {
    yield async.reportPending(cx.UPDATE_ITEM)

    const { tab_id, image_file, ...payload } = action.payload

    const updatedItem = {
      tab_id,
      ...payload
    }

    if (image_file) {
      const formData = new window.FormData()
      formData.append('image[image_file]', image_file)
      const imageItem = yield call(apiClient.post, 'users/images', formData)
      updatedItem.image_id = imageItem.data.id
    }

    const res = yield call(apiClient.put, `users/tabs/${tab_id}/items/${action.payload.id}`, updatedItem)
    yield put({ type: cx.UPDATE_ITEM_SUCCESS, payload: { item: res.data } })
    yield async.reportSuccess(cx.UPDATE_ITEM)
  } catch (err) {
    yield async.reportFailure(cx.UPDATE_ITEM)
    yield async.reportError(cx.UPDATE_ITEM, err)
  }
}

function* deleteItem (action) {
  try {
    yield async.reportPending(cx.DELETE_ITEM)
    yield call(apiClient.delete, `users/tabs/${action.payload.tab_id}/items/${action.payload.id}`, action.payload)
    yield put({ type: cx.DELETE_ITEM_SUCCESS, payload: { itemId: action.payload.id } })
    yield async.reportSuccess(cx.DELETE_ITEM)
  } catch (err) {
    yield async.reportFailure(cx.DELETE_ITEM)
    yield async.reportError(cx.DELETE_ITEM, err)
  }
}

export default function* rootSaga () {
  yield takeLatest(cx.GET_ITEMS, getItems)
  yield takeLatest(cx.GET_ITEM, getItem)
  yield takeLatest(cx.CREATE_ITEM, createItem)
  yield takeEvery(cx.UPDATE_ITEM, updateItem)
  yield takeEvery(cx.DELETE_ITEM, deleteItem)
  yield takeEvery(cx.SORT_ITEMS, sortItems)
}
