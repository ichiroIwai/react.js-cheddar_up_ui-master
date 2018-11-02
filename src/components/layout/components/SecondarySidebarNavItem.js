
import React from 'react'
import { css } from 'aphrodite'
import tx from 'theme/utilities'

export default props =>
  <div className={css(tx.color_black, tx.flex, tx.alignCenter)}>
    <Choose>
      <When condition={props.img}>
        <img {...props.img} role='presentation' />
      </When>
      <When condition={props.icon}>
        {props.icon}
      </When>
    </Choose>
    <div>{props.label}</div>
  </div>
