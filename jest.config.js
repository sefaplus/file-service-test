/* eslint-disable no-undef */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/mocks'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/errors/',
    '<rootDir>/src/libs/MongoDB/',
    '<rootDir>/src/middlewares.globalErrorHandler.ts',
  ],
};
