module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest", // Use ts-jest for TypeScript files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|antd|@ant-design|rc-.+?|@babel/runtime)).+(js|jsx)$",
  ],
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
    "^react-router-dom$": "<rootDir>/node_modules/react-router-dom",
  },
  // moduleNameMapper: {
  //   "^axios$": require.resolve("axios"), // Explicitly map axios to its resolved module
  // },
};
