module.exports = {
  verbose: false,
  collectCoverage: true,
  collectCoverageFrom: ['src/utils.ts'],
  transform: {
    '^.+\\.[j|t]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  snapshotSerializers: [],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
}
