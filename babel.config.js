module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    "nativewind/babel",
    ["@babel/plugin-transform-private-methods", { "loose": true }],
    // 'react-native-reanimated/plugin',
  ],
};