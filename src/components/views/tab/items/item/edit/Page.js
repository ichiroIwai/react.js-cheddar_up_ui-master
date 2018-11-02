
import React from 'react'
import { connect } from 'react-redux'
import { PanelOverlayLayout } from 'layout'
import asyncConnect from 'helpers/asyncConnect'
import { Nav as ItemsNav, ItemForm } from 'views/tab/items'
import { getTab } from 'redux/modules/tabs/actions'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { setDisplayName, withHandlers, mapProps } from 'recompose'
import { getItem, updateItem } from 'redux/modules/items/actions'
import { GET_ITEM, UPDATE_ITEM } from 'redux/modules/items/constants'
import { updateQuestions, getQuestions } from 'redux/modules/fields/actions'
import { GET_QUESTIONS, UPDATE_QUESTIONS } from 'redux/modules/fields/constants'
import { Nav as TabNav } from 'views/tab'
import { UserDrawerNav } from 'elements'

@setDisplayName('views/tab/items/item/edit/Page')
@asyncConnect(props => {
  const promises = []
  const { tab, item } = props.match.params

  if (tab && tab !== 'create') {
    promises.push({ key: GET_TAB, promise: getTab, payload: { tab } })
    promises.push({ key: GET_ITEM, promise: getItem, payload: { tab, item } })
    promises.push({ key: GET_QUESTIONS, promise: getQuestions, payload: { tab, item } })
  }
  return promises
})
@connect(
  ({
    tabs: { tab },
    items: { item },
    fields: { questions },
    async: { statuses }
  }) => ({
    tab,
    item,
    questions,
    status: statuses[UPDATE_ITEM] || statuses[UPDATE_QUESTIONS],
    getQuestionsStatus: statuses[GET_QUESTIONS]
  }),
  {
    updateItem,
    getQuestions,
    updateQuestions
  }
)
@withHandlers({
  handleSubmit: ({ updateItem, updateQuestions, match: { params } }) => ({amount_type: amountType, questions, ...data}) => {
    updateItem({
      id: params.item,
      ...data,
      tab_id: params.tab,
      amount_type: amountType !== 'open' ? 'fixed' : 'open',
      amount: amountType !== 'open' && amountType
    })

    console.log(questions)
    updateQuestions({
      item_id: params.item,
      tab_id: params.tab,
      questions
    })
  }
})
@mapProps(props => {
  const mapped = { ...props }
  if (props.item) {
    mapped.initialValues = {
      name: props.item.name,
      amount_type: props.item.amount_type === 'fixed' ? props.item.amount : 'open',
      allow_quantity: props.item.allow_quantity,
      quantity_limit: props.item.quantity_limit,
      required: props.item.required
    }
  }
  return mapped
})
export default class Page extends React.PureComponent {
  componentWillReceiveProps (next) {
    if (this.props.status !== 'success' && next.status === 'success') {
      return this.props.push(`/tab/${next.tab.id}/items`)
    }
  }

  render () {
    const { status, tab, initialValues, handleSubmit, saveQuestions, getQuestionsStatus, questions, removeQuestion } = this.props

    return (
      <PanelOverlayLayout
        primarySidebar={{ tab, nav: <TabNav /> }}
        secondaryNavbar={{ tab }}
        drawerMenu={{ children: <UserDrawerNav /> }}
        secondarySidebar={{ nav: <ItemsNav /> }}>
        <If condition={initialValues && getQuestionsStatus === 'success'}>
          <ItemForm
            status={status}
            statusMessages={{
              pending: 'Saving item...'
            }}
            initialValues={initialValues}
            initialQuestions={questions}
            onSubmit={handleSubmit}
            saveQuestions={saveQuestions}
            deleteQuestion={removeQuestion} />
        </If>
      </PanelOverlayLayout>
    )
  }
}
