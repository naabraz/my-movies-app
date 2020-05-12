module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          apollo: './src/apollo',
          assets: './src/assets',
          components: './src/components',
          navigator: './src/navigator',
          screens: './src/screens',
          style: './src/style',
        },
      },
    ],
  ],
};
