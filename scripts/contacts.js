/**
 * Get contacts from API firebase, create initials from first- and lastname, sort contacts by first letter and render the contacst header letter to HTML.
 *
 */
async function sortAndRenderContacts(){

  window.innerWidth <= 1024 ? removeDisplayNone('loading-spinner-mobile') : removeDisplayNone('loading-spinner');
  await getDataFromServer("contacts", contactsFromApi);
  await getDataFromServer("users", usersFromApi);
  sortAllContactsByFirstLetter();
  renderContactsHeaderLetter();
  setInitialsToHeader();
  addDisplayNone('loading-spinner');
  addDisplayNone('loading-spinner-mobile');
}


/**
 * Get all the fetched contacts from the API and puts them in an array specified by the first letter.
 *
 */
function sortAllContactsByFirstLetter(){
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
function renderContactsHeaderLetter(){
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
function getSingleContact(firstLetterArray){
  let content = "";
  sortedContactsArrayByFirstLetter[firstLetterArray].forEach((nameRow) => {
    content += getSingleContactTemp(nameRow, firstLetterArray);
  });
  return content;
}


/**
 * Render the selected contact name in the floating contacts menu and select the contact in the list.
 *
 * @param {string} contactId - The exact id in the users name object to get the informations.
 * @param {string} colorLetter - Headerletter to set the backgroundcolor css class to initials.
 */
function openContactInFloatMenu(contactId, colorLetter){
  const contentRef = document.getElementById("bottom-board");
  const contact = contactsFromApi.find((element) => element.id === contactId);
  contentRef.innerHTML = getSingleContactForFloatingMenuTemp(
    contact,
    colorLetter
  );
    getMobileEditDeleteMenu(contact);
    switchFloatingContactAndContactsInMobile();
    animateContactMenu();
    addBackgroundToSelectedContact(contactId);
}


/**
 * Get the information for the edit and delete contact function in the mini menu.
 * 
 * @param {Object} contact - The contact object.
 */
function getMobileEditDeleteMenu(contact){
  let contentRef = document.getElementById('floating-edit-delete-wrapper-mobile');
        contentRef.innerHTML = getEditDeleteMobileMenuTemp(contact);
}


/**
 * Auto changes the appearence of the contacts menu on screen sizes smaller than 1024px;
 */
window.onresize = function(){
if (window.innerWidth >= 1025){
  switchFloatingContactAndContactsInMobile();
}}


/**
 * Changes the container visability in mobile mode. All contact list and open single contact in the float menu.
 */
async function switchFloatingContactAndContactsInMobile(){
  const allContactsRef = document.getElementById('contacts-container-wrapper');
  const contactsFloatRef = document.getElementById('floating-contact-container');
  const floatComputedStyle = window.getComputedStyle(contactsFloatRef);
  switch (floatComputedStyle.display){
    case 'none':  contactsFloatRef.classList.add('d-block');
                  allContactsRef.classList.add('d-none');
      break;
    case 'block': contactsFloatRef.classList.remove('d-block');
                  allContactsRef.classList.remove('d-none');
      break;
  }
  showAddContactButtonInMobile();
}


/**
 * Shows or hides the add contact button in the mobile menu.
 */
function showAddContactButtonInMobile(){
  let contactsRef = document.getElementById('contacts-container-wrapper');
  let buttonRef = document.getElementById('add-contact-button-mobile');
      if (contactsRef.classList.contains('d-none')){
        buttonRef.classList.add('d-none')
      } else {
        buttonRef.classList.remove('d-none');
      }
}


/**
 * Animate the contact details to slide from the right outside under the contacts header.
 *
 */
function animateContactMenu(){
  const menuRef = document.getElementById("bottom-board");
  requestAnimationFrame(() => {
    menuRef.classList.add("floating-contact-container-open");
  });
}


/**
 * Check if the contact already exists in the database. Shows a red border and a text message if yes.
 * Calls a fetch to api function and show created contact function.
 *
 * @param {object} event - Default object to prevent the form to refresh the page.
 */
async function createNewContact(event){
  event.preventDefault();
  if (checkContactFormValidation('user-email-input', 'phone-input', 'add-contact-error')) {
  await getNewContactTemp();
  collectFormInformation("new-contact-form");
  if (await checkIfDataAlreadyExists("user-email-input", "contacts")){
    addRedBorderAndTextFalseInput("user-email-input", "add-contact-error", "Contact/Email already exists!");
  } else {
    await postContactToApiAndShowInMenu();
    removeAndSetInititalsBackgroundColorClass('', 'edit-contact-overlay-initials-wrapper');
  }
}}


/**
 * Collect all input fields and sets no value to the fields.
 * 
 * @param {string} id - The id of the form container.
 */
function emptyFormInputFields(id){
  let ref = document.getElementById(id);
  let inputs = ref.querySelectorAll('input');
      inputs.forEach((element) => {
        element.value = ''});
}


/**
 * Checks the validation of the add/edit contact form
 * 
 * @param {string} formEmailId - The id of the form container
 * @param {string} formPhoneId - The id of the form container
 * @returns - Returns a boolean.
 */
function checkContactFormValidation(formEmailId, formPhoneId, errorId){
  let emailRef = document.getElementById(formEmailId);
  let phoneRef = document.getElementById(formPhoneId);
  removeRedBorderAndTextFalseInput(formPhoneId, errorId, 'Not valid phone number');
  removeRedBorderAndTextFalseInput(formEmailId, errorId, 'Not a valid email address');
      if (!testIfPhoneNrIsValid(phoneRef.value.trim())) {
        addRedBorderAndTextFalseInput(formPhoneId, errorId, 'Not valid phone number');
        return false;
      }
      if (!testIfEmailIsValid(emailRef.value.trim())){
        addRedBorderAndTextFalseInput(formEmailId, errorId, 'Not a valid email address');
        return false;
      } 
  return true;
}


/**
 * Removes die initals from the add contact form and sets the button to disable.
 */
function resetAddContactForm(){
  let buttonRef = document.getElementById('create-contact-button');
  disableButton(buttonRef);
  resetForm('new-contact-form');
  // emptyFormInputFields('new-contact-form');
  removeAndSetInititalsBackgroundColorClass('add-contact-overlay-initials-wrapper', '');
    }


/**
 * Checks if all contacts field are filled and enables/disables the create contact button.
 */
function checkAddContactValidation(){
  let nameRef = document.getElementById('add-contact-input-field').value.trim();
  let mailRef = document.getElementById('user-email-input').value.trim();
  let phoneRef = document.getElementById('phone-input').value.trim();
  let buttonRef = document.getElementById('create-contact-button');
  if (nameRef != '' && mailRef != '' && phoneRef != '') {
    enableButton(buttonRef);
  } else {
    disableButton(buttonRef);
  }
};


/**
 * Post the new contact to the api, show it in teh float menu, select and scroll to it in the contact list.
 */
async function postContactToApiAndShowInMenu(){
  await postDataToApi("contacts", collectedFormInfos);
  closeOverlayMenu("add-contact-overlay", "add-contact-mask-container");
  await sortAndRenderContacts();
  scrollToNewContact(`contact-${collectedFormInfos.id}`);
  openContactInFloatMenu(`${collectedFormInfos.id}`, `${collectedFormInfos.name.slice(0, 1).toUpperCase()}`);
  toggleAddedButton('contact-created-button', 'contact-created-button-show', 'd-none');
  document.getElementById("new-contact-form").reset();
}


/**
 * Fills the empty object collectedFormInfos with am template and the next id number from the database.
 */
async function getNewContactTemp(){
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
function addBackgroundToSelectedContact(containerId){
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
function showContactAddedSuccessButton(){
  const ref = document.getElementById("contact-created-button");
  setTimeout(() => ref.classList.add("contact-created-button-show"), 400);
  setTimeout(() => ref.classList.remove("contact-created-button-show"), 2000);
}


/**
 * Scrolls to the selected contact.
 * 
 * @param {string} contactId - The id of the selected contact.
 */
function scrollToNewContact(contactId){
  document
    .getElementById(contactId)
    .scrollIntoView({ behavior: "smooth", block: "end" });
}


/**
 * Opens the edit menu and fills it with information about the clicked user.
 * 
 * @param {string} contactId - The id of the contact to edit.
 */
function openEditContact(contactKey){
  getInfosForEditMenu(contactKey);
  setOnclickEditAndDeleteToButtons(contactKey);
  openOverlayMenu("edit-contact-overlay", "edit-contact-mask-container");
  setInitialsToNewContactContainer('edit-user-name-input', 'edit-contact-overlay-initials-wrapper');
}


/**
 * Collects all needed information to edit the contact.
 * 
 * @param {string} contactId - The id of the contact to edit.
 */
function getInfosForEditMenu(contactKey){
  const contact = contactsFromApi.find((element) => element.apiKey === contactKey);
  document.getElementById("edit-user-name-input").value = contact.name;
  document.getElementById("edit-user-email-input").value = contact.email;
  document.getElementById("edit-user-phone-input").value = contact.phone;
}


/**
 * Set the onclick functions to the buttons with specified parameters.
 * 
 * @param {string} contactKey - The key of the contact parameter.
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
 * Checks if the needed form fields are filled and enables/disables the save button.
 */
function toggleSaveEditedContactButton(){
  let nameRef = document.getElementById('edit-user-name-input').value;
  let emailRef = document.getElementById('edit-user-email-input').value;
  let buttonRef = document.getElementById('save-contact-button');
    if (emailRef != '' && nameRef != '') {
      enableButton(buttonRef);
    } else {
      disableButton(buttonRef);
    }
}


/**
 * Save the edited contact and animate the menu.
 * 
 * @param {*} event - For prevent the default function from the button.
 * @param {string} contactId - The id of the contact to save.
 */
async function saveEditedContact(event, contactKey){
  event.preventDefault();
  if (checkContactFormValidation('edit-user-email-input', 'edit-user-phone-input', 'edit-contact-error')){
  getContactInfosToFetch();
  await patchDataToApi(`contacts/${contactKey}`, collectedFormInfos);
  await sortAndRenderContacts();
  let editedContact = contactsFromApi.find(
    (element) => element.apiKey === contactKey
  );
  closeOverlayMenu("edit-contact-overlay", "edit-contact-mask-container");
  scrollToNewContact(`contact-${editedContact.id}`);
  openContactInFloatMenu(editedContact.id, editedContact.name.charAt(0).toUpperCase());
}}


/**
 * Collect infos from form edit user.
 */
function getContactInfosToFetch(){
  collectedFormInfos = {
    name: document.getElementById("edit-user-name-input").value.trim(),
    email: document.getElementById("edit-user-email-input").value.trim(),
    phone: document.getElementById("edit-user-phone-input").value.trim(),
  };
}


/**
 * Delete the selected contact from the database and render new.
 * 
 * @param {string} contactId - The id of the selected contact.
 */
async function deleteContact(contactKey){
  await deleteDataFromApi("contacts/", contactKey);
  await sortAndRenderContacts();
  if (
    !document
      .getElementById("edit-contact-overlay")
      .classList.contains("standard-overlay-hide")
  ){
    closeOverlayMenu("edit-contact-overlay", "edit-contact-mask-container");
  }
  emptyFloatMenu();
}


/**
 * Toggles the visability of the edit/delete mini menu in the mobile version.
 */
function toggleEditDeleteContactMenuMobile(){
  const menuRef = document.getElementById('floating-edit-delete-wrapper-mobile');
  const maskRef = document.getElementById('floating-contact-mobile-mask');
  const mainRef = document.getElementById('main-container');
  
  if (menuRef.classList.contains('d-none')) {
      menuRef.classList.remove('d-none');
      setTimeout(() => {toggleClasses(menuRef, maskRef, mainRef), 100})
  } else {
    toggleClasses(menuRef, maskRef, mainRef);
    setTimeout(() => {menuRef.classList.add('d-none')}, 300)
  }
}


/**
 * Toggles classes to toggle the edit/delete menu in floatin contacts menu.
 * 
 * @param {HTMLElement} menuRef - The menu element.
 * @param {HTMLElement} maskRef - The mask element.
 * @param {HTMLElement} mainRef - The main element.
 */
function toggleClasses(menuRef, maskRef, mainRef){
  menuRef.classList.toggle('show-floating-edit-delete-wrapper-mobile');
  maskRef.classList.toggle('d-none');
  mainRef.classList.toggle('disable-pointer-events');
}


/**
 * Switches to the all contacts container in the mobile version.
 */
function switchToAllContactsMobile(){
  switchFloatingContactAndContactsInMobile();
}


/**
 * Set new initials to the container if the name is changing.
 * 
 * @param {string} inputId - The name value from the input field.
 * @param {string} destinationId - The id of the destination container where the initials are displayed.
 */
function setInitialsToNewContactContainer(inputId, destinationId){
  let input = document.getElementById(inputId);
  let initials = returnInitials(input.value.trim());
  let destinationRef = document.getElementById(destinationId);
  destinationRef.innerText = initials.slice(0, 2);
  removeAndSetInititalsBackgroundColorClass(destinationId, initials);
  destinationRef.classList.add(`initials-bg-color-${initials.charAt(0).toUpperCase()}`);
}


/**
 * Removes the old background color class from the container and sets an empty placeholder icon.
 * 
 * @param {string} initials - The initails form the input name value.
 * @param {HTMLElement} destinationRef - The destination container for the icon.
 */
function removeAndSetInititalsBackgroundColorClass(destinationId, initials){
  let contentRef = document.getElementById(destinationId);
  if (initials == ''){
    contentRef.className = '';
    contentRef.classList.add('add-contact-overlay-img-wrapper');
    contentRef.classList.add('flex-ctr-ctr');
    contentRef.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM14 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z" fill="#A8A8A8"/>
                  </svg> `
  }
  }