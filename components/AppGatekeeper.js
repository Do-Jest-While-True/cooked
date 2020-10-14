import React from 'react'
import { connect } from 'react-redux'

import { TabNavigator } from './AppNav'
import { LoginSignup } from './AuthNav'

const AppGatekeeper = ({ user }) => {
  console.log('user-->', user)
  return (
    <React.Fragment>
      {user && user.id ? <TabNavigator /> : <LoginSignup />}
    </React.Fragment>
  )
}

const mapState = (state) => ({
  user: state.user,
})

export default connect(mapState, null)(AppGatekeeper)
