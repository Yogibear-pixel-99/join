




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

let formInputTest = [];

function signUpNewUser() {
    let newUserData = {};
    // if (checkPasswordAndConfirmPasswordIsSame()) {
        
    // }
    // ;

    let formInfos = document.getElementById('sign-up-form');
    let data = new FormData(formInfos);

    newUserData = Object.fromEntries(data);


    console.log(formInputTest);
}



// function signUpNewUser(){
//     const name = document.getElementById('sign-up-name').value;
//     const email = document.getElementById('sign-up-email').value;

//     const privacyCheck = document.getElementById('accept-privacy');
//         if (checkValuesFromSignUpFields(name, email, password, passwordConfirm, privacyCheck)) {
//             fetchNewUserToDatabase(name, email, password, passwordConfirm, privacyCheck);
//         } 
        

// }


// function checkValuesFromSignUpFields(name, email, password, passwordConfirm, privacyCheck){
//     if (name != '' && email != '' && password != '' && (password === passwordConfirm) && privacyCheck.checked) {
//         return true;
//     }
// }


// function fetchNewUserToDatabase(name, email, password, passwordConfirm, privacyCheck){
// function fetchNewUserToDatabase(){
//     console.log('ready to fetch');
// }