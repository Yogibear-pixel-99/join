/* 
const loginREF = document.getElementById("login"); */
let emailUserList = [];
let passwordUserList = [];

async function getUserInfo() {
  await getDataFromServer("users", usersFromApi);
  getAllEmail();
  getAllPasswords();
  
  
}

function getAllEmail() {
    for (let index = 0; index < usersFromApi.length; index++) {
       emailUserList.push(usersFromApi[index].email); 
    }
    console.log(emailUserList);
    
    let position = emailUserList[1].includes('lukas@schmidt.com')
    console.log(position);
    
    
}

function getAllPasswords() {
    for (let index = 0; index < usersFromApi.length; index++) {
        passwordUserList.push(usersFromApi[index].password); 
     }
     console.log(passwordUserList);
     
}



function checkLogin(event) {
  checkEmail(event);
}

function checkEmail(event) {
  const emailREF = document.getElementById("email").value;
  let emailChecked = emailUserList.includes(emailREF);
  if (emailChecked == true) {
    let emailIndex = emailUserList.indexOf(emailREF);
    checkPassword(emailIndex, event);
  } else {
    event.preventDefault();
  }
}

function checkPassword(emailIndex, event) {
  const passwordREF = document.getElementById("password").value;
  let passwordChecked= passwordUserList[emailIndex].includes(passwordREF);
  if (passwordChecked === false) {
    event.preventDefault();
  }
}

getUserInfo();
