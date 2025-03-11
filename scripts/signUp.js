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

let newUserData = {};
let allUserData = [];

async function signUpNewUser(event) {
  event.preventDefault();
  getNewUserTemp();
  collectFormInformation();
//   check if PW and CONFIRM is same
  await getDataFromServer('users', allUserData);
  checkIfUserAlreadyExists();

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


function checkIfUserAlreadyExists(){
    let newUserEmail = newUserData.email;
        if (checkIfEmailIsInUse(newUserEmail)) {
            alert(`user already excists. ${newUserEmail} is already in use!`)
        } else {
            console.log('user will be pushed');
        }
}

function checkIfEmailIsInUse(newUserEmail){
    allUserData.find(element => {
        if (element.email === newUserEmail)
        return true;
    })
}