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

function fileItemDom(file) {
  let div = document.createElement("div");
  div.className = "list-group-item";
  div.id = file.hashCode;
  console.log(file.hashCode);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = false;

  let textNode = document.createTextNode(file.path);

  div.appendChild(checkbox);
  div.appendChild(textNode);

  return div;
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
    listGroup.appendChild(fileItemDom(file));
  });
}
window.addEventListener("file-added", (data) => {
  if (data.detail) {
    let listGroup = document.querySelector("#fileListGroup");
    listGroup.appendChild(
      fileItemDom({
        fullPath: data.detail.fullPath,
        path: data.detail.path,
        stats: data.detail.stats,
      })
    );
  }
});

window.addEventListener("file-removed", (data) => {
  if (data.detail) {
    let elementToRemove = document.getElementById(id);
    if (elementToRemove) elementToRemove.remove();
  }
});

window.addEventListener("file-changed", (data) => {
  if (data.detail) {
    let id = data.detail.hashCode;
    let elementChanged = document.getElementById(id);
    if (elementChanged) elementChanged.children[0].checked = true;
  }
});

function deployFiles() {}
