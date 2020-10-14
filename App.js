import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { LogBox } from 'react-native'

import store from './redux'
import AppGatekeeper from './components/AppGatekeeper'

// App =======================================
export default function App() {
  LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
  LogBox.ignoreAllLogs() // Ignore all log notifications

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppGatekeeper />
      </NavigationContainer>
    </Provider>
  )
}
