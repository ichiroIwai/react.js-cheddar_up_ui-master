/* eslint-disable camelcase */
import * as cx from './constants'
import { apiClient } from 'helpers'
import * as async from 'redux/modules/async/helpers'
import { takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import { getQuestionsData, getQuestionsResult } from 'redux/modules/fields/helpers'

function* createQuestion (action) {
  try {
    yield async.reportPending(cx.CREATE_QUESTION)

    const q = action.payload.question
    const data = {
      field: {
        name: q.name,
        field_type: q.field_type,
        required: !!q.required,
        position: q.idx,
        values: q.options ? q.options.map(qo => qo.children).join(',') : null
      }
    }

    const res = yield call(apiClient.post, `users/tabs/${action.payload.tab}/items/${action.payload.item}/fields`, data)
    yield put({ type: async.success(cx.CREATE_QUESTION), payload: { question: res.data } })

    yield async.reportSuccess(cx.CREATE_QUESTION)
  } catch (err) {
    yield async.reportFailure(cx.CREATE_QUESTION)
    yield async.reportError(cx.CREATE_QUESTION, err)
  }
}

function* createQuestions (action) {
  try {
    yield async.reportPending(cx.CREATE_QUESTIONS)
    const { tab, item, questions } = action.payload
    const batchRes = yield call(apiClient.patch, `batch`, getQuestionsData(tab, item, questions))
    const { succeed } = getQuestionsResult(batchRes.data.results)
    yield put({ type: async.success(cx.CREATE_QUESTIONS), payload: { questions: succeed } })
    yield async.reportSuccess(cx.CREATE_QUESTIONS)
  } catch (err) {
    yield async.reportFailure(cx.CREATE_QUESTIONS)
    yield async.reportError(cx.CREATE_QUESTIONS, err)
  }
}

function* getQuestions (action) {
  try {
    yield async.reportPending(cx.GET_QUESTIONS)
    const res = yield call(apiClient.get, `users/tabs/${action.payload.tab}/items/${action.payload.item}/fields`)
    yield put({ type: async.success(cx.GET_QUESTIONS), payload: { questions: res.data } })
    yield async.reportSuccess(cx.GET_QUESTIONS)
  } catch (err) {
    yield async.reportFailure(cx.GET_QUESTIONS)
    yield async.reportError(cx.GET_QUESTIONS, err)
  }
}

function* getQuestion (action) {
  try {
    yield async.reportPending(cx.GET_QUESTION)
    const res = yield call(apiClient.get, `users/tabs/${action.payload.tab}/items/${action.payload.item}/fields/${action.payload.question}`)
    yield put({ type: async.success(cx.GET_QUESTION), payload: { question: res.data } })
    yield async.reportSuccess(cx.GET_QUESTION)
  } catch (err) {
    yield async.reportFailure(cx.GET_QUESTION)
    yield async.reportError(cx.GET_QUESTION, err)
  }
}

function* deleteQuestion (action) {
  try {
    yield async.reportPending(cx.DELETE_QUESTION)
    yield call(apiClient.delete, `users/tabs/${action.payload.tab}/items/${action.payload.item}/fields/${action.payload.questionId}`)
    yield put({ type: async.success(cx.DELETE_QUESTION), payload: { questionId: action.payload.questionId } })
    yield async.reportSuccess(cx.DELETE_QUESTION)
  } catch (err) {
    yield async.reportFailure(cx.DELETE_QUESTION)
    yield async.reportError(cx.DELETE_QUESTION, err)
  }
}

function* updateQuestion (action) {
  try {
    yield async.reportPending(cx.UPDATE_QUESTION)
    const res = yield call(apiClient.put, `users/tabs/${action.payload.tab}/items/${action.payload.item}/fields/${action.payload.question}`, action.payload)
    yield put({ type: async.success(cx.UPDATE_QUESTION), payload: { question: res.data } })
    yield async.reportSuccess(cx.UPDATE_QUESTION)
  } catch (err) {
    yield async.reportFailure(cx.UPDATE_QUESTION)
    yield async.reportError(cx.UPDATE_QUESTION, err)
  }
}

function* updateQuestions (action) {
  try {
    yield async.reportPending(cx.UPDATE_QUESTIONS)

    const { tab_id, item_id, questions } = action.payload
    const batchRes = yield call(apiClient.patch, `batch`, getQuestionsData(tab_id, item_id, questions))
    const { succeed } = getQuestionsResult(batchRes.data.results)
    yield put({ type: async.success(cx.UPDATE_QUESTIONS), payload: { questions: succeed } })

    yield async.reportSuccess(cx.UPDATE_QUESTIONS)
  } catch (err) {
    yield async.reportFailure(cx.UPDATE_QUESTIONS)
    yield async.reportError(cx.UPDATE_QUESTIONS, err)
  }
}

export default function* rootSaga () {
  yield takeLatest(cx.CREATE_QUESTION, createQuestion)
  yield takeLatest(cx.CREATE_QUESTIONS, createQuestions)
  yield takeLatest(cx.GET_QUESTIONS, getQuestions)
  yield takeLatest(cx.GET_QUESTION, getQuestion)
  yield takeEvery(cx.UPDATE_QUESTION, updateQuestion)
  yield takeEvery(cx.UPDATE_QUESTIONS, updateQuestions)
  yield takeEvery(cx.DELETE_QUESTION, deleteQuestion)
}
