
import React from 'react'
import tx from 'theme/utilities'
import { Button } from 'elements'
import { css } from 'aphrodite/no-important'
import FacebookIcon from 'react-icons/lib/io/social-facebook'

// I killed 7 kittens while writing this hack
function loginWithFacebook () {
  const left = (window.screen.width / 2) - 300
  const top = (window.screen.height / 2) - 300
  const win = window.open(
    `${process.env.REACT_APP_RAILS_PATH}auth/facebook`,
    'CheddarUp Facebook Login',
    `menubar=no,toolbar=no,status=no,width=600,height=600,toolbar=no,left=${left},top=${top}`
  )
  const timer = setInterval(() => {
    if (win.closed) {
      clearInterval(timer)
      window.location.reload(true)
    }
  }, 200)
}

export default () =>
  <Button
    onClick={loginWithFacebook}
    fullWidth
    color='white'
    backgroundColor='secondary'>
    <div className={css(tx.flex, tx.alignCenter)}>
      <div className={css(tx.col10, tx.fontSize5, tx.pr3, tx.textAlignLeft)}>
        Log in with Facebook
      </div>
      <div className={css(tx.col2, tx.flex, tx.justifyFlexEnd)}>
        <FacebookIcon size={24} />
      </div>
    </div>
  </Button>
