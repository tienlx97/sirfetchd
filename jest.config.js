module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  projects: [
    "<rootDir>/packages/**/jest.config.js",
    // "<rootDir>/packages/shared/**/jest.config.js",
  ],
  testEnvironment: "node",
  testMatch: ["*.spec.ts", "*.spec.tsx"],
};
