/* eslint-disable camelcase */
import * as cx from './constants'
import { apiClient } from 'helpers'
import * as async from 'redux/modules/async/helpers'
import { takeEvery, takeLatest, call, put } from 'redux-saga/effects'

const getCategory = async.apiCall({
  type: cx.GET_CATEGORY,
  method: apiClient.get,
  path: action => `users/tabs/${action.payload.tab}/categories/${action.payload.item}`,
  success: res => ({ category: res.data })
})

const getCategories = async.apiCall({
  type: cx.GET_CATEGORIES,
  path: action => `users/tabs/${action.payload.tab}/categories`,
  method: apiClient.get,
  success: res => ({ categories: res.data })
})

const sortCategories = async.apiCall({
  type: cx.SORT_CATEGORIES,
  path: action => `users/tabs/${action.payload.tab.id}/sort`,
  method: apiClient.patch
})

function* createCategory (action) {
  try {
    yield async.reportPending(cx.CREATE_CATEGORY)

    let { tab_id } = action.payload

    if (!tab_id) {
      const tab = yield call(apiClient.post, 'users/tabs', { name: 'Untitled' })
      tab_id = tab.id
    }

    const { ...payload } = action.payload

    const newCategory = {
      tab_id,
      ...payload
    }

    const res = yield call(apiClient.post, `users/tabs/${tab_id}/categories`, newCategory)
    yield put({ type: cx.CREATE_CATEGORY_SUCCESS, payload: { category: res.data } })
    yield async.reportSuccess(cx.CREATE_CATEGORY)
  } catch (err) {
    yield async.reportFailure(cx.CREATE_CATEGORY)
    yield async.reportError(cx.CREATE_CATEGORY, err)
  }
}

function* deleteCategory (action) {
  try {
    yield async.reportPending(cx.DELETE_CATEGORY)
    yield call(apiClient.delete, `users/tabs/${action.payload.tab_id}/categories/${action.payload.id}`)
    yield put({ type: cx.DELETE_CATEGORY_SUCCESS, payload: { categoryId: action.payload.id } })
    yield async.reportSuccess(cx.DELETE_CATEGORY)
  } catch (err) {
    yield async.reportFailure(cx.DELETE_CATEGORY)
    yield async.reportError(cx.DELETE_CATEGORY, err)
  }
}

function* updateCategory (action) {
  try {
    yield async.reportPending(cx.UPDATE_CATEGORY)
    const res = yield call(apiClient.put, `users/tabs/${action.payload.tab_id}/categories/${action.payload.id}`, action.payload)
    yield put({ type: cx.UPDATE_CATEGORY_SUCCESS, payload: { category: res.data } })
    yield async.reportSuccess(cx.UPDATE_CATEGORY)
  } catch (err) {
    yield async.reportFailure(cx.UPDATE_CATEGORY)
    yield async.reportError(cx.UPDATE_CATEGORY, err)
  }
}

export default function* rootSaga () {
  yield takeLatest(cx.CREATE_CATEGORY, createCategory)
  yield takeLatest(cx.GET_CATEGORIES, getCategories)
  yield takeLatest(cx.GET_CATEGORY, getCategory)
  yield takeEvery(cx.UPDATE_CATEGORY, updateCategory)
  yield takeEvery(cx.DELETE_CATEGORY, deleteCategory)
  yield takeEvery(cx.SORT_CATEGORIES, sortCategories)
}
