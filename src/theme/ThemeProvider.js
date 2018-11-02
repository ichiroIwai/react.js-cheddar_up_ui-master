
import 'theme/globals'
import { PropTypes } from 'react'
import { withContext } from 'recompose'
import { colors } from 'theme/constants'

const enhance = withContext(
  {
    reactIconBase: PropTypes.object,
    betterReactSpinkit: PropTypes.object
  },
  () => ({
    reactIconBase: {
      size: 18
    },
    betterReactSpinkit: {
      color: colors.primary
    }
  })
)

export default enhance(props => props.children)
