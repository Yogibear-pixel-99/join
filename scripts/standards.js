


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
      console.log(response);
      if (!response.ok) {
        throw new Error("error loading users");
      } else {
        let data = await response.json();
        console.log(data);
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