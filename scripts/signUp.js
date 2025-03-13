// function who checks if

// then update data to firebase

// box with: "you signed up successfully"

// directed to log in page

let newUserData = {};

async function signUpNewUser(event) {
  event.preventDefault();
  if (checkIfPasswordIsSameAsConfirm()) {
    showOverlayButton(
      "sign-up-success-button",
      "Passwort stimmt nicht überein"
    );
    setTimeout(() => hideOverlayButton("sign-up-success-button"), 2500);
    console.log("Passwort stimmt nicht überein");
  } else if (await checkIfUserAlreadyExists()) {
    showOverlayButton("sign-up-success-button", "User existiert bereits");
    setTimeout(() => hideOverlayButton("sign-up-success-button"), 2500);
  } else {
    getNewUserTemp();
    collectFormInformation();
    await postDataToApi("users", newUserData);
    mainContentBrightness50();
    showSignUpButton("You Signed Up successfully");
    setTimeout(() => redirectToLogInPage(), 1000);
  }
}

function collectFormInformation() {
  let formInfos = document.getElementById("sign-up-form");
  let data = new FormData(formInfos);
  for (const [key, value] of data.entries()) {
    if (newUserData.hasOwnProperty(key)) {
      newUserData[key] = value;
    }
  }
}

function getNewUserTemp() {
  newUserData = {
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

async function checkIfUserAlreadyExists() {
  const userEmail = document.getElementById("sign-up-email").value;
  let allUserDataEmail = [];
  try {
    const response = await fetch(MAIN_URL + "users" + ".json");
    console.log(response);
    if (!response.ok) {
      throw new Error("error loading users");
    } else {
      let data = await response.json();
      console.log(data);
      allUserDataEmail = Object.values(data).map((element) => element.email);
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
  if (allUserDataEmail.some((element) => element === userEmail)) {
    return true;
  } else {
    return false;
  }
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

async function postDataToApi(objName, newData) {
  try {
    const response = await fetch(MAIN_URL + objName + ".json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error(`Fehler beim übertragen! - ${response.status}`);
    }
    const data = await response.json();
    console.log("Erfolgreich", data);
  } catch (error) {
    console.error("Error:", error.message);
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
  //   ref.innerText = '';
  ref.classList.remove("overlay-button-show");
}

function redirectToLogInPage() {
  window.location.href = "../html/login.html";
}

function addRedBorderAndTextFalseInput(containerId, redBorderClass, alertText){
    const ref = document.getElementById(containerId);
          ref.classList.add(redBorrderClass);
}