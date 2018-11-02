
import React from 'react'
import striptags from 'striptags'
import tx from 'theme/utilities'
import { find, get } from 'lodash'
import * as fonts from 'theme/fonts'
import { tabImgPath } from 'helpers'
import { connect } from 'react-redux'
import ThemeHeading from './ThemeHeading'
import { Field, reduxForm } from 'redux-form'
import { scale, breakpoints } from 'theme/constants'
import { StyleSheet, css } from 'aphrodite/no-important'
import { CREATE_TAB, UPDATE_TAB } from 'redux/modules/tabs/constants'
import { FileInput, Status, Input, AddImageIconText, Button, Panel } from 'elements'
import { renderNothing, mapProps, setPropTypes, branch, setDisplayName, compose } from 'recompose'

export const displayName = 'views/tab/details/Form'

const sx = StyleSheet.create({
  textarea: {
    resize: 'vertical',
    height: '100%'
  },
  textareaOuter: {
    [`@media (max-width: ${breakpoints.medium}px)`]: {
      marginBottom: scale[1]
    }
  },
  imgContainer: {
    [`@media (min-width: ${breakpoints.medium}px)`]: {
      paddingLeft: scale[1]
    }
  },
  applyTheme: {
    fontFamily: [fonts.AvenirRoman]
  },
  applyThemeIcon: {
    height: 63
  },
  tabImg: {
    maxHeight: 159,
    maxWidth: '100%'
  }
})

const enhance = compose(
  setDisplayName(displayName),
  setPropTypes({
    onSubmit: React.PropTypes.func,
    tab: React.PropTypes.object
  }),
  branch(
    ({ edit, tab }) => edit && !tab,
    renderNothing,
    x => x
  ),
  connect(
    ({
      async: { statuses },
      themes: { themes },
      tabs: { imageId }
    }) => ({
      themes,
      status: statuses[CREATE_TAB] || statuses[UPDATE_TAB]
    })
  ),
  mapProps(props => {
    const mapped = { ...props }
    if (props.tab) {
      const { name, description, image } = props.tab
      mapped.initialValues = {
        name,
        image,
        description: striptags(description)
      }
    }
    return mapped
  }),
  reduxForm({
    form: displayName,
    validate (values) {
      const err = {}
      if (!values.name) {
        err.name = 'Tab name required'
      }
      return err
    }
  })
)

export default enhance(({
  tab,
  user,
  edit,
  themes,
  status,
  imageId,
  onSubmit,
  handleSubmit,
  onThemeRemoval
}) => {
  const theme = find(themes, { id: get(tab, 'theme_id') })
  const tabImg = tabImgPath(tab)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <If condition={themes.length}>
        <div className={css(tx.mb1)}>
          <ThemeHeading
            tab={tab}
            onCancel={() => onThemeRemoval({ ...tab, imageId, theme_id: null })}
            theme={theme} />
        </div>
      </If>
      <Field
        type='text'
        name='name'
        component={Input}
        className={css(tx.mb1)}
        placeholder='Give your tab a name (required)' />
      <div className={css(tx.flex, tx.flexWrap)}>
        <div className={css(
          sx.textareaOuter,
          tx.col12xs,
          tx.col12sm,
          tx.col12md,
          tx.col8lg,
          tx.col8xl
        )}>
          <Field
            name='description'
            component='textarea'
            className={css(sx.textarea)}
            placeholder='Add a description' />
        </div>
        <div className={css(
          sx.imgContainer,
          tx.col12xs,
          tx.col12sm,
          tx.col12md,
          tx.col4lg,
          tx.col4xl
        )}>
          <Panel>
            <Field
              name='image'
              component={FileInput}>
              <div className={css(tx.flex, tx.flexColumn, tx.justifyCenter, tx.alignCenter)}>
                <Choose>
                  <When condition={tab && tabImg}>
                    <img
                      role='presentation'
                      src={tabImg}
                      className={css(sx.tabImg)} />
                  </When>
                  <Otherwise>
                    <AddImageIconText />
                  </Otherwise>
                </Choose>
              </div>
            </Field>
          </Panel>
        </div>
      </div>
      <div className={css(tx.mt2, tx.alignCenter)}>
        <Button backgroundColor='primary'>
          {tab && tab.id ? 'Save' : 'Save and Continue'}
        </Button>
        <If condition={status}>
          <div className={css(tx.mt2)}>
            <Status
              status={status}
              messages={{
                pending: tab ? 'Saving...' : 'Creating new tab...',
                success: 'Tab saved',
                failure: 'Something went wrong.'
              }} />
          </div>
        </If>
      </div>
    </form>
  )
})
