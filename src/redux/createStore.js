
import sagas from 'redux/sagas'
import reducer from './reducer'
import DevTools from './DevTools'
import createSagaMiddleware from 'redux-saga'
import storageMiddleware from 'redux-simplestorage'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { applyMiddleware, compose, createStore } from 'redux'

export const sagaMiddleware = createSagaMiddleware()

export default initialState => {
  const middleware = [
    sagaMiddleware,
    storageMiddleware
  ]

  const enhancer = compose(
    responsiveStoreEnhancer,
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
  )

  const store = createStore(reducer, initialState, enhancer)

  sagaMiddleware.run(sagas)

  return store
}
