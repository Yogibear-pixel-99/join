


/**
 * Shows an error message and red border if the values are not valid, calls a fetch function if they are.
 * 
 * @param {Object} event - The default object to prevent from default.
 */
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
    await collectNewUserValuesAndPost();
  }
}


/**
 * Collects the values from the sign up form, creates a template, fetches the user data to the api, shows a sign up button and redirect to the login page.
 */
async function collectNewUserValuesAndPost(){
  getNewUserTemp();
  collectFormInformation("sign-up-form");
  await postDataToApi("users", collectedFormInfos);
  mainContentBrightness50();
  showOverlayButton("sign-up-success-button", "You Signed Up successfully");
  setTimeout(() => redirectToLogInPage(), 800);
}


/**
 * An empty user template for the sign up function to fetch to the api.
 */
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


/**
 * Checks if the new sign up password value is the same as the confirm password value.
 * 
 * @returns - A boolean.
 */
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


/**
 * Sets the main content brightness to 50%.
 */
function mainContentBrightness50() {
  const ref = document.getElementById("main-container");
  ref.classList.add("darken-background");
}


/**
 * Adds a class to show the overlay button container.
 * 
 * @param {HTMLContainer} buttonId - The id of the button container to show.
 * @param {string} buttonText - The text displayed in the button.
 */
function showOverlayButton(buttonId, buttonText) {
  const ref = document.getElementById(buttonId);
  ref.innerText = buttonText;
  ref.classList.add("overlay-button-show");
}


/**
 * Removes a class to hide the overlay button container.
 * 
 * @param {HTMLContainer} buttonId - The container id of the button.
 */
function hideOverlayButton(buttonId) {
  const ref = document.getElementById(buttonId);
  ref.classList.remove("overlay-button-show");
}


/**
 * Redirect to the login page.
 */
function redirectToLogInPage() {
  window.location.href = "../html/login.html";
}


/**
 * Toggles the sign up button in desktop and mobile version if privacy is checked.
 */
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
    buttonRef.classList.remove('dark-button-signup');
  } else {
      buttonRef.disabled = true;
      buttonRef.classList.remove('dark-button');
      buttonRef.classList.remove('dark-signup-mobile-button');
      buttonRef.classList.add('dark-button-signup');
    }
}


/**
 * Changes the source of the password icon in the sign up form.
 * 
 * @param {HTMLContainer} inputContainerId - The id of the input container.
 * @param {HTMLContainer} iconContainerId - The id of the logo container.
 */
function changePasswordIcon(inputContainerId, iconContainerId){
  let ref = document.getElementById(inputContainerId).value
      if (ref !== "") {
        setIconToContent(iconContainerId, '../assets/icons/visibility_off.svg');
      } else {
        setIconToContent(iconContainerId, '../assets/icons/lock.svg')
      }
}


/**
 * Changes the visibility of the password value in the input field by changing the input field type.
 * 
 * @param {HTMLContainer} inputId - The id of the input container.
 * @param {HTMLContainer} logoId - The id of the logo container.
 */
function showHidePassword(inputId, logoId){
  let text = document.getElementById(inputId);
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


/**
 * Sets a icon source to all containers specified by a class name.
 * 
 * @param {string} iconClassName - The class name of all needed HTML containers.
 * @param {string} source - The source address of the needed icon.
 */
function setIconToContent(iconContainerId, source){
  let iconRef = document.getElementById(iconContainerId);
      iconRef.src = (source);
}

