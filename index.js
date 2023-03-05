/**
 * @format
 */

import App from './src/App'
import { AppRegistry } from 'react-native'
import { LogBox } from 'react-native'
import { name as appName } from './app.json'

LogBox.ignoreLogs([
  'Require cycle: node_modules/',
  'Non-serializable values were found in the navigation state',
  'Missing queryFn',
])
AppRegistry.registerComponent(appName, () => App)
