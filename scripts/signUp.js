



async function signUpNewUser(event) {
  event.preventDefault();
  removeRedBorderAndTextFalseInput('sign-up-password-confirm', 'input-alert-message');
  removeRedBorderAndTextFalseInput('user-email-input', 'input-alert-message');
  if (checkIfPasswordIsSameAsConfirm()) {
    addRedBorderAndTextFalseInput('sign-up-password-confirm', 'input-alert-message', "Your passwords don't match. Please try again.");
  } else if (await checkIfDataAlreadyExists("user-email-input", "users")) {
    addRedBorderAndTextFalseInput('user-email-input', 'input-alert-message', "User/email already exists. Please try again.");
  } else {
    removeRedBorderAndTextFalseInput('sign-up-password-confirm', 'input-alert-message');
    getNewUserTemp();
    collectFormInformation("sign-up-form");
    await postDataToApi("users", collectedFormInfos);
    mainContentBrightness50();
    showOverlayButton("sign-up-success-button", "You Signed Up successfully");
    setTimeout(() => redirectToLogInPage(), 1000);
  }
}



function getNewUserTemp() {
  collectedFormInfos = {
    name: "",
    email: "",
    password: "",
    toDo: "",
    done: "",
    priority: [{ urgent: "" }, { medium: "" }, { low: "" }],
    tasksInBoard: "",
    tasksInProgress: "",
    awaitingFeedback: "",
  };
}

function checkIfPasswordIsSameAsConfirm() {
  const newUserPassword = document.getElementById("sign-up-password").value;
  const newUserPasswordConfirm = document.getElementById(
    "sign-up-password-confirm"
  ).value;
  if (newUserPassword !== newUserPasswordConfirm) {
    return true;
  } else {
    return false;
  }
}



function mainContentBrightness50() {
  const ref = document.getElementById("main-container");
  ref.classList.add("darken-background");
}

function showOverlayButton(buttonId, buttonText) {
  const ref = document.getElementById(buttonId);
  ref.innerText = buttonText;
  ref.classList.add("overlay-button-show");
}

function hideOverlayButton(buttonId) {
  const ref = document.getElementById(buttonId);
  ref.classList.remove("overlay-button-show");
}

function redirectToLogInPage() {
  window.location.href = "../html/login.html";
}

