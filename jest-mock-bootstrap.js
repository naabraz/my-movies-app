import * as ReactNative from 'react-native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

jest.mock('react-native-device-info', () => ({
  getBuildNumber: jest.fn().mockReturnValue(1),
  getVersion: jest.fn().mockReturnValue('1.0'),
}));

jest.mock('services', () => ({
  firebase: {
    sendEvent: jest.fn(),
  },
}));

jest.doMock('react-native', () => {
  return Object.setPrototypeOf(
    {
      NativeModules: {
        ...ReactNative.NativeModules,
        SecureStorage: {
          setValue: jest.fn(),
          getValue: jest.fn(),
        },
      },
    },
    ReactNative,
  );
});
