import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'

import store from './redux'

import AppScreen from './screens/AppScreen'

// App =======================================
export default function App() {
  // LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
  // LogBox.ignoreAllLogs() // Ignore all log notifications
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppScreen />
      </NavigationContainer>
    </Provider>
  )
}
