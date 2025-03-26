
let sortedContactsArrayByFirstLetter = [];

/**
 * Get contacts from API firebase, create initials from first- and lastname, sort contacts by first letter and render the contacst header letter to HTML.
 *
 */
async function sortAndRenderContacts() {
  await getDataFromServer("contacts", contactsFromApi);
  await getDataFromServer("users", usersFromApi);
  createInitialsForEachName(contactsFromApi);
  sortAllContactsByFirstLetter();
  renderContactsHeaderLetter();
  initialsChange();
}

/**
 * Get all the fetched contacts from the API and puts them in an array specified by the first letter.
 *
 */
function sortAllContactsByFirstLetter() {
  sortedContactsArrayByFirstLetter = contactsFromApi.reduce(
    (newArray, element) => {
      const firstLetter = element.name.slice(0, 1).toUpperCase();

      return {
        ...newArray,
        [firstLetter]: [...(newArray[firstLetter] || []), element],
      };
    },
    {}
  );
}

/**
 * Get the keys from an array, sort and render the first letter to the html content - contacts.
 *
 */
function renderContactsHeaderLetter() {
  let firstLetterArray = Object.keys(sortedContactsArrayByFirstLetter);
  firstLetterArray.sort();
  const contentRef = document.getElementById("contacts-content");
  contentRef.innerHTML = "";
  firstLetterArray.forEach((firstLetterArray) => {
    contentRef.innerHTML += firstLetterContainerTemp(firstLetterArray);
  });
}

/**
 * Iterate through the contact list and render every single contact to the contact list to the html site contacts.
 *
 * @param {string} firstLetterArray - The first letter to select the right array to render the names and set the background color to the initials.
 * @returns - Returns the whole contats sorted by specified letter.
 */
function getSingleContact(firstLetterArray) {
  let content = "";
  sortedContactsArrayByFirstLetter[firstLetterArray].forEach((nameRow) => {
    content += getSingleContactTemp(nameRow, firstLetterArray);
  });
  return content;
}

/**
 * Render the selected contact name in the floating contacts menu.
 *
 * @param {string} contactId - The exact id in the users name object to get the informations.
 * @param {string} colorLetter - Headerletter to set the backgroundcolor css class to initials.
 */
function openContactInFloatMenu(contactId, colorLetter) {
  const contentRef = document.getElementById("bottom-board");
  const contact = contactsFromApi.find((element) => element.id === contactId);
  contentRef.innerHTML = getSingleContactForFloatingMenuTemp(
    contact,
    colorLetter
  );
  animateContactMenu();
  addBackgroundToSelectedContact(contactId);
}

/**
 * Animate the contact details to slide from the right outside under the contacts header.
 *
 */
function animateContactMenu() {
  const menuRef = document.getElementById("bottom-board");
  requestAnimationFrame(() => {
    menuRef.classList.add("floating-contact-container-open");
  });
}

/**
 * Check if the contact already exists in the database. Shows a red border and a text message if yes.
 * Fetches the new contact to the database and shows it in the floating menu.
 *
 * @param {object} event - Default object to prevent the form to refresh the page.
 */
async function createNewContact(event) {
  event.preventDefault();
  await getNewContactTemp();
  collectFormInformation("new-contact-form");
  if (await checkIfDataAlreadyExists("user-email-input", "contacts")) {
    addRedBorderAndTextFalseInput("user-email-input", "input-alert-message", "Contact/Email already exists!");
    setTimeout(() => removeRedBorderAndTextFalseInput("user-email-input", "input-alert-message"), 3000);
  } else {
    await postDataToApi("contacts", collectedFormInfos);
    toggleOverlayMenu("add-contact-overlay", "add-contact-mask-container");
    await sortAndRenderContacts();
    scrollToNewContact(`contact-${collectedFormInfos.id}`);
    openContactInFloatMenu(`${collectedFormInfos.id}`, `${collectedFormInfos.name.slice(0, 1)}`);
    showContactAddedSuccessButton();
    document.getElementById("new-contact-form").reset();
  }
}

/**
 * Fills the empty object collectedFormInfos with am template and the next id number from the database.
 */
async function getNewContactTemp() {
  collectedFormInfos = {
    id: `${await getTheNextFreeIdNumberFromApi("contacts")}`,
    name: "",
    email: "",
    phone: "",
  };
}

/**
 * After fetching the new contact data to the database, highlights the new fetched contact in the contact list.
 *
 * @param {string} containerId - The id off the specified contact in the contact list.
 */
function addBackgroundToSelectedContact(containerId) {
  const otherRef = document.querySelectorAll(".single-contact");
  const ref = document.getElementById(`contact-${containerId}`);
  otherRef.forEach((element) => {
    element.classList.remove("highlight-contact");
  });
  ref.classList.add("highlight-contact");
}

/**
 * Displays a short overlay message in a button, if the contact successfully added to the database.
 */
function showContactAddedSuccessButton() {
  const ref = document.getElementById("contact-created-button");
  setTimeout(() => ref.classList.add("contact-created-button-show"), 400);
  setTimeout(() => ref.classList.remove("contact-created-button-show"), 2000);
}

/**
 * Scrolls to the selected contact.
 * 
 * @param {string} contactId - The id of the selected contact.
 */
function scrollToNewContact(contactId) {
  document
    .getElementById(contactId)
    .scrollIntoView({ behavior: "smooth", block: "end" });
}

/**
 * Opens the edit menu and fills it with information about the clicked user.
 * 
 * @param {string} contactId - The id of the contact to edit.
 */
function openEditContact(contactKey) {
  getInfosForEditMenu(contactKey);
  setOnclickEditAndDeleteToButtons(contactKey);
  toggleOverlayMenu("edit-contact-overlay", "edit-contact-mask-container");
}

/**
 * Collects all needed information to edit the contact.
 * 
 * @param {string} contactId - The id of the contact to edit.
 */
function getInfosForEditMenu(contactKey) {
  const contact = contactsFromApi.find((element) => element.apiKey === contactKey);
  document.getElementById("edit-user-name-input").value = contact.name;
  document.getElementById("edit-user-email-input").value = contact.email;
  document.getElementById("edit-user-phone-input").value = contact.phone;

}

/**
 * Set the onclick functions to the buttons with specified parameters.
 * 
 * @param {string} contactId - The id of the contact parameter.
 */
function setOnclickEditAndDeleteToButtons(contactKey){
    document
    .getElementById("save-contact-button")
    .setAttribute("onclick", `saveEditedContact(event, '${contactKey}')`);
  document
    .getElementById("delete-contact-button")
    .setAttribute("onclick", `deleteContact('${contactKey}')`);
}

/**
 * Save the edited contact and animate the menu.
 * 
 * @param {*} event - For prevent the default function from the button.
 * @param {string} contactId - The id of the contact to save.
 */
async function saveEditedContact(event, contactKey) {
  event.preventDefault();
  getContactInfosToFetch();
  await patchDataToApi(collectedFormInfos, `contacts/${contactKey}`);
  await sortAndRenderContacts();
  let editedContact = contactsFromApi.find(
    (element) => element.apiKey === contactKey
  );
  toggleOverlayMenu("edit-contact-overlay", "edit-contact-mask-container");
  scrollToNewContact(`contact-${editedContact.id}`);
  openContactInFloatMenu(editedContact.id, editedContact.name.charAt(0).toUpperCase());
}

/**
 * Collect infos from form edit user.
 */
function getContactInfosToFetch(){
  collectedFormInfos = {
    name: document.getElementById("edit-user-name-input").value,
    email: document.getElementById("edit-user-email-input").value,
    phone: document.getElementById("edit-user-phone-input").value,
  };
  console.log(collectedFormInfos);
}

/**
 * Delete the selected contact from the database and render new.
 * 
 * @param {string} contactId - The id of the selected contact.
 */
async function deleteContact(contactKey) {
  await deleteDataFromApi(contactKey);
  await sortAndRenderContacts();
  if (
    !document
      .getElementById("edit-contact-overlay")
      .classList.contains("standard-overlay-hide")
  ) {
    toggleOverlayMenu("edit-contact-overlay", "edit-contact-mask-container");
  }
  emptyFloatMenu();
}


/**
 * 
 * @param {string} contactKey - The keyvalue to delete the user in the database.
 */
async function deleteDataFromApi(contactKey) {
  if (contactKey != "") {
    try {
      await fetch(MAIN_URL + "contacts/" + contactKey + ".json", {
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
