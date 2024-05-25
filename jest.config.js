/** @type {import('jest').Config} */
const config = {
  verbose: true,
  restoreMocks: true,
  clearMocks: true,
  collectCoverageFrom: [
    'src/lib/marked-alm.esm.js',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testRegex: /\.test\.js$/.source,
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;