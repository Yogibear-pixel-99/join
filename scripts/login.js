const emailREF = document.getElementById("email");
const passwordREF = document.getElementById("password");
const inputLogoREF = document.getElementById("input-logo");
const guestLoginREF = document.getElementById("guest-login");
let emailIndex = -1;
let loginInfoList = [];

async function getUserInfo() {
  await getDataFromServer("users", usersFromApi);
  getAllLoginInfo();
}

function getAllLoginInfo() {
  loginInfoList = [];
  for (let index = 0; index < usersFromApi.length; index++) {
    loginInfoList.push({
      name: usersFromApi[index].name,
      email: usersFromApi[index].email,
      password: usersFromApi[index].password,
    });
  }
  console.log(loginInfoList);
  
}

function checkLogin(event) {
  getUserInfo();
  event.preventDefault();
  checkEmail(event);
}

function checkEmail(event) {
  let emailChecked = loginInfoList.some(
    (item) => item.email === emailREF.value
  );
  console.log(emailChecked);

  if (emailChecked === true) {
    emailIndex = loginInfoList.findIndex(
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
  let passwordChecked = loginInfoList.findIndex(
    (item) => item.password === passwordREF.value
  );
  console.log(passwordChecked);
  if (passwordChecked == emailIndex) {
    sessionStorage.setItem("indexOfUser", emailIndex);
    sessionStorage.setItem("userLoggedIn", true)
    window.location.href = "summary.html";
    removeRedBorderAndTextFalseInput("email", "login-error-message");
    removeRedBorderAndTextFalseInput("password", "login-error-message");
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
    }
}

