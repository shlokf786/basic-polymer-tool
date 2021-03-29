const { contextBridge, ipcRenderer, Notification } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

function showNotification(Notif_Title, Notif_Body) {
  console.log("inside", Notif_Title, Notif_Body);
  //   const myNotification = new remote.Notification(Notif_Title, {
  //     body: Notif_Body,
  //   });
  const notification = {
    title: Notif_Title,
    body: Notif_Body,
  };
  new Notification(notification).show();
}

contextBridge.exposeInMainWorld("api", {
  doThing: () => ipcRenderer.send("do-a-thing"),
  //   myPromises: [Promise.resolve(), Promise.reject(new Error("whoops"))],
  showNotification: (title, body) => showNotification(title, body),
  anAsyncFunction: async () => 123,
  data: {
    myFlags: ["a", "b", "c"],
    bootTime: 1234,
  },
  nestedAPI: {
    evenDeeper: {
      youCanDoThisAsMuchAsYouWant: {
        fn: () => ({
          returnData: 123,
        }),
      },
    },
  },
});
