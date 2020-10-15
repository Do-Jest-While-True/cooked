import React from 'react'
import { connect } from 'react-redux'

import { TabNavigator } from './AppNav'
import { LoginSignup } from './AuthNav'


const AppGatekeeper = ({ auth }) => {

  return (
    <React.Fragment>
      {auth && auth.id ? <TabNavigator /> : <LoginSignup />}
    </React.Fragment>
  )
}

const mapState = (state) => ({
  auth: state.auth,
})

export default connect(mapState, null)(AppGatekeeper)
