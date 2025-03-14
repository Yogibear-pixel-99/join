/* 
const loginREF = document.getElementById("login"); */
let loginInfoList = [];

async function getUserInfo() {
  await getDataFromServer("users", usersFromApi);
  getAllLoginInfo();
}

function getAllLoginInfo() {
    for (let index = 0; index < usersFromApi.length; index++) {
       loginInfoList.push({
          email: usersFromApi[index].email,
          password:usersFromApi[index].password
       }); 
    }
    console.log(loginInfoList);
    let position = loginInfoList.findIndex(item => item.email === "lukas@schmidt.com")
    console.log(position); 
}

function checkLogin(event) {
  getUserInfo();
  event.preventDefault();
  checkEmail(event);
}

function checkEmail(event) {
  let emailREF = document.getElementById("email");
  let emailValue = "";
    emailValue = emailREF.value;
  let emailChecked = emailUserList.includes(emailREF);
  if (emailChecked == true) {
    let emailIndex = emailUserList.indexOf(emailREF);
    checkPassword(emailIndex, event);
  } else {
    event.preventDefault();
  }
}

function checkPassword(emailIndex, event) {
    event.preventDefault();
  const passwordREF = document.getElementById("password").value;
  let passwordValue = passwordREF.value
  let passwordChecked= passwordUserList[emailIndex].includes(passwordREF);
  if (passwordChecked === false) {
    
  }
}

