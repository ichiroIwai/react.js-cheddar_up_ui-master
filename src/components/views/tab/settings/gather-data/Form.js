
import { SwitchBox } from 'elements'
import { default as React, PropTypes } from 'react'
import { setPropTypes, setDisplayName, compose, pure } from 'recompose'

const enhance = compose(
  setDisplayName('views/tab/settings/gather-data/Form'),
  setPropTypes({
    onSubmit: PropTypes.func.isRequired
  }),
  pure
)

export default enhance(({ tab, onSubmit }) =>
  <SwitchBox
    id='report'
    label='Generate Visitor Report'
    input={{value: tab ? tab.payer_identify : ''}}
    onChange={e => onSubmit({ payer_identify: e.target.checked })} />
)
