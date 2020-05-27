jest.mock('@react-navigation/native', () => ({
  ...require.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
}));
