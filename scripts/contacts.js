

MAIN_URL = "https://join-e2ac8-default-rtdb.europe-west1.firebasedatabase.app/";

// GLOBAL ARRAYS ---------------------------------------
let allContactsFromApi = [];
let sortedContactsArrayByFirstLetter = [];
// GLOBAL ARRAYS ---------------------------------------


/**
 * Opens the overlay to add a contact, disable the background buttons and darkens the background.
 * 
 */
function toggleAddContactsOverlay(){
    const overlay = document.getElementById('add-contact-overlay');
    const mask = document.getElementById('mask-container');
    const mainContent = document.getElementById('main-container');
        overlay.classList.toggle('add-contact-overlay-hide');
        mask.classList.toggle('d-none');
        mainContent.classList.toggle('disable-pointer-events');
        mainContent.classList.toggle('brightness-50');
}


async function initContacts(){
    await getContactsFromServer();
          createInitialsForEachName();
          sortAllContactsByFirstLetter();
          renderContactsHeaderLetter();
}



/**
 * Iterate through the whole object and calls a function to create the initials.
 * 
 */
function createInitialsForEachName(){
    allContactsFromApi.forEach(element => {
        element['initials'] = getInitialsForObject(element);
    })
}


/**
 * Create the initials from the full name element and add them to the object.
 * 
 * @param {object} element - The object position of the needed data in the array.
 * @returns - Returns the first letter of the first and last name. The initials.
 */
function getInitialsForObject(element){
    const name = element.name;
    const regExp = /\b\w/g;
    const initialArray = name.match(regExp);
    let initials = '';
        for (let index = 0; index < initialArray.length; index++) {
             initials += `${initialArray[index]}`;
        }
    return initials;
}


/**
 * Fetches all contact from the specified API (Firebase).
 * 
 */
async function getContactsFromServer() {
    try {
        let response = await fetch (MAIN_URL + "contacts" + ".json");
        if (!response.ok) {
            throw new Error('no answere from server');
        } else {
            let data = await response.json();
            allContactsFromApi = data;
        }
    } catch (error) {
        console.log(error);
    }
}


/**
 * Get all the fetched contacts from the API and puts them in an array specified by the first letter.
 * 
 */
function sortAllContactsByFirstLetter(){
    sortedContactsArrayByFirstLetter = allContactsFromApi.reduce((newArray, element) => {
        const firstLetter = element.name.slice(0, 1);
            return {...newArray,
                [firstLetter] : [...(newArray[firstLetter] || []), element]
            };
        },
            {});
}


/**
 * Get the keys from an array, sort and render the first letter to the html content - contacts.
 * 
 */
function renderContactsHeaderLetter(){
    let firstLetterArray = Object.keys(sortedContactsArrayByFirstLetter);
        firstLetterArray.sort();
    const contentRef = document.getElementById('contacts-content');
          contentRef.innerHTML = '';
          firstLetterArray.forEach(firstLetterArray => {
            contentRef.innerHTML += firstLetterContainerTemp(firstLetterArray);
          })
}


/**
 * Iterate through the contact list and render every single contact to the contact list to the html site contacts.
 * 
 * @param {string} firstLetterArray - The first letter to select the right array to render the names and set the background color to the initials.
 * @returns - Returns the whole contats sorted by specified letter.
 */
function getSingleContact(firstLetterArray){
    let content = '';
    sortedContactsArrayByFirstLetter[firstLetterArray].forEach(nameRow => {
                content += getSingleContactTemp(nameRow, firstLetterArray);
    })
    return content;
}


/**
 * Render the selected contact name in the floating contacts menu.
 * 
 * @param {string} contactId - The exact id in the users name object to get the informations.
 * @param {string} colorLetter - Headerletter to set the backgroundcolor css class to initials.
 */
function openContactInFloatMenu(contactId, colorLetter){
    const contentRef = document.getElementById('bottom-board');
    const contact = allContactsFromApi.find(element => element.id === contactId); 
          contentRef.innerHTML = getSingleContactForFloatingMenuTemp(contact, colorLetter);         
}
