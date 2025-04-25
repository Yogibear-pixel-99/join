/**
 * Fetches data from the firebase api to the specified array and gets the api key for every entry.
 * 
 * @param {string} SUB_URL - The name of the needed object in firebase.
 * @param {Array} destination - Storage place of the fetched array.
 */
async function getDataFromServer(SUB_URL, destination){
    destination.splice(0, destination.length);
    try {
        let response = await fetch (MAIN_URL + SUB_URL + ".json");
        if (!response.ok){
            throw new Error('no answer from server');
        } else {
            let data = await response.json();
             if (data != null) {filterFetchedDataAndKey(data, destination)};
        }
    } catch (error){
        console.log(error);
    }
}


/**
 * Post the payload to the firebase api.
 * 
 * @param {string} SUB_URL - The destination url for the database to patch the payload.
 * @param {object} payload - The created data object to post.
 */
async function postDataToApi(SUB_URL, payload){
  try {
    const response = await fetch(MAIN_URL + SUB_URL + ".json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok){
      throw new Error(`Fehler beim übertragen! - ${response.status}`);
    }
  } catch (error){
    console.error("Error:", error.message);
  }
}


/**
 * Patch the payload to the firebase api.
 * 
 * @param {object} payload - The created data object to patch.
 * @param {string} SUB_URL - The destination url for the database to patch the payload.
 */
async function patchDataToApi(SUB_URL, payload){

    if (SUB_URL != undefined){
      try {
        let response = await fetch(MAIN_URL + SUB_URL + ".json",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (!response.ok){
          throw new Error("Contact not found in Database!");
        }
      } catch (error){
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
  for (let dataIndex = 0; dataIndex < filteredArray.length; dataIndex++){
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
async function deleteDataFromApi(SUB_URL, destinationApiKey){
  if (destinationApiKey != "" || destinationApiKey != undefined){
    try {
      await fetch(MAIN_URL + SUB_URL + destinationApiKey + ".json", {
        method: "DELETE",
      });
    } catch (error){
      console.log(error);
    }
  } else {
    console.log("contactKey is empty!");
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
 * Create the initials from the full name element and add them to the object.
 * 
 * @param {string} fullName - The full name of the needed initials.
 * @returns - Returns the first letter of every word.
 */
function returnInitials(fullName){
  if (fullName){
    const normalizedName = fullName.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const regExp = /\b\p{L}/gu;
    const initialsArray = normalizedName.match(regExp);
    return initialsArray.join("");
  } else {
    return '';
  }
}


/**
 * Replaces all other strings than letters from the specified input container.
 * 
 * @param {HTMLElement} field - The HTML container to check.
 */
function justLetters(field) {
  let data = field.value.replace(/[^a-zA-Z\s]/g, '');
      field.value = data;
}


/**
 * Stopps event bubbling.
 * 
 * @param {Object} event - The standard event.
 */
function noClose(event){
    event.stopPropagation();
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
 * Resets the form.
 * 
 * @param {string} formId - The id from the form container.
 */
function resetForm(formId){
  const ref = document.getElementById(formId);
  ref.reset();
  clearAssignedTo();
  removeRedBorderAddTask();
}


/**
 * Toggles a class to a html container.
 * 
 * @param {string} id - The name of the html container.
 * @param {string} className - The name of the class to toggle.
 */
function toggleClassToContainer(id, className){
  let ref = document.getElementById(id);
      ref.classList.toggle(className);
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
 * Removes the "dragging" class after the drag operation ends.
 * 
 * @param {DragEvent} event - The dragend event.
 */
function dragend(event){
  event.target.classList.remove("dragging");
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
 * Disables a button.
 * 
 * @param {HTMLElement} buttonRef - The button container.
 */
function disableButton(buttonRef){
  buttonRef.classList.remove('dark-button');
  buttonRef.classList.add('dark-button-signup');
  buttonRef.disabled = true;
}


/**
 * Adds display none class to a specified container.
 * 
 * @param {string} containerId - The container id.
 */
function addDisplayNone(containerId){
  let ref = document.getElementById(containerId);
      ref.classList.add('d-none');
}


/**
 * Removes a display none class to a specified container.
 * 
 * @param {string} containerId - The container id.
 */
function removeDisplayNone(containerId){
  let ref = document.getElementById(containerId);
      ref.classList.remove('d-none');
}


/**
 * Removes the value of a specified input container.
 * 
 * @param {string} containerId - The container id.
 */
function resetValueFromInputField(id){
  let ref = document.getElementById(id);
      ref.value = '';
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
  let regEx = /^\+?\d+$/;
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


/**
 * Removes all white spaces from an input field.
 * 
 * @param {HTMLElement} element - The specified HTML container.
 */
function removeWhiteSpacesOnInput(element){
  element.value = element.value.replace(/\s/g, '');
}