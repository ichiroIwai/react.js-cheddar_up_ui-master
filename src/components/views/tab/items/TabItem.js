
import React from 'react'
import { get } from 'lodash'
import numeral from 'numeral'
import { Panel } from 'elements'
import tx from 'theme/utilities'
import { Link } from 'react-router-dom'
import { compose, pure, setDisplayName } from 'recompose'
import { tabItemPath } from 'views/tab/items/helpers'
import { StyleSheet, css } from 'aphrodite/no-important'
import { default as ItemControls, id as itemControlsId } from './ItemControls'

const sx = StyleSheet.create({
  container: {
    [`:hover #${itemControlsId}`]: {
      opacity: 1
    }
  },
  img: {
    height: 100,
    width: 100,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  imgDefault: {
    backgroundSize: '70%'
  }
})

const enhance = compose(
  setDisplayName('views/tab/items/TabItem'),
  pure
)

export default enhance(({
  tab,
  item
}) =>
  <Panel>
    <div className={css(tx.flex)}>
      <div
        className={css(sx.img, !item.image && sx.imgDefault)}
        style={{
          backgroundImage: `url(${get(item, 'image.image_file.url', require('theme/images/ItemIcon.svg'))})`
        }} />
      <div className={css(tx.borderLeft, sx.container, tx.openSans, tx.p1, tx.col12, tx.flex, tx.flexColumn, tx.justifySpaceBetween)}>
        <div className={css(tx.flex, tx.justifySpaceBetween, tx.relative)}>
          <h4 className={css(tx.openSans, tx.color_teal)}>
            {item.name}
          </h4>
          <ItemControls item={item} />
        </div>
        <div className={css(tx.fontSize4, tx.mb1)}>
          {!item.amount ? 'Donation' : numeral(item.amount).format('$0,0.00')}
        </div>
        <div className={css(tx.flex, tx.justifySpaceBetween, tx.fontSize6)}>
          <div>Collected {numeral(item.collected).format('$0,0.00')}</div>
          <div className={css(tx.color_teal)}>
            <Link to={tabItemPath(tab, item)}>
              Item Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Panel>
)
