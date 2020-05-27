module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['./jest-mock-bootstrap'],
  testMatch: ['**/*.test.tsx', '**/*.test.ts', '**/*.test.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/tools/**',
    '!**/style/**',
  ],
};
