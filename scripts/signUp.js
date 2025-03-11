

// function who checks if




// then update data to firebase

// box with: "you signed up successfully"

// directed to log in page

let newUserData = {};

async function signUpNewUser(event){
    event.preventDefault();
    if (await checkIfUserAlreadyExists()) {
        console.log('user existiert bereits')
    } else if (checkIfPasswordIsSameAsConfirm()) {
        console.log('Passwort stimmt nicht überein')
    } else {
        getNewUserTemp();
        collectFormInformation();
        await postDataToApi('users', newUserData);
        showSignUpButton();
        setTimeout(() => redirectToLogInPage(), 1000);
    }



// TODO: Change the comparisation because of security lecks. - just/email???
// Add user ID Nr. from the length of the existing users
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

async function checkIfUserAlreadyExists(){
    const userEmail = document.getElementById('sign-up-email').value;
    let allUserDataEmail = [];
    try {
        const response = await fetch(MAIN_URL + 'users' + '.json' );
        console.log(response);
        if (!response.ok) {
            throw new Error("error loading users");
        } else {
        let data = await response.json();
            for (let userIndex = 0; userIndex < data.length; userIndex++) {
                const element = data[userIndex].email;
                      allUserDataEmail.push(element);
            }
        }
    } catch (error) {
        console.log('Error:', error.message);
    }
    if (allUserDataEmail.some(element => element === userEmail)) {
            return true;
        } else {
            return false;
        }
}


function checkIfPasswordIsSameAsConfirm(){
    const newUserPassword = document.getElementById('sign-up-password').value;
    const newUserPasswordConfirm = document.getElementById('sign-up-password-confirm').value;
    if (newUserPassword !== newUserPasswordConfirm) {
        return true;
    } else {
        return false;
    }
}

async function postDataToApi(objName, newData){
    try {
    const response = await fetch (MAIN_URL + objName + '.json', {
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
    console.log('Erfolgreich', data);
    }
    catch (error) {
        console.error('Error:', error.message);
    }
}

