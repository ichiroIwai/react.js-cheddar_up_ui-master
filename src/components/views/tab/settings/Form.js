
import React from 'react'
import { connect } from 'react-redux'
import tx from 'theme/utilities'
import { Field, reduxForm } from 'redux-form'
import moment from 'moment'
import { css, StyleSheet } from 'aphrodite/no-important'
import { Expander, Button } from 'elements'
import { UPDATE_TAB } from 'redux/modules/tabs/constants'
import { setPropTypes, setDisplayName, compose, mapProps } from 'recompose'
import { Feature } from 'components/views/tab/settings'
import { colors } from 'theme/constants'

import timingIcon from 'theme/images/Timing.aqua.svg'
import codeIcon from 'theme/images/Code.aqua.svg'
import dataIcon from 'theme/images/Data.aqua.svg'
import GearIcon from 'react-icons/lib/io/android-settings'

const sx = StyleSheet.create({
  borderless: {
    border: 0,
    width: `100%`,
    maxWidth: `100%`
  },
  settingValue: {
    color: colors.teal
  }
})

export const displayName = 'view/tab/settings/optional'

const settings = [
  {
    id: 'enable_processing_preference',
    name: 'enable_processing_preference',
    label: 'Cover fees for your payers'
  },
  {
    id: 'display_member_list',
    name: 'display_member_list',
    label: 'Make list of payers public'
  },
  {
    id: 'display_total_collected',
    name: 'display_total_collected',
    label: 'Make total collected public'
  },
  {
    id: 'allow_offline_payments',
    name: 'allow_offline_payments',
    label: 'Allow cash or check payments',
    description: (
      <Field
        component='textarea'
        name='offline_payment_instructions'
        className={css(sx.borderless)}
        placeholder='Optional: Provide mailing or delivery details for those who choose to pay by cash or check' />
    )
  }
]

const enhance = compose(
  setDisplayName(displayName),
  setPropTypes({
    onSubmit: React.PropTypes.func,
    tab: React.PropTypes.object
  }),
  connect(
    ({
      themes: { themes },
      async: { statuses }
    }) => ({
      themes,
      status: statuses[UPDATE_TAB]
    })
  ),
  reduxForm({form: displayName}),
  mapProps((props) => {
    const mapped = { ...props }
    const tab = props.tab

    let features = []

    if (tab && tab.access_code && tab.access_code !== '') {
      features.push({ icon: codeIcon,
        desc: <div>Entry Code: <span className={css(sx.settingValue)}>{tab.access_code}</span></div>,
        actionPath: `/tab/${tab.id}/settings/make-it-exclusive`,
        actionIcon: <GearIcon /> })
    }

    if (tab && tab.payer_identify && tab.payer_identify === true) {
      features.push({ icon: dataIcon,
        desc: <div>Gather Data: <span className={css(sx.settingValue)}>On</span></div>,
        actionPath: `/tab/${tab.id}/settings/gather-data`,
        actionIcon: <GearIcon /> })
    }

    if (tab && tab.open_datetime && tab.close_datetime) {
      features.push({ icon: timingIcon,
        desc: <div>Timing: <span className={css(sx.settingValue)}>{
          moment(tab.open_datetime).format('M/D/YYYY h:mm A')
        }</span> to <span className={css(sx.settingValue)}>{
          moment(tab.close_datetime).format('M/D/YYYY h:mm A')
        }</span></div>,
        actionPath: `/tab/${tab.id}/settings/set-timing`,
        actionIcon: <GearIcon /> })
    }

    mapped.features = features
    return mapped
  })
)

export default enhance(({
  tab,
  handleSubmit,
  features,
  onSubmit,
  ...props
}) =>
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className={css(tx.col12xs, tx.col12sm, tx.col12md, tx.col6, tx.mb2)}>
      {settings.map((setting, key) =>
        <Field {...setting} key={key} component={Expander} />
      )}
    </div>
    <div className={css(tx.col12xs, tx.col12sm, tx.col12md, tx.col6, tx.mb2)}>
      {features.map((feature, key) =>
        <Feature {...feature} key={key} />
      )}
    </div>
    <Button type='submit' backgroundColor='primary'>
      Next
    </Button>
  </form>
)
