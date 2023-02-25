module.exports = {
  rootDir: "./",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testPathIgnorePatterns: ["<rootDir>/.build/", "<rootDir>/node_modules/"],
  restoreMocks: true,
  moduleFileExtensions: ["js", "json", "ts"],
  clearMocks: true,
  resetMocks: true,
  testMatch: ["<rootDir>/src/**/*.test.{js,jsx,ts,tsx}"],
};
