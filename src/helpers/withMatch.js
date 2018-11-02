
import { omit } from 'lodash'
import { mapProps } from 'recompose'

export default mapProps(props => omit(props, [
  'block',
  'listen',
  'go',
  'goForward',
  'push',
  'goBack',
  'length',
  'location',
  'createHref',
  'replace'
]))
