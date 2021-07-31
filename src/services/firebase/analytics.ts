import analytics from '@react-native-firebase/analytics';

export const sendEvent = async (name: string, params: object): Promise<void> =>
  analytics().logEvent(name, params);
