
import React from 'react'
import tx from 'theme/utilities'
import cameraIcon from 'theme/images/Camera.svg'
import { StyleSheet, css } from 'aphrodite/no-important'

const sx = StyleSheet.create({
  camera: {
    height: 50
  }
})

export default () =>
  <div className={css(tx.p3, tx.textAlignCenter, tx.color_gray)}>
    <img
      src={cameraIcon}
      role='presentation'
      className={css(sx.camera, tx.mb0)} />
    <h4 className={css(tx.noWrap)}>
      Add Image
    </h4>
  </div>
