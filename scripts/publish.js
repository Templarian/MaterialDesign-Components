const {
  read,
  write,
  exists,
  remove,
  folder,
  copyFileSync,
  copyFolderSync,
  copyFolderContentsSync
} = require('./utils');

// publish/
// - dist/
// - @types/
// - namespaces/
// - package.json
// - README.md

// Make publish folder
folder('publish');
// Copy README.md to publish/README.md
copyFileSync('README.md', 'publish/README.md');
console.log(`Done: "README.md" copied to "publish/README.md`);
// Write publish/package.json
const package = JSON.parse(read('package.json'));
delete package.private;
delete package.devDependencies;
package.version = package.version.replace(/(\d+)$/g, (m, minor) => {
  const next = parseInt(minor, 10) + 1;
  return `${next}`;
});
write('publish/package.json', JSON.stringify(package, null, 4));
console.log(`Done: "package.json" with version "${package.version}"`);
// Copy src/* to publish/*
copyFolderContentsSync('src', 'publish');
// Remove index.html
remove('publish/index.html');
// Copy dist
copyFolderSync('dist', 'publish');
// Remove "dist/api" and "index.html"
removeFolder('publish/api');
remove('publish/dist/index.html');
// Final Message
console.log(`Done run "cd publish" and "npm publish".`);