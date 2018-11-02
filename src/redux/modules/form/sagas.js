/* eslint-disable camelcase */
import * as cx from './constants'
import { apiClient } from 'helpers'
import * as async from 'redux/modules/async/helpers'
import { takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import { getQuestionsData } from 'redux/modules/fields/helpers'

const getForm = async.apiCall({
  type: cx.GET_FORM,
  method: apiClient.get,
  path: action => `users/tabs/${action.payload.tab}/forms/${action.payload.form}`,
  success: res => ({ form: res.data })
})

const getForms = async.apiCall({
  type: cx.GET_FORMS,
  path: action => `users/tabs/${action.payload.tab}/forms`,
  method: apiClient.get,
  success: res => ({ forms: res.data })
})

const sortForms = async.apiCall({
  type: cx.SORT_FORMS,
  path: action => `users/tabs/${action.payload.tab.id}/sort`,
  method: apiClient.patch
})

function* createForm (action) {
  try {
    yield async.reportPending(cx.CREATE_FORM)

    let { tab_id } = action.payload

    if (!tab_id) {
      const tab = yield call(apiClient.post, 'users/tabs', { name: 'Untitled' })
      tab_id = tab.id
    }

    const { questions, ...payload } = action.payload
    const newForm = {
      tab_id,
      ...payload
    }

    const res = yield call(apiClient.post, `users/tabs/${tab_id}/forms`, newForm)
    yield put({ type: success(cx.CREATE_FORM), payload: { form: res.data } })

    if (questions.length > 0) {
      yield call(apiClient.patch, `batch`, getQuestionsData(tab_id, res.data.id, questions))
    }

    yield async.reportSuccess(cx.CREATE_FORM)
  } catch (err) {
    yield async.reportFailure(cx.CREATE_FORM)
    yield async.reportError(cx.CREATE_FORM, err)
  }
}

function* updateForm (action) {
  try {
    yield async.reportPending(cx.UPDATE_FORM)

    const { tab_id, ...payload } = action.payload
    const updatedForm = {
      tab_id,
      ...payload
    }

    const res = yield call(apiClient.put, `users/tabs/${tab_id}/forms/${action.payload.id}`, updatedForm)
    yield put({ type: success(cx.UPDATE_FORM), payload: { form: res.data } })
    yield async.reportSuccess(cx.UPDATE_FORM)
  } catch (err) {
    yield async.reportFailure(cx.UPDATE_FORM)
    yield async.reportError(cx.UPDATE_FORM, err)
  }
}

function* deleteForm (action) {
  try {
    yield async.reportPending(cx.DELETE_FORM)
    yield call(apiClient.delete, `users/tabs/${action.payload.tab_id}/forms/${action.payload.id}`, action.payload)
    yield put({ type: succcess(cx.DELETE_FORM), payload: { formId: action.payload.id } })
    yield async.reportSuccess(cx.DELETE_FORM)
  } catch (err) {
    yield async.reportFailure(cx.DELETE_FORM)
    yield async.reportError(cx.DELETE_FORM, err)
  }
}

export default function* rootSaga () {
  yield takeLatest(cx.GET_FORMS, getForms)
  yield takeLatest(cx.GET_FORM, getForm)
  yield takeLatest(cx.CREATE_FORM, createForm)
  yield takeEvery(cx.UPDATE_FORM, updateForm)
  yield takeEvery(cx.DELETE_FORM, deleteForm)
  yield takeEvery(cx.SORT_FORMS, sortForms)
}
