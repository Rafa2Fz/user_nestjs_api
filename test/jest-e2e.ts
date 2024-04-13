export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '<rootDir>/test',
  testEnvironment: 'node',

  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testMatch: ['**/*.spec.ts'],
};
