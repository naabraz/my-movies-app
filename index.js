import { AppRegistry } from 'react-native';

import { App } from './src/App';
import { name as appName } from './app.json';
import { reactotronStart } from './tools';

reactotronStart();

AppRegistry.registerComponent(appName, () => App);
