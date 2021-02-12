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
      components[components.length - 1].examples = [];
      const examplesDir = `${componentDir}/__examples__`;
      if ((fs.existsSync(examplesDir))) {
        const examples2 = fs.readdirSync(examplesDir)
          .filter((f) => f.match(/^[a-zA-Z0-9]+$/) !== null);
        examples2.forEach((example) => {
          const exampleDir = path.join(examplesDir, example);
          const exampleInput = path.join(exampleDir, `${example}.ts`);
          inputs.push(exampleInput);
          components[components.length - 1].examples.push({
            exampleInput,
            example
          });
        });
      }
    } else {
      // console.error(`Unable to find ${file}!`);
    }
  });
});
if (DIST_COMPONENTS) {
  components.forEach(({ input, name }) => {
    addEntries(input, name);
  });
}
addEntries(inputs, 'main');
console.log(`Stats: ${components.length - 1} Components, ${examples.length} Examples`);

console.log(`Writing ${DIST_DIR}/index.html`);
let index = read('./src/index.html');

const mdiLink = 'M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z';
const mdiFile = 'M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z';

const contentHtml = [];
const listComponentsHtml = [];
const listOverlaysHtml = [];
const listSharedHtml = [];
components.forEach(({ name, input, examples }) => {
  if (filterComponents.length && !filterComponents.includes(name)) {
    return;
  }
  const data = read(input);
  const m = data.match(/extends (\w+)/);
  const type = m === null ? 'Shared' : m[1];
  contentHtml.push('<h2>');
  contentHtml.push(camelToDash(name));
  contentHtml.push(`<a href="#${camelToDash(name)}">`);
  contentHtml.push(`<svg viewBox="0 0 24 24">`);
  contentHtml.push(`<path fill="currentColor" d="${mdiLink}">`);
  contentHtml.push(`</svg>`);
  contentHtml.push(`</a>`);
  contentHtml.push(`<span>component</span>`);
  contentHtml.push(`<button title="README.md">`);
  contentHtml.push(`<svg viewBox="0 0 24 24">`);
  contentHtml.push(`<path fill="currentColor" d="${mdiFile}">`);
  contentHtml.push(`</svg>`);
  contentHtml.push(`</button>`);
  contentHtml.push('</h2>');
  switch(type) {
    case 'Shared':
      listSharedHtml.push(`<li><a href="#${camelToDash(name)}">`);
      listSharedHtml.push(`${camelToDash(name).replace('mdi-', '')}`);
      listSharedHtml.push(`</a></li>`);
      break;
    case 'MdiOverlay':
      listOverlaysHtml.push(`<li><a href="#${camelToDash(name)}">`);
      listOverlaysHtml.push(`${camelToDash(name).replace('mdi-', '')}`);
      listOverlaysHtml.push(`</a></li>`);
      break;
    default:
      listComponentsHtml.push(`<li><a href="#${camelToDash(name)}">`);
      listComponentsHtml.push(`${camelToDash(name).replace('mdi-', '')}`);
      listComponentsHtml.push(`</a></li>`);
  }

  examples.forEach(({ example }) => {
    // ex x-[mdiButton]-[basicTest] = x-mdi-button-basic-test
    const tag = `x-${camelToDash(name)}-${camelToDash(example)}`;
    contentHtml.push('<section>');
    contentHtml.push(`<h3><span>${example}</span></h3>`);
    contentHtml.push(`<${tag}></${tag}>`);
    contentHtml.push('</section>');
    contentHtml.push('');
  });
});

index = index.replace('<!-- [ListComponents] -->', listComponentsHtml.join('\n'));
index = index.replace('<!-- [ListOverlays] -->', listOverlaysHtml.join('\n'));
index = index.replace('<!-- [ListShared] -->', listSharedHtml.join('\n'));
index = index.replace('<!-- [Examples] -->', contentHtml.join('\n'));
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