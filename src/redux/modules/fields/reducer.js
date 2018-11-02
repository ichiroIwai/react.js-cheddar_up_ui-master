
import * as cx from './constants'
import { LOCATION_CHANGE } from '@bentatum/react-router-redux'
import { success } from 'redux/modules/async/helpers'
import { reject } from 'lodash'

const initialState = {
  questions: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.CREATE_QUESTIONS): {
      const { questions } = action.payload
      return {
        ...state,
        questions: questions
      }
    }
    case success(cx.CREATE_QUESTION): {
      const { question } = action.payload
      const { questions } = state
      questions.push(question)
      return {
        ...state,
        questions: questions
      }
    }
    case success(cx.GET_QUESTIONS): {
      const { questions } = action.payload
      questions.map(q => {
        if (q.field_type === 'multiple_choice') {
          q.options = []
          q.values.split(',').map((qo, idx) => (
            q.options.push({ children: qo, value: idx.toString() })
          ))
        }
      })
      return {
        ...state,
        questions: questions
      }
    }
    case success(cx.DELETE_QUESTION): {
      const { questionId } = action.payload
      const { questions } = state

      return {
        ...state,
        questions: reject(questions, (q) => (q.id === questionId))
      }
    }
    case LOCATION_CHANGE:
      return {
        ...state,
        questions: []
      }
    default:
      return state
  }
}
