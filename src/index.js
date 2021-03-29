// console.log(window.api.data);
// var showNotificationEle = document.getElementById("showNotification");
// showNotificationEle.onclick = () => {
//   window.api.showNotification(
//     "Basic Notification",
//     "Notification from the Main process"
//   );
// };

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
