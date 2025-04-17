/**
 * This function takes the users from the database and pushes them into an object
 * 
 */
async function getUserInfo() {
  await getDataFromServer("users", usersFromApi);
}

/**
 * This function checks the login and opens the checkEmail function to see if this email exists in the database.
 * 
 */
// SHORTEN THIS FUNCTION
function checkLogin(event) {
  event.preventDefault();
  getUserInfo().then(() => {
   checkEmail(event); 
  });
}

/**
 * This function checks the email to see if a valid one exists.
 * 
 * @param {boolean} emailChecked - The Boolean indicates whether the email exists in the database or not.
 * @param {integer} emailIndex- The index that stores the position of the email in the database
 */
function checkEmail() {
  let emailChecked = usersFromApi.some(
    (item) => item.email === emailREF.value
  );
// DOPPELTE ÜBERPRÜFUNG
  if (emailChecked === true) {
    emailIndex = usersFromApi.findIndex(
      (item) => item.email === emailREF.value
    );
    checkPassword(emailIndex);
  } else {
    addRedBorderAndTextFalseInput("email", "login-error-message", "Check your email and password. Please try again. " );
    addRedBorderAndTextFalseInput("password", "login-error-message", "Check your email and password. Please try again. " );
  }
}

/**
 * This function checks whether the respective password matches the email.
 * 
 * @param {integer} emailIndex - The position in the database at which the specified email is located
 */
function checkPassword(emailIndex) {
  let user = usersFromApi[emailIndex];  
  if (user && user.password === passwordREF.value ) {
    sessionStorage.setItem("indexOfUser", emailIndex);
    sessionStorage.setItem("userLoggedIn", true)
    removeRedBorderAndTextFalseInput("email", "login-error-message");
    removeRedBorderAndTextFalseInput("password", "login-error-message");
    window.location.href = "summary.html";
  } else {
    addRedBorderAndTextFalseInput("email", "login-error-message", "Check your email and password. Please try again. ");
    addRedBorderAndTextFalseInput("password", "login-error-message", "Check your email and password. Please try again. ");
  }
}

/**
 * This function changes the symbol in the password field when writing in the password field.
 * 
 */
if (passwordREF) {
passwordREF.onkeyup = function () {
  if ((passwordREF.innerText == "")) {
    inputLogoREF.src = "../assets/icons/lock.svg";
  } else {
    inputLogoREF.src = "../assets/icons/visibility_off.svg";
  }
};
}


/**
 * This function changes the type of the password input field when the visibility icon is clicked.
 * 
 */
if (inputLogoREF) {
    inputLogoREF.onclick = function () {
        if (password.type == "password") {
          password.type = "text";
          inputLogoREF.src = "../assets/icons/visibility-eye.svg";
        } else {
          password.type = "password";
          inputLogoREF.src = "../assets/icons/visibility_off.svg";
        }
      };
}

/**
 * This on-click function stores in the session storage that the login is a guest login.
 * 
 */
if (guestLoginREF) {
    guestLoginREF.onclick = function () {
        sessionStorage.removeItem("indexOfUser");
        sessionStorage.setItem("userLoggedIn", false)
    }
}

/**
 * This function switches to the summary when the guest login button is clicked.
 * 
 */
function switchToSummary(){
  window.location.href = '../html/summary.html';
  setTimeout(() => {console.log('time')}, 100);
  console.log(window.location.href);
}

