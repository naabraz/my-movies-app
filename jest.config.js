module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest-mock-bootstrap'],
  testMatch: ['**/*.test.tsx', '**/*.test.ts', '**/*.test.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(jest-)?react-native|@gympass/*|@react-navigation/.*|@react-native|@react-native-community|@react-navigation|@react-native-picker/picker)/',
  ],
  moduleNameMapper: {
    'styled-components':
      '<rootDir>/node_modules/styled-components/native/dist/styled-components.native.cjs.js',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/tools/**',
    '!**/style/**',
  ],
  moduleDirectories: ['node_modules', 'utils'],
};
