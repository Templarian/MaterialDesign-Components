const path = require('path');
const fs = require('fs');
const CopyPlugin = require("copy-webpack-plugin");
const { read, write } = require('./scripts/utils');

// This will generate individual JS files
const DIST_COMPONENTS = false;
const IS_DEV = true;
const DIST_DIR = 'dist2';

function dashToCamel(str) {
  return str.replace(/-([a-z])/g, m => m[1].toUpperCase());
}

function camelToDash(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

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
const components = [];
const examples = [];
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
      path: path.resolve(__dirname, DIST_DIR),
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
      components.push({ input, name, namespace });
      const examplesDir = `${componentDir}/__examples__`;
      if ((fs.existsSync(examplesDir))) {
        const examples2 = fs.readdirSync(examplesDir)
          .filter((f) => f.match(/^[a-zA-Z0-9]+$/) !== null);
        examples2.forEach((example) => {
          const exampleDir = path.join(examplesDir, example);
          const exInput = path.join(exampleDir, `${example}.ts`);
          inputs.push(exInput);
          examples.push({ input: exInput, name, namespace, example })
        });
      }
    } else {
      // console.error(`Unable to find ${file}!`);
    }
  });
});
if (DIST_COMPONENTS) {
  components.push(({ input, name }) => {
    addEntries(input, name);
  });
}
addEntries(inputs, 'main');
console.log(`Stats: ${components.length - 1} Components, ${examples.length} Examples`);

console.log(`Writing ${DIST_DIR}/index.html`);
let index = read('./src/index.html');

const exampleHtml = [];
let prevComp = '';
examples.forEach(({ input, name, example }) => {
  // ex x-[mdiButton]-[basicTest] = x-mdi-button-basic-test
  if (prevComp !== name) {
    exampleHtml.push('<h2>');
    exampleHtml.push(camelToDash(name));
    exampleHtml.push(`<span>component</span>`);
    exampleHtml.push('</h2>');
    prevComp = name;
  }
  const tag = `x-${camelToDash(name)}-${camelToDash(example)}`;
  exampleHtml.push('<section>');
  exampleHtml.push(`<h3><span>${example}</span></h3>`);
  exampleHtml.push(`<${tag}></${tag}>`);
  exampleHtml.push('</section>');
  exampleHtml.push('');
});

index = index.replace('<!-- [Examples] -->', exampleHtml.join('\n'));
write(`${DIST_DIR}/index.html`, index);

console.log(`Building...`);

entries[entries.length - 1].plugins = [
  new CopyPlugin({
    patterns: [
      { from: "api/", to: `api/` },
    ],
  }),
];

entries[entries.length - 1].devServer = {
  contentBase: path.join(__dirname, DIST_DIR),
  compress: true,
  port: 3000
};
module.exports = entries;