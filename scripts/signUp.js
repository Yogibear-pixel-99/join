// get infos from: value

// name
// email
// password
// confirm password

// function who checks if

// password and confirm is same
// privacy is checked
// user allready exists
// email allready exists

// then update data to firebase

// box with: "you signed up successfully"

// directed to log in page

let newUserData = [];
let allUserData = [];

async function signUpNewUser(event) {
  event.preventDefault();
  getNewUserTemp();
  await getDataFromServer('users', allUserData);
  collectFormInformation();

  console.log(newUserData);
  console.log(allUserData);
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
  newUserData = `{
    name: "",
    email: "",
    password: "",
    toDo: "",
    done: "",
    priority: [{ urgent: "" }, { medium: "" }, { low: "" }],
    tasksInBoard: "",
    tasksInProgress: "",
    awaitingFeedback: "",
  }`;
}
