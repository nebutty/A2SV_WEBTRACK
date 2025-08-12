// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // create this next
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // support for absolute imports like @/redux
  },
};

export default config;
