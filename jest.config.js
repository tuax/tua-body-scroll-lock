module.exports = {
    verbose: false,
    testURL: 'http://localhost',
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
}
