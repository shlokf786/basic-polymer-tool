// console.log(window.api.data);
// var showNotificationEle = document.getElementById("showNotification");
// showNotificationEle.onclick = () => {
//   window.api.showNotification(
//     "Basic Notification",
//     "Notification from the Main process"
//   );
// };

window.api.showNotification(
  "Basic Notification",
  "Notification from the Render process"
);

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
    var ele = document.createElement("div");
    ele.innerHTML = file.path;
    ele.className = "list-group-item";
    listGroup.appendChild(ele);
  });
}
window.addEventListener("file-added",(data)=>{
    if(data.detail){
        let listGroup = document.querySelector("#fileListGroup");
        var ele = document.createElement("div");
        ele.innerHTML = data.detail;
        ele.className = "list-group-item";
        listGroup.appendChild(ele);
    }
});