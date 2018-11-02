
import React from 'react'
import { connect } from 'react-redux'
import { filter, reject } from 'lodash'
import { TabsListFolder, TabsListItem } from 'views/tabs'
import createTabIcon from 'theme/images/CreateTabIcon.svg'
import tx from 'theme/utilities'
import { css, StyleSheet } from 'aphrodite/no-important'
import { GET_TABS } from 'redux/modules/tabs/constants'

const sx = StyleSheet.create({
  subtitle: {
    maxWidth: '630px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

const enhance = connect(({ tabs: { folders, tabs }, async: {statuses} }) => ({ folders, tabs, status: statuses[GET_TABS] }))

export default enhance(props => {
  const noFolder = reject(props.tabs, i => i.folder)
  const inFolder = filter(props.tabs, i => i.folder)

  return (
    <div>
      <If condition={props.status === 'success' && (!props.tabs || props.tabs.length === 0)}>
        <div className={css(tx.textAlignCenter)} >
          <h1 className={css(tx.py2)}>
            Let's get started!
          </h1>
          <div className={css(tx.fontSize2, tx.mb3, sx.subtitle)}>Create a tab and move payments, forms and tracking online. You can share your tab via invitation or link and withdraw $ directly into your bank account.</div>
          <img src={createTabIcon} width='140px' role='presentation' />
        </div>
      </If>

      {noFolder.map((tab, key) =>
        <TabsListItem
          key={key}
          isLast={key === (noFolder.length - 1)}
          tab={tab} />
      )}
      {props.folders.map((folder, key) => {
        const folderContents = filter(inFolder, { folder: { id: folder.id } })

        if (!folderContents.length) {
          return null
        }

        return (
          <TabsListFolder key={key} folder={folder}>
            {folderContents.map((folderItem, key) =>
              <TabsListItem key={key} tab={folderItem} />
            )}
          </TabsListFolder>
        )
      })}
    </div>
  )
})
