/**
 * Shows an error message and red border if the values are not valid, calls a fetch function if they are.
 * 
 * @param {Object} event - The default object to prevent from default.
 */
async function signUpNewUser(event){
  event.preventDefault();
    removeAllErrorsFromSignUp();
    if (checkNameLength('sign-up-name', 4)){
      addRedBorderAndTextFalseInput('sign-up-name', 'input-alert-message', 'Enter a minimum of five letters');
    }
    else if((!testIfEmailIsValid(document.getElementById('user-email-input').value.trim()))){
      addRedBorderAndTextFalseInput('user-email-input', 'input-alert-message', 'Enter a valid email address');
  } else if (checkIfPasswordIsSameAsConfirm()){
      addRedBorderAndTextFalseInput('sign-up-password', 'input-alert-message', "Your passwords don't match. Please try again.");
      addRedBorderAndTextFalseInput('sign-up-password-confirm', 'input-alert-message', "Your passwords don't match. Please try again.");
  } else if (!checkPasswordLength()) {
    addRedBorderAndTextFalseInput('sign-up-password', 'input-alert-message', "A minimum of eight chars is required.");
  } else if (await checkIfDataAlreadyExists("user-email-input", "users")){
      addRedBorderAndTextFalseInput('user-email-input', 'input-alert-message', "User/email already exists. Please try again.");
  } else {
    await collectNewUserValuesAndPost();
  }
}


/**
 * Compares the input length with the number.
 * 
 * @param {string} id - The id of the input HTML element.
 * @param {integer} number - The maximum number to compare
 * @returns - A boolean.
 */
function checkNameLength(id, number){
  let ref = document.getElementById(id);
  if (ref.value.length < number){
    return true;
  } else {
    return false;
  }
}


/**
 * Removes all errors from the sign up form.
 */
function removeAllErrorsFromSignUp(){
    removeRedBorderAndTextFalseInput('sign-up-name', 'input-alert-message');
    removeRedBorderAndTextFalseInput('sign-up-password', 'input-alert-message');
    removeRedBorderAndTextFalseInput('sign-up-password-confirm', 'input-alert-message');
    removeRedBorderAndTextFalseInput('user-email-input', 'input-alert-message');
}


/**
 * Checks if the password value has eigth chars.
 * 
 * @returns - A boolean.
 */
function checkPasswordLength(){
  let valid = false;
  let ref = document.getElementById('sign-up-password');
    ref.value.length >= 8 ? valid=  true : valid = false;
  return valid;
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

  setTimeout(() =>  {resetForm('sign-up-form')}, 300);
  setTimeout(() => redirectToLogIn(), 800);
}


/**
 * An empty user template for the sign up function to fetch to the api.
 */
function getNewUserTemp(){
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
function checkIfPasswordIsSameAsConfirm(){
  const newUserPassword = document.getElementById("sign-up-password").value;
  const newUserPasswordConfirm = document.getElementById(
    "sign-up-password-confirm"
  ).value;
  if (newUserPassword !== newUserPasswordConfirm){
    return true;
  } else {
    return false;
  }
}


/**
 * Sets the main content brightness to 50%.
 */
function mainContentBrightness50(){
  const ref = document.getElementById("main-container");
  ref.classList.add("darken-background");
}


/**
 * Adds a class to show the overlay button container.
 * 
 * @param {string} buttonId - The id of the button container to show.
 * @param {string} buttonText - The text displayed in the button.
 */
function showOverlayButton(buttonId, buttonText){
  const ref = document.getElementById(buttonId);
  ref.innerText = buttonText;
  ref.classList.add("overlay-button-show");
}


/**
 * Removes a class to hide the overlay button container.
 * 
 * @param {string} buttonId - The container id of the button.
 */
function hideOverlayButton(buttonId){
  const ref = document.getElementById(buttonId);
  ref.classList.remove("overlay-button-show");
}


/**
 * Redirect to the login page.
 */
function redirectToLogIn(){
  window.location.href = "../html/index.html";
}


/**
 * Toggles the sign up button in desktop and mobile version.
 */
function toggleSignUpButton(){
  const valid = checkSignUpValidation();
  const buttonRef = document.getElementById('sign-up-button');
    if (valid && window.innerWidth > 1025){
      buttonRef.disabled = false;
      buttonRef.classList.add('dark-button');
      buttonRef.classList.remove('dark-button-signup');
    } else if (valid && window.innerWidth <= 1024){
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
 * Checks if all form fields are filled in and privacy is checked.
 * 
 * @returns - A boolean.
 */
function checkSignUpValidation(){
  const nameRef = document.getElementById('sign-up-name').value;
  const mailRef = document.getElementById('user-email-input').value;
  const pwRef = document.getElementById('sign-up-password').value;
  const pwConfirmRef = document.getElementById('sign-up-password-confirm').value;
  const checkPrivacy = document.getElementById('accept-privacy');
  if (nameRef != '' && mailRef != '' && pwRef != '' && pwConfirmRef != '' && checkPrivacy.checked == true) {
    return true;
  } else {
    return false;
  }
}


/**
 * Changes the source of the password icon in the sign up form.
 * 
 * @param {string} inputContainerId - The id of the input container.
 * @param {string} iconContainerId - The id of the logo container.
 */
function changePasswordIcon(inputContainerId, iconContainerId){
  let ref = document.getElementById(inputContainerId).value
      if (ref !== ""){
        setIconToContent(iconContainerId, '../assets/icons/visibility_off.svg');
      } else {
        setIconToContent(iconContainerId, '../assets/icons/lock.svg')
      }
}


/**
 * Changes the visibility of the password value in the input field by changing the input field type.
 * 
 * @param {string} inputId - The id of the input container.
 * @param {string} logoId - The id of the logo container.
 */
function showHidePassword(inputId, logoId){
  let text = document.getElementById(inputId);
  let logo = document.getElementById(logoId);
  if (text.value){
  switch (text.type == "password"){
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