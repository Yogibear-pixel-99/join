/* 
const loginREF = document.getElementById("login"); */
let loginInfoList = [];

async function getUserInfo() {
  await getDataFromServer("users", usersFromApi);
  getAllLoginInfo();
}

function getAllLoginInfo() {
    loginInfoList = [];
    for (let index = 0; index < usersFromApi.length; index++) {
       loginInfoList.push({
          email: usersFromApi[index].email,
          password:usersFromApi[index].password
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
  let emailREF = document.getElementById("email").value;
  let emailChecked = loginInfoList.some(item => item.email === emailREF);
  console.log(emailChecked);
  
  if (emailChecked === true) {
    let emailIndex = loginInfoList.findIndex(item => item.email === emailREF);
    console.log(emailIndex);
    checkPassword(emailIndex, event);
  } 
}

function checkPassword(emailIndex, event) {
  const passwordREF = document.getElementById("password").value;
  let passwordChecked= loginInfoList.findIndex(item => item.password === passwordREF);
  console.log(passwordChecked);
  
  if (passwordChecked == emailIndex) {
    window.location.href = "summary.html"
  }
  
}

