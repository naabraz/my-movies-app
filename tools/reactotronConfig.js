import { AsyncStorage } from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

const reactotronConfig = () => {
  if (Reactotron.setAsyncStorageHandler) {
    Reactotron.setAsyncStorageHandler(AsyncStorage)
      .configure()
      .useReactNative()
      .connect();
  }

  console.tron = Reactotron;
};

export const reactotronStart = () => {
  if (__DEV__) {
    return reactotronConfig();
  }
};
