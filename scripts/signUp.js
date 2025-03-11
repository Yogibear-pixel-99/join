




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



function signUpNewUser(){
    const name = document.getElementById('sign-up-name').value;
    const email = document.getElementById('sign-up-email').value;
    const password = document.getElementById('sign-up-password').value;
    const passwordConfirm = document.getElementById('sign-up-password-confirm').value;
    const privacyCheck = document.getElementById('accept-privacy');
        if (checkValuesFromSignUpFields(name, email, password, passwordConfirm, privacyCheck)) {
            fetchNewUserToDatabase(name, email, password, passwordConfirm, privacyCheck);
        } 
        

}


function checkValuesFromSignUpFields(name, email, password, passwordConfirm, privacyCheck){
    if (name != '' && email != '' && (password === passwordConfirm) && privacyCheck.checked) {
        return true;
    }
}


function fetchNewUserToDatabase(name, email, password, passwordConfirm, privacyCheck){
    console.log('ready to fetch');
}