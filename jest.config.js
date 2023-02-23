/*
 * Copyright © 2023. EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 *
 */

module.exports = {
  rootDir: "./",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testPathIgnorePatterns: [
    "<rootDir>/.build/",
    "<rootDir>/node_modules/",
    "<rootDir>/cdk.out/",
  ],
  // Automatically restore mock state between every __tests__
  restoreMocks: true,
  moduleFileExtensions: ["js", "json", "ts"],
  clearMocks: true,
  resetMocks: true,
  testMatch: ["<rootDir>/src/**/*.test.{js,jsx,ts,tsx}"],
};
