// console.log(window.api.data);
// var showNotificationEle = document.getElementById("showNotification");
// showNotificationEle.onclick = () => {
//   window.api.showNotification(
//     "Basic Notification",
//     "Notification from the Main process"
//   );
// };

// import fileItem from "./fileItem";

// import { FileItem } from "./fileItem.js";
var fileListOj = {};
var changedFileList = {};
// window.api.showNotification(
//   "Basic Notification",
//   "Notification from the Render process"
// );

// import { FileItem } from  "./fileItem.js";
// const { FileItem } = require('./fileItem');

function setDefaultValues() {
  document.getElementById("polymerVersionInput").value =
    window.api.defaultData.polymerVersion;
}

setDefaultValues();

let showHidePasswordState = true;
function showHidePassword() {
  if (showHidePasswordState) {
    document.querySelector("#passwordIcon").src = "../assets/eye-open.svg";
    document.querySelector("#userPasswordInput").type = "text";
  } else {
    document.querySelector("#passwordIcon").src = "../assets/eye-close.svg";
    document.querySelector("#userPasswordInput").type = "password";
  }
  showHidePasswordState = !showHidePasswordState;
}

let showHideBasicPasswordState = true;
function showHideBasicPassword() {
  if (showHideBasicPasswordState) {
    document.querySelector("#basicPasswordIcon").src = "../assets/eye-open.svg";
    document.querySelector("#basicPasswordInput").type = "text";
  } else {
    document.querySelector("#basicPasswordIcon").src =
      "../assets/eye-close.svg";
    document.querySelector("#basicPasswordInput").type = "password";
  }
  showHideBasicPasswordState = !showHideBasicPasswordState;
}

function refreshFileList() {
  let dirLocation = document.querySelector("#directoryInput");
  if (dirLocation.value == "") {
    return;
  }
  window.api.setTheWatchOn(dirLocation.value);
  let listGroup = document.querySelector("#fileListGroup");
  while (listGroup.firstChild) {
    listGroup.removeChild(listGroup.firstChild);
  }
  let fileList = window.api.getFileList(dirLocation.value);
  fileList.forEach((file) => {
    var item = new FileItem(file.fullPath, file.path, file.stats);
    fileListOj[file.fullPath] = item;
    listGroup.appendChild(item.getDomEle());
  });
}
window.addEventListener("file-added", (data) => {
  if (data.detail) {
    let listGroup = document.querySelector("#fileListGroup");
    var item = new FileItem(
      data.detail.fullPath,
      data.detail.path,
      data.detail.stats
    );
    fileListOj[data.detail.fullPath] = item;
    listGroup.appendChild(item.getDomEle());
  }
});

window.addEventListener("file-removed", (data) => {
  if (data.detail) {
    let listGroup = document.querySelector("#fileListGroup");
    var elementToRemove = [...listGroup.children].filter(
      (t) => t.id === data.detail.fullPath
    )[0];
    if (elementToRemove) elementToRemove.remove();
  }
});

window.addEventListener("file-changed", (data) => {
  if (data.detail) {
    let listGroup = document.querySelector("#fileListGroup");
    var elementChanged = [...listGroup.children].filter(
      (t) => t.id === data.detail.fullPath
    )[0];
    if (elementChanged) {
        var fileItemObj = fileListOj[data.detail.fullPath];
        if(fileItemObj){
            fileItemObj.isChanged=true;
        }
      let checkbox = elementChanged.querySelector("input");
      if (checkbox) {
        checkbox.checked = true;
        changedFileList[elementChanged.id]=elementChanged;
      }
    }
  }
});

function deployFiles() {
  changedFileList.forEach((fileElement) => {

  });
}
