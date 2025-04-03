



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

function toggleSignUpButton(){
  const checkPrivacy = document.getElementById('accept-privacy');
  const buttonRef = document.getElementById('sign-up-button');
    if (checkPrivacy.checked && window.innerWidth > 1025) {
      buttonRef.disabled = false;
      buttonRef.classList.add('dark-button');
      buttonRef.classList.remove('dark-button-signup');
    } else if (checkPrivacy.checked && window.innerWidth <= 1024) {
    buttonRef.disabled = false;
    buttonRef.classList.add('dark-signup-mobile-button');
    // buttonRef.classList.add('dark-button');
    buttonRef.classList.remove('dark-button-signup');
  } else {
      buttonRef.disabled = true;
      buttonRef.classList.remove('dark-button');
      buttonRef.classList.remove('dark-signup-mobile-button');
      buttonRef.classList.add('dark-button-signup');
    }
}

function changePasswordIcons(){
  let passwordRef = document.getElementById('sign-up-password').value
  let confirmRef = document.getElementById('sign-up-password-confirm').value
      passwordRef !== '' && confirmRef !== '' ? 
      setIconToContent('lock-logo', '../assets/icons/visibility_off.svg') : 
      setIconToContent('lock-logo', '../assets/icons/visibility_off.svg');
}

function showHidePassword(textId, logoId){
  let text = document.getElementById(textId);
  let logo = document.getElementById(logoId);
  if (text.value) {
  switch (text.type == "password") {
    case true : text.type = "text"; logo.src = '../assets/icons/visibility-eye.svg';
    break;
    case false : text.type = "password"; logo.src = '../assets/icons/visibility_off.svg';
    break;
    }
  }
}

function setIconToContent(iconClassName, source){
  let icons = document.getElementsByClassName(iconClassName)
    for (let iconIndex = 0; iconIndex < icons.length; iconIndex++) {
      icons[iconIndex].src = (source);
    }
}

