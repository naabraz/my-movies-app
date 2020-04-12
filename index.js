import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import tools from './tools';

tools.reactotronStart();

AppRegistry.registerComponent(appName, () => App);
