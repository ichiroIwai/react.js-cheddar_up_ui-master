
import React from 'react'
import DropZone from 'react-dropzone'
import { defaultProps } from 'recompose'

const enhance = defaultProps({
  meta: {}
})

export default enhance(({
  input,
  meta: { touched, error, warning },
  ...props
}) =>
  <DropZone
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}
    onDrop={files => input.onChange(files[0])}
    {...props} />
)
