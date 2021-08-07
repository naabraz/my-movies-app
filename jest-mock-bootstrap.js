jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

jest.mock('react-native-device-info', () => ({
  getBuildNumber: jest.fn().mockReturnValue(1),
}));

jest.mock('services', () => ({
  firebase: {
    sendEvent: jest.fn(),
  },
}));
