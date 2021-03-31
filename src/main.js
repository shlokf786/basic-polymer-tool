const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    menuBarVisible: false,
  });

  win.loadFile("src/index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on('show-notification',(event, args) => {
    showNotification(args.title,args.body);
    // console.log(args);
})

function showNotification(ntitle,nbody) {
  const notification = {
    title: ntitle,
    body: nbody,
  };
  new Notification(notification).show();
}