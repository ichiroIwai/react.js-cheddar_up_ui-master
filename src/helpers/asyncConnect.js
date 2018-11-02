
import React from 'react'
import { getContext } from 'recompose'

export default depsMapper => Component => {
  @getContext({
    store: React.PropTypes.object
  })
  class AsyncConnect extends React.PureComponent {
    componentDidMount () {
      this.getDeps(this.props)
    }

    componentWillReceiveProps (next) {
      this.getDeps(next)
    }

    getDeps (props) {
      const { async: { statuses } } = props.store.getState()
      const deps = typeof depsMapper === 'function' ? depsMapper(props) : depsMapper
      deps.forEach(({ key, promise, payload }) => {
        if (!statuses[key]) {
          props.store.dispatch(promise(payload))
        }
      })
    }

    render () {
      return (
        <Component {...this.props} />
      )
    }
  }

  return AsyncConnect
}
