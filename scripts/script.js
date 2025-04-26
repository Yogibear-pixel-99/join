/**
 * Filters the fetched data, delete null positions, puts the database key to the data.
 * 
 * @param {Object} data - Fetched object from the firebase api.
 * @param {Array} destination - The array, where the data is saved local.
 */
function filterFetchedDataAndKey(data, destination){
  let dataArray = Object.entries(data);
  let filteredArray = dataArray.filter(element => element[1] != null);
  for (let dataIndex = 0; dataIndex < filteredArray.length; dataIndex++){
      const element = filteredArray[dataIndex];
  destination.push(element[1]);
  destination[dataIndex]["apiKey"] = element[0];
  }
}


/**
 * Close the deleted contact in the float menu.
 */
function emptyFloatMenu(){
  const menuRef = document.getElementById("bottom-board");
  menuRef.classList.remove("floating-contact-container-open");
}


/**
 * Replaces all other strings than letters from the specified input container.
 * 
 * @param {HTMLElement} field - The HTML container to check.
 */
function justLetters(field) {
  let data = field.value.replace(/[^a-zA-ZäöüÄÖÜ\s]/g, '');
      field.value = data;
}


/**
 * Checks if a user is logged in and sets the navbar.
 */
function setGuestOrUserNavbar(){
  let userNavbarREF = document.getElementById("user-navbar");
  let guestNavbarREF = document.getElementById("guest-navbar");
  let checkUserLoggedIn = sessionStorage.getItem("userLoggedIn");
  let mobileNavbarUser = document.getElementById('mobile-navbar-user');
  let mobileNavbarGuest = document.getElementById('mobile-navbar-guest');
    if (checkUserLoggedIn == "true"){
      userNavbarREF.classList.toggle("d-none");
      mobileNavbarUser.classList.toggle("d-none");
    } else {
      guestNavbarREF.classList.toggle("d-none");
      mobileNavbarGuest.classList.toggle("d-none");
    }
}


/**
 * Remove the saved session logg in if the logged in user logs out.
 */
function removeUserFromLocalStorage(){
  sessionStorage.removeItem("indexOfUser");
  sessionStorage.removeItem("userLoggedIn");
  localStorage.removeItem("joinUserEmail");
}


/**
 * Check if data in the inputfield is already in the realtime database.
 * 
 * @param {string} userContainerId - The user input field to collect the data to compare in the database.
 * @param {string} objName - The specified object in the database for comparison.
 * @returns - A boolean.
 */
async function checkIfDataAlreadyExists(userContainerId, objName){
    const userEmail = document.getElementById(userContainerId).value;
    try {
      const response = await fetch(MAIN_URL + objName + ".json");
      if (!response.ok){
        throw new Error("error loading users");
      } else {
        let data = await response.json();
        return Object.values(data).some((element) => element.email === userEmail);
      }
    } catch (error){
      console.log("Error:", error.message);
    }
  }


   
/**
 * Opens a specified overlaymenu with the given id.
 * 
 * @param {string} overlayId - The id of the overlay menu to show up.
 * @param {string} maskId - The id of the mask background to separate overlay from maincontainer.
 */
function openOverlayMenu(overlayId, maskId){
  const overlay = document.getElementById(overlayId);
  const mask = document.getElementById(maskId);
  const mainContent = document.getElementById('main-container');
      overlay.classList.remove('d-none');
      setTimeout(() => {overlay.classList.remove('standard-overlay-hide')}, 100);
      setTimeout(() => {mask.classList.remove('d-none')}, 100);
      setTimeout(() => {mainContent.classList.add('disable-pointer-events')}, 100);
}


/**
 * Closes a specified overlaymenu with the given id.
 * 
 * @param {string} overlayId - The id of the overlay menu to show up.
 * @param {string} maskId - The id of the mask background to separate overlay from maincontainer.
 */
function closeOverlayMenu(overlayId, maskId){
  const overlay = document.getElementById(overlayId);
  const mask = document.getElementById(maskId);
  const mainContent = document.getElementById('main-container');
      overlay.classList.add('standard-overlay-hide');
      mask.classList.add('d-none');
      setTimeout(() => {mainContent.classList.remove('disable-pointer-events')}, 300);
      setTimeout(() => {overlay.classList.add('d-none')}, 200);
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
          textRef.innerText = "";
          textRef.style.color = 'white';
}


/**
 * Global function to collect form data and put it in the collectedFormInfos variable. Needs to set a template before to collectedFormInfos.
 * 
 * @param {string} formContainer - The id of the form container to collect the infos.
 */
function collectFormInformation(formContainer){
  let formInfos = document.getElementById(formContainer);
  let data = new FormData(formInfos);
  for (const [key, value] of data.entries()){
    if (collectedFormInfos.hasOwnProperty(key)){
      collectedFormInfos[key] = value;
    }
  }
}


/**
 * Check the database for the next free id number.
 * 
 * @param {string} SUB_URL - The destination url for the database to fetch data.
 * @returns - The next free id number in the database.
 */
async function getTheNextFreeIdNumberFromApi(SUB_URL){
  try {
    let response = await fetch(MAIN_URL + SUB_URL + '.json');
    if (!response.ok){
      throw new Error('No answer from server!');
    }
    let data = await response.json();
    let newId = sortDataFromApiAndGetFreeIdNumber(data);
    return newId;
  } catch (error){
    console.log(error);
  }
}


/**
 * Sorts the fetched data from the api without null positions in an array and search for next free id.
 * 
 * @param {object} data - The fetched object from the database.
 * @returns - The next free id integer.
 */
function sortDataFromApiAndGetFreeIdNumber(data){
    let arrayFromData = Object.values(data);
    let allIdArray = arrayFromData.map((element) => {
      if (element != null){
        return element.id;
      }})
    let newId;
    allIdArray.sort((a, b) => a - b);
    newId = checkArrayForNextFreeInteger(allIdArray);
    return newId;
}


/**
 * Iterates the array to find the next free id number.
 * 
 * @param {Array} allIdArray - The sorted id array.
 * @returns - The next free id number in the array.
 */
function checkArrayForNextFreeInteger(allIdArray){
  let newId;
  for (let idIndex = 0; idIndex < allIdArray.length; idIndex++){
    const element = allIdArray[idIndex];
      if (element != idIndex + 1){
        newId = (idIndex + 1);
        break
      } else {
        newId = allIdArray.length + 1;
      }
    }
    return newId;
}


/**
 * Checks if a user is logged in and sets the initials to the header.
 */
function setInitialsToHeader(){
  let headerInitialsREF = document.getElementById("header-initials");
  emailIndex = sessionStorage.getItem("indexOfUser");
  userInfoList = [];
  if (emailIndex === null){
    headerInitialsREF.innerText = "G";
  } else {
    headerInitialsREF.innerText = returnInitials(usersFromApi[emailIndex].name).slice(0, 2);
  }
}


/**
 * Resets the add task form.
 * 
 */
function resetAddTaskForm(){
  resetForm('add-task-form');
  clearAssignedTo();
  removeRedBorderAddTask();
}


/**
 * This function shows a button, that the generated task has been added to the board.
 * 
 */
function toggleAddedButton(containerId, showClass, hideClass){
  setTimeout(() => {toggleClassToContainer(containerId, hideClass)}, 1);
  setTimeout(() => {toggleClassToContainer(containerId, showClass)}, 100);
  setTimeout(() => {toggleClassToContainer(containerId, showClass)}, 1600);
  setTimeout(() => {toggleClassToContainer(containerId, hideClass)}, 1800);
}


/**
 * Checks if the "userLoggedIn" item exists in sessionStorage. If it's missing 
 * (user not logged in or not a guest), redirects the browser to "index.html".
 */
function redirectToLogInPage() {
  if (sessionStorage.getItem("userLoggedIn") == null) {
    window.location.href = "index.html";
  }
}


/**
 * Checks if a value is available. Adds the missing key.
 * 
 * @param {object} object - The data object to check.
 * @param {string} key - The key to check.
 * @param {array} emptyArray - The value to be added.
 */
function addMissingKeys(object, key, emptyArray){
  if (!(key in object)) {
    object[key] = emptyArray;
  }
}


/**
 * Enables a button.
 * 
 * @param {HTMLElement} buttonRef - The button container.
 */
function enableButton(buttonRef){
  buttonRef.classList.add('dark-button');
  buttonRef.classList.remove('dark-button-signup');
  buttonRef.disabled = false;
}


/**
 * Checks if a value is valid.
 * 
 * @param {string} value - The string to check.
 * @returns - A boolean.
 */
function testIfEmailIsValid(value){
  let valid = false;
  let regEx = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    if (regEx.test(value)) {
      valid = true;
    }
  return valid;
}


/**
 * Checks if a value is valid.
 * 
 * @param {string} value - The string to check.
 * @returns - A boolean.
 */
function testIfPhoneNrIsValid(value){
  let valid = false;
  let regEx = /^(?:\+|0)\d+$/
    if (regEx.test(value)) {
      valid = true;
    }
  return valid;
}


/**
 * This function highlights the respective field with an error 
 * message and changes the border to red.
 * 
 * @param {string} borderContainer - The element at which the border turns red
 * @param {string} errorMessage - The error Message
 * @param {string} messageContainer - The element that displays the error message
 */
function addRedBorderAndTextFalseInputAddTask(borderContainer, messageContainer, errorMessage){
  const contentRef = document.getElementById(borderContainer);
  const textRef = document.getElementById(messageContainer);
        contentRef.classList.add('red-border-inputfield');
        textRef.innerText = errorMessage;
        // textRef.style.color = 'red';
}


/**
 * This function removes the error message and removes the red border.
 * 
 * @param {string} borderContainer - The element at which the red border is removed
 * @param {string} messageContainer - The element that displays the error message
 */
function removeRedBorderAndTextFalseInputAddTask(borderContainer, messageContainer){
  const contentRef = document.getElementById(borderContainer);
  const textRef = document.getElementById(messageContainer);
        contentRef.classList.remove('red-border-inputfield');
        textRef.innerHTML = '';
}