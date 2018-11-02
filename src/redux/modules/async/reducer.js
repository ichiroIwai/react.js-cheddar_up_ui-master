
import { STATUS, ERROR } from './constants'
import { LOCATION_CHANGE } from '@bentatum/react-router-redux'

const initialState = {
  errors: {},
  statuses: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const { location } = action.payload
      if (location.state && location.state.preserveStatuses) {
        return state
      }
      return {
        errors: {},
        statuses: {}
      }
    }
    case STATUS: {
      const { type, status } = action.payload
      const { statuses } = state
      statuses[type] = status
      return { ...state, statuses }
    }
    case ERROR: {
      const { type, error } = action.payload
      const { errors } = state
      errors[type] = error
      return { ...state, errors }
    }
    default:
      return state
  }
}
