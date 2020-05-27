module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", 
  globals: {
    jest: true,
  },
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off"
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": ["error"]
      }
    }
  ]
};