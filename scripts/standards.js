





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

/**
 * Check if data in the inputfield is already in the realtime database and returns a boolean.
 * 
 * @param {string} userContainerId - The user input field to collect the data to compare in the database.
 * @param {string} objName - The specified object in the database for comparison.
 * @returns 
 */
async function checkIfDataAlreadyExists(userContainerId, objName) {
    const userEmail = document.getElementById(userContainerId).value;
    try {
      const response = await fetch(MAIN_URL + objName + ".json");
      if (!response.ok) {
        throw new Error("error loading users");
      } else {
        let data = await response.json();
        return Object.values(data).some((element) => element.email === userEmail);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

/**
 * Adds a red border to the wrong user input field and displays an error text message.
 * 
 * @param {string} borderContainer - The id of the container to add a red border css class.
 * @param {string} messageContainer - The id of the error message container to show up in red color.
 * @param {string} errorMessage - The displayed error message at the inputfield.
 */
  function addRedBorderAndTextFalseInput(borderContainer, messageContainer, errorMessage){
    const contentRef = document.getElementById(borderContainer).parentElement;
    const textRef = document.getElementById(messageContainer);
          contentRef.classList.add('red-border-inputfield');
          textRef.innerText = errorMessage;
          textRef.style.color = 'red';
}

/**
 * Removes the red border from the user inputfield and hides the error message.
 * 
 * @param {string} borderContainer - The id of the container to remove the red border css class.
 * @param {string} messageContainer - The id of the error message container to hide.
 */
function removeRedBorderAndTextFalseInput(borderContainer, messageContainer){
    const contentRef = document.getElementById(borderContainer).parentElement;
    const textRef = document.getElementById(messageContainer);
          contentRef.classList.remove('red-border-inputfield');
          textRef.style.color = 'white';
}

/**
 * Global function to collect form data and put it in the collectedFormInfos variable. Needs to set a template before to collectedFormInfos.
 * 
 * @param {string} formContainer - The id of the form container to collect the infos.
 */
function collectFormInformation(formContainer) {
  let formInfos = document.getElementById(formContainer);
  let data = new FormData(formInfos);
  for (const [key, value] of data.entries()) {
    if (collectedFormInfos.hasOwnProperty(key)) {
      collectedFormInfos[key] = value;
    }
  }
}


async function getTheNextFreeIdNumberFromApi(objName){
  try {
    let response = await fetch(MAIN_URL + objName + '.json');
    console.log(response);
    if (!response.ok) {
      throw new Error('No answer from server!');
    }
    let data = await response.json();
    let newId = sortDataFromApiAndGetFreeIdNumber(data);
    return newId;
  } catch (error) {
    console.log(error);
  }
}

function sortDataFromApiAndGetFreeIdNumber(data){
    let arrayFromData = Object.values(data);
    let allIdArray = arrayFromData.map(element => element.id);
    let newId = allIdArray.length + 1;
    allIdArray.sort((a, b) => a - b);
    for (let idIndex = 0; idIndex < allIdArray.length; idIndex++) {
      const element = allIdArray[idIndex];
        if (element != idIndex + 1) {
          newId = (idIndex + 1);
          break
        }
    }
    return newId;
}


/**
 * Toggles a specified overlaymenu with the given id.
 * 
 * @param {string} overlayId - The id of the overlay menu to show up.
 * @param {string} maskId - The id of the mask background to separate overlay from maincontainer.
 */
function toggleOverlayMenu(overlayId, maskId){
  const overlay = document.getElementById(overlayId);
  const mask = document.getElementById(maskId);
  const mainContent = document.getElementById('main-container');
      overlay.classList.toggle('standard-overlay-hide');
      mask.classList.toggle('d-none');
      mainContent.classList.toggle('disable-pointer-events');
}


getUserSummaryInfo();

function initialsChange() {
  let headerInitialsREF = document.getElementById("header-initials");
  headerInitialsREF.innerText = userInfoList[emailIndex].name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
}

async function getUserSummaryInfo() {
  await getDataFromServer("users", usersFromApi);
  loadUserArray();
}

function loadUserArray() {
  emailIndex = sessionStorage.getItem("indexOfUser");
  userInfoList = [];
for (let index = 0; index < usersFromApi.length; index++) {
  userInfoList.push({
    name: usersFromApi[index].name,
    email: usersFromApi[index].email,
    password: usersFromApi[index].password,
  });
}
initialsChange(); 
}