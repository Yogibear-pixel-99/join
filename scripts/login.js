const emailREF = document.getElementById("email");
const passwordREF = document.getElementById("password");
const inputLogoREF = document.getElementById("input-logo");
const guestLoginREF = document.getElementById("guest-login");
let emailIndex = -1;

async function getUserInfo() {
  await getDataFromServer("users", usersFromApi);
}

function checkLogin(event) {
  event.preventDefault();
  getUserInfo().then(() => {
   checkEmail(event); 
  });
}

function checkEmail(event) {
  let emailChecked = usersFromApi.some(
    (item) => item.email === emailREF.value
  );
  console.log(emailChecked);

  if (emailChecked === true) {
    emailIndex = usersFromApi.findIndex(
      (item) => item.email === emailREF.value
    );
    console.log(emailIndex);
    checkPassword(emailIndex, event);
  } else {
    addRedBorderAndTextFalseInput(
      "email",
      "login-error-message",
      "Check your email and password. Please try again. "
    );
    addRedBorderAndTextFalseInput(
      "password",
      "login-error-message",
      "Check your email and password. Please try again. "
    );
  }
}

function checkPassword(emailIndex, event) {
  let user = usersFromApi[emailIndex];  
  if (user && user.password === passwordREF.value ) {
    sessionStorage.setItem("indexOfUser", emailIndex);
    sessionStorage.setItem("userLoggedIn", true)
    removeRedBorderAndTextFalseInput("email", "login-error-message");
    removeRedBorderAndTextFalseInput("password", "login-error-message");
    window.location.href = "summary.html";
  } else {
    addRedBorderAndTextFalseInput(
      "email",
      "login-error-message",
      "Check your email and password. Please try again. "
    );
    addRedBorderAndTextFalseInput(
      "password",
      "login-error-message",
      "Check your email and password. Please try again. "
    );
  }
}

if (passwordREF) {
passwordREF.onkeyup = function () {
  if ((passwordREF.innerText = "")) {
    inputLogoREF.src = "../assets/icons/lock.svg";
  } else {
    inputLogoREF.src = "../assets/icons/visibility_off.svg";
  }
};
}

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

if (guestLoginREF) {
    guestLoginREF.onclick = function () {
        sessionStorage.removeItem("indexOfUser");
        sessionStorage.setItem("userLoggedIn", false)
    }
}


function switchToBoard(){
  window.location.href = '../html/summary.html';
  setTimeout(() => {console.log('time')}, 100);
  console.log(window.location.href);
  
  // open greeting container
  // add animation fade
  // switch to summary
  // setInitialsToGuest();
}

