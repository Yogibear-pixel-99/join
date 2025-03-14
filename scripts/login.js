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
    
    let position = emailUserList.indexOf('lukas@schmidt.com')
    console.log(position);
    
}

function getAllPasswords() {
    for (let index = 0; index < usersFromApi.length; index++) {
        passwordUserList.push(usersFromApi[index].password); 
     }
     
}



function checkLogin() {
  const passwordREF = document.getElementById("password").value;
  checkEmail();
}

function checkEmail() {
  const emailREF = document.getElementById("email").value;
 
}

function checkPassword() {
  const passwordREF = document.getElementById("password").value;
}

getUserInfo();
