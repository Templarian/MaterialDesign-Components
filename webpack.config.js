const path = require('path');
const fs = require('fs');
const CopyPlugin = require("copy-webpack-plugin");
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const {
  dashToCamel,
  getComponents
} = require('./scripts/utils');
const { createIndex } = require('./scripts/createIndex');

// This will generate individual JS files
const DIST_COMPONENTS = false;
const IS_DEV = true;
const DIST_DIR = 'dist';

let filterComponents = [];

// Limit demo to render only listed components:
if (process.argv.length > 3 && process.argv[3]) {
  const aComp = process.argv[3];
  const aComps = aComp.split(/,/g);
  aComps.forEach((aC) => {
    if (aC.match(/^\w+([A-Z]|-)/) === null) {
      throw new Error(`${aC} must be formatted as namespace-component or namespaceComponent`);
    }
  });
  filterComponents = aComps.map(x => dashToCamel(x));
}

// Lists
const components = getComponents('src');
const inputs = [];

components.forEach(({ input, examples }) => {
  inputs.push(input);
  examples.forEach(({ exampleInput }) => {
    inputs.push(exampleInput);
  });
});

module.exports = (env, argv) => {
  const entries = [];
  if (argv.mode === 'production') {
    console.log('production');
  }
  function addEntries(input, name) {
    entries.push({
      mode: IS_DEV ? 'development' : 'production',
      entry: input,
      module: {
        rules: [
          {
            test: /\.(css|html)$/i,
            use: 'raw-loader',
          },
          {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: [ '.ts', '.js' ],
      },
      output: {
        filename: `${name}.js`,
        path: path.resolve(__dirname, DIST_DIR),
      },
      performance: {
        hints: false
      },
    });
  }

  if (DIST_COMPONENTS) {
    components.forEach(({ input, name }) => {
      addEntries(input, name);
    });
  }
  addEntries(inputs, 'main');
  // Output Basic Runtime
  console.log(`Stats: ${components.length - 1} Components`);
  entries[entries.length - 1].plugins = [
    new CopyPlugin({
      patterns: [
        { from: "api/", to: `api/` },
      ],
    }),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          createIndex(
            components.filter(({ name }) => {
              return !(filterComponents.length && !filterComponents.includes(name));
            }),
            'production'
          );
        });
      }
    },
    new ExtraWatchWebpackPlugin({
      files: [
        'src/**/*.md',
        'src/index.html'
      ],
    }),
  ];

  entries[entries.length - 1].devServer = {
    contentBase: path.join(__dirname, DIST_DIR),
    compress: true,
    port: 3000
  };
  return entries;
};