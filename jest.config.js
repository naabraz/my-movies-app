module.exports = {
  preset: 'react-native',
  testMatch: ['**/*.test.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/tools/**',
    '!**/style/**',
  ],
};
