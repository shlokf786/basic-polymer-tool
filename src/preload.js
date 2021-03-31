const { contextBridge, ipcRenderer, Notification } = require("electron");
const fs = require("fs");
const path = require("path");
const chokidar = require('chokidar');

var watcher;
var originalPath = null;


window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

function setTheWatch(dirPath){
    if(watcher) watcher.close();

    watcher = chokidar.watch(dirPath, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
        ignoreInitial: true,
    });
    watcher
    .on('add', (path, stats) => window.dispatchEvent(new CustomEvent("file-added",{detail:path})))
    .on('change', (path, stats) => console.log(`File ${path} has been changed`))
    .on('unlink', path => console.log(`File ${path} has been removed`))
    .on('addDir', (path, stats) => console.log(`Directory ${path} has been added`))
    .on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
    .on('error', error => console.log(`Watcher error: ${error}`))
}


function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);
  originalPath = originalPath ? originalPath : dirPath;
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    let filestat = fs.statSync(path.join(dirPath, file));
    if (filestat.isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      let FullPath = path.join(dirPath, file);
      arrayOfFiles.push({
        path: FullPath.substr(originalPath.length),
        stat: filestat,
      });
    }
  });
  return arrayOfFiles;
}

contextBridge.exposeInMainWorld("api", {
  showNotification: (title, body) =>
    ipcRenderer.send("show-notification", { title: title, body: body }),
  defaultData: {
    polymerVersion: 1,
  },
  getFileList: (dirPath) => getAllFiles(dirPath),
  setTheWatchOn: (dirPath) => setTheWatch(dirPath),
});
