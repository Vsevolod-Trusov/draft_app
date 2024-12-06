require('dotenv').config({
  path: './config/env/.development.env',
});

module.exports = {
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  testRegex: '.*\\.(e2e-)?spec\\.ts$',
  transform: {
    '^.+.tsx?$': 'ts-jest',
  },
};
