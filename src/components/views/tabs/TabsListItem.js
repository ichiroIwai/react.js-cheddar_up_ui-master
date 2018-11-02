
import React from 'react'
import moment from 'moment'
import tx from 'theme/utilities'
import { Link } from 'react-router-dom'
import * as fonts from 'theme/fonts'
import { tabImgPath, moneyFormatter } from 'helpers'
import { borderRadius } from 'theme/constants'
import { StyleSheet, css } from 'aphrodite/no-important'
import addToFolderIcon from 'theme/images/AddToFolderIcon.svg'
import { SmallMoreButton } from 'elements'

const sx = StyleSheet.create({
  outer: {
    fontFamily: [fonts.OpenSans, 'sans-serif']
  },
  name: {
    fontFamily: [fonts.OpenSans, 'sans-serif']
  },
  img: {
    height: 102,
    width: 102,
    borderRadius
  },
  ctrl: {
    height: 30,
    width: 30,
    borderRadius
  },
  ellipsis: {
    position: 'relative',
    bottom: 5
  },
  tabImg: {
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  defaultImg: {
    backgroundSize: 'inherit'
  }
})

export default ({ tab, isLast }) => {
  const cx = css(
    sx.outer,
    !isLast && tx.borderBottom,
    !isLast && tx.mb2,
    tx.pb2,
    tx.flex,
    tx.alignCenter
  )
  return (
    <div className={cx}>
      <div className={css(tx.col10xs, tx.col10sm, tx.col10md, tx.col4lg, tx.col4xl, tx.flex)}>
        <div className={css(tx.hide_medium, tx.mr2)}>
          <Choose>
            <When condition={tab.image}>
              <div
                className={css(sx.img, sx.tabImg)}
                style={{ backgroundImage: `url(${tabImgPath(tab)})` }} />
            </When>
            <Otherwise>
              <img
                src={require('theme/images/TabImageIcon.svg')}
                role='presentation'
                className={css(sx.img)} />
            </Otherwise>
          </Choose>
        </div>
        <div>
          <h3 className={css(sx.name, tx.color_teal, tx.mb0)}>
            {tab.name}
          </h3>
          <div className={css(tx.fontSize6, tx.mb0)}>
            {tab.closed_at ? 'Closed' : 'Created'} on {moment(tab[tab.closed_at ? 'closed_at' : 'created_at']).format('MM/DD/YYYY')}
          </div>
          <div className={css(tx.fontSize6, tx.flex, tx.color_teal, tx.mb0)}>
            <div className={css(tx.hide_medium)}>Replicate</div>
            <div className={css(tx.mx0, tx.hide_medium)}>|</div>
            <div>{!tab.closed_at ? 'Close' : 'ReOpen'}</div>
            <div className={css(tx.mx0)}>|</div>
            <div>Preview</div>
          </div>
          <div className={css(tx.show_medium)}>$00.00</div>
        </div>
      </div>
      <div className={css(tx.col3, tx.flex, tx.justifyCenter, tx.fontSize6, tx.hide_medium)}>
        {tab.closed_at ? 'Closed' : 'Active'}
      </div>
      <div className={css(tx.col3, tx.flex, tx.justifyCenter, tx.hide_medium)}>
        <div className={css(tx.flex, tx.flexColumn, tx.alignFlexEnd)}>
          <div>{moneyFormatter(tab.payments_total)}</div>
          <div className={css(tx.fontSize6)}>Collected</div>
        </div>
      </div>
      <div className={css(tx.col2, tx.flex, tx.justifyFlexEnd)}>
        <div className={css(tx.hide_medium)}>
          <div
            className={css(
              sx.ctrl,
              tx.backgroundColor_lighterGray,
              tx.flex,
              tx.alignCenter,
              tx.justifyCenter
            )}>
            <img
              role='presentation'
              src={addToFolderIcon} />
          </div>
        </div>
        <div className={css(tx.pl0)}>
          <Link to={`/tab/${tab.id}`}>
            <SmallMoreButton />
          </Link>
        </div>
      </div>
    </div>
  )
}
