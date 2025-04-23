/**
 * This function takes the users from the database and pushes them into an object
 * 
 */
async function getUserInfo(){
  await getDataFromServer("users", usersFromApi);
  redirectIfUserIsSaved();
}


/**
 * Sets the z-index of the mobile login mask to 0 after a 500ms delay.
 * Used to hide the mobile login overlay after animations/transitions.
 * 
 * @returns {number} - The timeout ID from setTimeout
 */
function turnZIndexToZero() {
  return setTimeout(() => {
    let mobileMaskREF = document.getElementById("mobile-login-mask");
    mobileMaskREF.style.zIndex = "0";
  }, 500);
}


/**
 * This function checks the login and opens the checkEmail function to see if this email exists in the database.
 * 
 * @param {Event} event - The form submit event object
 */
function checkLogin(event){

  event.preventDefault();
  getUserInfo().then(() => {
   checkEmail(event); 
  });
}


/**
 * Checks if the remember button is checked.
 */
function checkRememberMeButton(){
  const ref = document.getElementById('remember');
  const mailRef = document.getElementById('email');
    if (ref.checked == true) {
      localStorage.setItem('joinUserEmail', mailRef.value);
    }
}


/**
 * Checks if the user is saved in the local storage and redirects to summary if.
 */
function redirectIfUserIsSaved(){
  let userEmail = localStorage.getItem('joinUserEmail');
  if(userEmail != null) {
    let emailChecked = usersFromApi.some(
      (item) => item.email === userEmail);
    if (emailChecked === true){
      emailIndex = usersFromApi.findIndex(
        (item) => item.email === userEmail);
    sessionStorage.setItem('userLoggedIn', true);
    sessionStorage.setItem('indexOfUser', emailIndex);
    window.location.href = "summary.html";
  }
}}



/**
 * This function checks the email to see if a valid one exists.
 * 
 * @param {boolean} emailChecked - The Boolean indicates whether the email exists in the database or not.
 * @param {integer} emailIndex- The index that stores the position of the email in the database
 */
function checkEmail(){
  let emailChecked = usersFromApi.some(
    (item) => item.email === emailREF.value
  );

  if (emailChecked === true){
    emailIndex = usersFromApi.findIndex(
      (item) => item.email === emailREF.value
    );
    checkPassword(emailIndex);
  } else {
    setErrorMessageToLogin();
  }
}


/**
 * This function checks whether the respective password matches the email.
 * 
 * @param {integer} emailIndex - The position in the database at which the specified email is located
 */
function checkPassword(emailIndex){
  let user = usersFromApi[emailIndex];  
  if (user && user.password === passwordREF.value ){
    sessionStorage.setItem("indexOfUser", emailIndex);
    sessionStorage.setItem("userLoggedIn", true)
    window.location.href = "summary.html";
    checkRememberMeButton();
  } else {
    setErrorMessageToLogin();
  }
}


/**
 * Shows an error message in the log in form.
 */
function setErrorMessageToLogin(){
  addRedBorderAndTextFalseInput("email", "login-error-message", "Check your email and password. Please try again. ");
  addRedBorderAndTextFalseInput("password", "login-error-message", "Check your email and password. Please try again. ");
  setTimeout(() => {removeRedBorderAndTextFalseInput("email", "login-error-message")}, 3000);
  setTimeout(() => {removeRedBorderAndTextFalseInput("password", "login-error-message")}, 3000);
}


/**
 * Changes the source of the password icon in the login form.
 */
function changeLoginPasswordIcons(){
  if ((passwordREF.value == "")){
    inputLogoREF.src = "../assets/icons/lock.svg";
  } else {
    inputLogoREF.src = "../assets/icons/visibility_off.svg";
  }
}

/**
 * This on-click function stores in the session storage that the login is a guest login.
 * 
 */
function sessionStorageGuest(){
        sessionStorage.removeItem("indexOfUser");
        sessionStorage.setItem("userLoggedIn", false)
    }

/**
 * This function switches to the summary when the guest login button is clicked.
 * 
 */
function switchToSummary(){
  window.location.href = '../html/summary.html';
}


/**
 * Checks if values are in the log in form and enables/disables the log in button.
 */
function checkLoginButtonActive(){
  let emailRef = document.getElementById('email').value;
  let pwRef = document.getElementById('password').value;
if (emailRef == '' || pwRef =='') {
    let ref = document.getElementById('login');
        ref.classList.add('dark-button-signup');
        ref.classList.remove('dark-button');
        ref.disabled = true;
} else {
  let ref = document.getElementById('login');
  ref.classList.remove('dark-button-signup');
  ref.classList.add('dark-button');
  ref.disabled = false;
}}