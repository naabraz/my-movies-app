import { AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-native';

const reactotronConfig = () => {
  Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure()
    .useReactNative()
    .connect();
  console.tron = Reactotron;
};

const reactotronStart = () => {
  if (__DEV__) {
    reactotronConfig();
  }
};

export default reactotronStart;
