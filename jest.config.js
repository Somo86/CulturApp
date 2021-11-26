const esModules = ['react-router-native', '@react-native', 'react-native'].join(
  '|',
);

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      babelConfig: true,
      tsconfig: 'tsconfig.spec.json',
    },
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
