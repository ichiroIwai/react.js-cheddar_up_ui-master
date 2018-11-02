
import * as cx from './constants'

export function createQuestion (payload) {
  return { type: cx.CREATE_QUESTION, payload }
}

export function createQuestions (payload) {
  return { type: cx.CREATE_QUESTIONS, payload }
}

export function getQuestions (payload) {
  return { type: cx.GET_QUESTIONS, payload }
}

export function updateQuestions (payload) {
  return { type: cx.UPDATE_QUESTIONS, payload }
}

export function deleteQuestion (payload) {
  return { type: cx.DELETE_QUESTION, payload }
}
