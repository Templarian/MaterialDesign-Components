const path = require('path');
const fs = require('fs');
const CopyPlugin = require("copy-webpack-plugin");

// This will generate individual JS files
const DIST_COMPONENTS = false;
const IS_DEV = true;

function dashToCamel(str) {
  return str.replace(/-([a-z])/g, m => m[1].toUpperCase());
}

let filterComponents = [];

// Limit demo to only listed components:
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

// Append to the inputs any outside your project
// ['./node_modules/foo/src/foo/bar.ts']
const components = [];
const inputs = [];
const entries = [];

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
      path: path.resolve(__dirname, 'dist2'),
    },
    performance: {
      hints: false
    },
  });
}

const srcDir = path.join(__dirname, 'src');
const namespaces = fs.readdirSync(srcDir)
  .filter((f) => f.match(/^[a-z]+$/) !== null);
namespaces.forEach((namespace) => {
  const namespaceDir = path.join(srcDir, namespace);
  const comps = fs.readdirSync(namespaceDir)
    .filter((f) => f.match(/^[a-zA-Z0-9]+$/) !== null);
    comps.forEach((component) => {
    const componentDir = path.join(namespaceDir, component);
    const file = path.join(componentDir, `${component}.ts`);
    if (fs.existsSync(file)) {
      const name = `${namespace}${component[0].toUpperCase()}${component.substr(1)}`;
      const input = `./src/${namespace}/${component}/${component}.ts`;
      inputs.push(input);
      components.push({ input, name });
      const examplesDir = `${componentDir}/__examples__`;
      if ((fs.existsSync(examplesDir))) {
        const examples = fs.readdirSync(examplesDir)
          .filter((f) => f.match(/^[a-zA-Z0-9]+$/) !== null);
        examples.forEach((example) => {
          const exampleDir = path.join(examplesDir, example);
          const exInput = path.join(exampleDir, `${example}.ts`);
          inputs.push(exInput);
        });
      }
    } else {
      console.error(`Unable to find ${file}!`);
    }
  });
});
if (DIST_COMPONENTS) {
  components.push(({ input, name }) => {
    addEntries(input, name);
  });
}
addEntries(inputs, 'main');
console.log(`Building ${entries.length - 1} components...`);
entries[entries.length - 1].plugins = [
  new CopyPlugin({
    patterns: [
      { from: "src/index.html", to: "index.html" },
    ],
  }),
];
entries[entries.length - 1].devServer = {
  contentBase: path.join(__dirname, 'dist2'),
  compress: true,
  port: 3000
};
module.exports = entries;