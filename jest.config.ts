import nextJest from 'next/jest';

// Create the Jest configuration
const createJestConfig = nextJest({
  dir: './', // Path to the Next.js app directory
});

// Add custom Jest configuration options
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom', // Specify the environment for the test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Reference setup files to extend Jest
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Handle module aliases
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest to transform TypeScript files
  },
  // Optionally ignore patterns or additional settings
};

// Export the custom Jest configuration
export default createJestConfig(customJestConfig);

