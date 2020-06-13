const fs = require('fs');
const path = require('path');

exports.write = (file, data) => {
  fs.writeFileSync(file, data);
};

exports.read = (file) => {
  return fs.readFileSync(file, 'utf8');
};

exports.exists = (file) => {
  return fs.exists(file);
};

exports.remove = (file) => {
  return fs.unlinkSync(file);
};

function removeFolder(p) {
  if (fs.existsSync(p)) {
    fs.readdirSync(p).forEach((file) => {
      const curPath = path.join(p, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        removeFolder(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(p);
  }
}

exports.removeFolder = removeFolder;

exports.folder = (targetFolder) => {
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }
};

function copyFileSync(source, target) {

  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
};

exports.copyFileSync = copyFileSync;

function copyFolderSync(source, target) {
  var files = [];

  //check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
};

exports.copyFolderSync = copyFolderSync;

function copyFolderContentsSync(source, target) {
  var files = [];

  //check if folder needs to be created or integrated
  var targetFolder = target;
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
};

exports.copyFolderContentsSync = copyFolderContentsSync;

exports.eachComponent = (srcDir, callback) => {
  const namespaces = fs.readdirSync(srcDir)
    .filter((f) => f.match(/^[a-z]+$/) !== null);
  namespaces.forEach((namespace) => {
    if (namespace === '@types' || namespace === 'dist') {
      return;
    }
    const namespaceDir = path.join(srcDir, namespace);
    const components = fs.readdirSync(namespaceDir)
      .filter((f) => f.match(/^[a-zA-Z0-9]+$/) !== null);
    components.forEach((component) => {
      const componentDir = path.join(namespaceDir, component);
      const file = path.join(componentDir, `${component}.ts`);
      if (fs.existsSync(file)) {
        const componentU = `${component[0].toUpperCase()}${component.substr(1)}`;
        const namespaceU = `${namespace[0].toUpperCase()}${namespace.substr(1)}`;
        const name = `${namespace}${componentU}`;
        const cls = `${namespaceU}${componentU}`;
        const input = `./src/${namespace}/${component}/${component}.ts`;
        callback({
          cls,
          name,
          component,
          namespace,
          input
        });
      }
    });
  });
};