const { contextBridge, ipcRenderer, Notification } = require("electron");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
// const FileItem = require("./fileItem");

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

function setTheWatch(dirPath) {
  if (watcher) watcher.close();

  watcher = chokidar.watch(dirPath, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true,
  });
  watcher
    .on("add", (path, stats) =>
      window.dispatchEvent(
        new CustomEvent("file-added", {
          detail: {fullPath:path, path:path.substr(originalPath.length), stats:stats},
        })
      )
    )
    .on("change", (path, stats) =>
      window.dispatchEvent(
        new CustomEvent("file-changed", {
          detail: {fullPath:path, path:path.substr(originalPath.length), stats:stats},
        })
      )
    )
    .on("unlink", (path) =>
      window.dispatchEvent(
        new CustomEvent("file-removed", {
          detail: {fullPath:path, path:path.substr(originalPath.length), stats:null},
        })
      )
    )
    .on("error", (error) => window.api.showNotification("Error", error));
  // .on('addDir', (path, stats) => window.dispatchEvent(new CustomEvent("dir-added",{detail:{path:path,stat:stats}})))
  // .on('unlinkDir', path => window.dispatchEvent(new CustomEvent("dir-removed",{detail:{path:path,stat:stats}})))
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
      arrayOfFiles.push({
        fullPath: path.join(dirPath, file),
        path: path.join(dirPath, file).substr(originalPath.length),
        stats: filestat,
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
  getFileList: (dirPath) => {
    return getAllFiles(dirPath);
  },
  setTheWatchOn: (dirPath) => setTheWatch(dirPath),
});
