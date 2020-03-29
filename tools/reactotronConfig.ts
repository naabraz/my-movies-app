import { AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-native';

declare global {
  interface Console {
    tron: any;
  }
}

const reactotronConfig = () => {
  if (Reactotron.setAsyncStorageHandler) {
    Reactotron.setAsyncStorageHandler(AsyncStorage)
      .configure()
      .useReactNative()
      .connect();
  }

  console.tron = Reactotron;
};

const reactotronStart = () => {
  if (__DEV__) {
    return reactotronConfig();
  }
};

export default reactotronStart;
