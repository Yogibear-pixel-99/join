/**
 * Fetches data from the firebase api to the specified array and gets the api key for every entry.
 *
 * @param {string} SUB_URL - The name of the needed object in firebase.
 * @param {Array} destination - Storage place of the fetched array.
 */
async function getDataFromServer(SUB_URL, destination) {
  destination.splice(0, destination.length);
  try {
    let response = await fetch(MAIN_URL + SUB_URL + ".json");
    if (!response.ok) {
      throw new Error("no answer from server");
    } else {
      let data = await response.json();
      if (data != null) {
        filterFetchedDataAndKey(data, destination);
      }
    }
  } catch (error) {
    console.log(error);
  }
}


/**
 * Post the payload to the firebase api.
 *
 * @param {string} SUB_URL - The destination url for the database to patch the payload.
 * @param {object} payload - The created data object to post.
 */
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
async function patchDataToApi(SUB_URL, payload) {
  if (SUB_URL != undefined) {
    try {
      let response = await fetch(MAIN_URL + SUB_URL + ".json", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Contact not found in Database!");
      }
    } catch (error) {
      console.log(error);
    }
  }
}


/**
 * Removes all white spaces from an input field.
 *
 * @param {HTMLElement} element - The specified HTML container.
 */
function removeWhiteSpacesOnInput(element) {
  element.value = element.value.replace(/\s/g, "");
}


/**
 * Disables a button.
 *
 * @param {HTMLElement} buttonRef - The button container.
 */
function disableButton(buttonRef) {
  buttonRef.classList.remove("dark-button");
  buttonRef.classList.add("dark-button-signup");
  buttonRef.disabled = true;
}


/**
 * Adds display none class to a specified container.
 *
 * @param {string} containerId - The container id.
 */
function addDisplayNone(containerId) {
  let ref = document.getElementById(containerId);
  ref.classList.add("d-none");
}


/**
 * Removes a display none class to a specified container.
 *
 * @param {string} containerId - The container id.
 */
function removeDisplayNone(containerId) {
  let ref = document.getElementById(containerId);
  ref.classList.remove("d-none");
}


/**
 * Removes the value of a specified input container.
 *
 * @param {string} containerId - The container id.
 */
function resetValueFromInputField(id) {
  let ref = document.getElementById(id);
  ref.value = "";
}


/**
 * Resets a specified form element.
 *
 * @param {string} id - The id of the form element.
 */
function resetForm(id) {
  const ref = document.getElementById(id);
  ref.reset();
}


/**
 * Toggles a class to a html element.
 *
 * @param {string} id - The name of the html container.
 * @param {string} className - The name of the class to toggle.
 */
function toggleClassToContainer(id, className) {
  let ref = document.getElementById(id);
  ref.classList.toggle(className);
}


/**
 * Removes the "dragging" class after the drag operation ends.
 *
 * @param {DragEvent} event - The dragend event.
 */
function dragend(event) {
  event.target.classList.remove("dragging");
}


/**
 * Stopps event bubbling.
 *
 * @param {Object} event - The standard event.
 */
function noClose(event) {
  event.stopPropagation();
}


/**
 * Create the initials from the full name element and add them to the object.
 *
 * @param {string} fullName - The full name of the needed initials.
 * @returns - Returns the first letter of every word.
 */
function returnInitials(fullName) {
  if (fullName) {
    const normalizedName = fullName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
    const regExp = /\b\p{L}/gu;
    const initialsArray = normalizedName.match(regExp);
    return initialsArray.join("");
  } else {
    return "";
  }
}


/**
 *
 * @param {string} SUB_URL - The header in the database.
 * @param {string} destinationApiKey - The keyvalue to delete the data in the database.
 */
async function deleteDataFromApi(SUB_URL, destinationApiKey) {
  if (destinationApiKey != "" || destinationApiKey != undefined) {
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