

MAIN_URL = "https://join-e2ac8-default-rtdb.europe-west1.firebasedatabase.app/";
let contactsFromApi = [];
let tasksFromApi = [];
let usersFromApi = [];
let subtasksFromApi = [];
let collectedFormInfos = {};
let collectedStatusInfo = {};


/**
 * Fetches data from the firebase api to the specified array and gets the api key for every entry.
 * 
 * @param {string} SUB_URL - The name of the needed object in firebase.
 * @param {Array} destination - Storage place of the fetched array.
 */
async function getDataFromServer(SUB_URL, destination) {
    destination.splice(0, destination.length);
    try {
        let response = await fetch (MAIN_URL + SUB_URL + ".json");
        if (!response.ok) {
            throw new Error('no answer from server');
        } else {
            let data = await response.json();
            data != null ? filterFetchedDataAndKey(data, destination) : console.log('No Data to display!')
        }
    } catch (error) {
        console.log(error);
    }
}


async function postDataToApi(SUB_URL, payload) {
  try {
    const response = await fetch(MAIN_URL + SUB_URL + ".json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
 * Patch the payload to the firebase api.
 * 
 * @param {object} payload - The created data object to patch.
 * @param {string} SUB_URL - The destination url for the database to patch the payload.
 */
async function patchDataToApi(payload, SUB_URL) {

    if (SUB_URL != undefined) {
      try {
        let response = await fetch(
          MAIN_URL + SUB_URL + ".json",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (!response.ok) {
          throw new Error("Contact not found in Database!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }


/**
 * Filters the fetched data, delete null positions, puts the database key to the data.
 * 
 * @param {Object} data - Fetched object from the firebase api.
 * @param {Array} destination - The array, where the data is saved local.
 */
function filterFetchedDataAndKey(data, destination){
  let dataArray = Object.entries(data);
  let filteredArray = dataArray.filter(element => element[1] != null);
  for (let dataIndex = 0; dataIndex < filteredArray.length; dataIndex++) {
      const element = filteredArray[dataIndex];
  destination.push(element[1]);
  destination[dataIndex]["apiKey"] = element[0];
  }
}


/**
 * 
 * @param {string} SUB_URL - The header in the database.
 * @param {string} destinationApiKey - The keyvalue to delete the data in the database.
 */
async function deleteDataFromApi(SUB_URL, destinationApiKey) {
  if (apiKey != "" || apiKey != undefined) {
    try {
      await fetch(MAIN_URL + SUB_URL + destinationApiKey + ".json", {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("contactKey is empty!");
  }
}


/**
 * Close the deleted contact in the float menu.
 */
function emptyFloatMenu() {
  const menuRef = document.getElementById("bottom-board");
  menuRef.classList.remove("floating-contact-container-open");
}


/**
 * Create the initials from the full name element and add them to the object.
 * 
 * @param {string} fullName - The full name of the needed initials.
 * @returns - Returns the first letter of every word.
 */
function returnInitials(fullName){
  if (fullName) {
    const normalizedName = fullName.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const regExp = /\b\p{L}/gu;
    const initialsArray = normalizedName.match(regExp);
    return initialsArray.join("");
  } else {
    return '';
  }
}


/**
 * Toggles the dropdown menu in the header if click on the initials button.
 */
function toggleHeaderDropdownMenu() {
    let dropdownREF = document.getElementById("dropdown");
    dropdownREF.classList.toggle("d-none");
}


/**
 * Stopps event bubbling.
 * 
 * @param {Object} event - The standard event.
 */
function noClose(event) {
    event.stopPropagation();
}


// DOPPELTE FUNKTION SCRIPT Zeile 168 und BOARD Zeile 101
function toggleAddedToBoard() {
    let addedToBoardREF = document.getElementById("task-added");
    addedToBoardREF.classList.toggle("d-none");
    loadingToBoard();
}


function loadingToBoard() {
    return setTimeout(() => {
        let addedToBoardREF = document.getElementById("task-added");
        addedToBoardREF.classList.toggle("d-none");
        window.location.href = "board.html";
        }, 3000);
      }





function userLoggedIn() {
  let userNavbarREF = document.getElementById("user-navbar");
  let questNavbarREF = document.getElementById("quest-navbar");
  let checkUserLoggedIn = sessionStorage.getItem("userLoggedIn");
  let mobileNavbarUser = document.getElementById('mobile-navbar-user');
  let mobileNavbarGuest = document.getElementById('mobile-navbar-guest');
 


  
  if (checkUserLoggedIn == "true") {
    userNavbarREF.classList.toggle("d-none");
    mobileNavbarUser.classList.toggle("d-none");
  } else {
    questNavbarREF.classList.toggle("d-none");
    mobileNavbarGuest.classList.toggle("d-none");
  }
}


function removeSessionStorageUser(){
  sessionStorage.removeItem("indexOfUser");
  sessionStorage.removeItem("userLoggedIn");
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

    let allIdArray = arrayFromData.map((element) => {
      if (element != null) {
        return element.id;}
      })
    let newId;
    allIdArray.sort((a, b) => a - b);
    for (let idIndex = 0; idIndex < allIdArray.length; idIndex++) {
      const element = allIdArray[idIndex];
        if (element != idIndex + 1) {
          newId = (idIndex + 1);
          break
        } else {
          newId = allIdArray.length + 1;
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


// getUserSummaryInfo();

function initialsChange() {
  let headerInitialsREF = document.getElementById("header-initials");
  emailIndex = sessionStorage.getItem("indexOfUser");
  userInfoList = [];
  if (emailIndex === null) {
    headerInitialsREF.innerText = "G";
  } else {
    headerInitialsREF.innerText = returnInitials(usersFromApi[emailIndex].name.slice(0, 2));
  }
}

async function getUserInitialInfo() {
  await getDataFromServer("users", usersFromApi);
  initialsChange();
}

