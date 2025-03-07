

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
          sortAllContactsByFirstLetter();
          renderContactsHeaderLetter();
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
 * Sorts all the fetched contacts from the API and puts them in an array specified by the first letter.
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
 * Renders the first letter to the html content - contacts.
 * 
 */
function renderContactsHeaderLetter(){
    let firstLetterArray = Object.keys(sortedContactsArrayByFirstLetter);
    const contentRef = document.getElementById('contacts-content');
          contentRef.innerHTML = '';
          firstLetterArray.forEach(firstLetterArray => {
            contentRef.innerHTML += firstLetterContainerTemp(firstLetterArray);
          })
}


/**
 * Iterate through the contact list and render every single contact to the contact list to the html site contacts.
 * 
 * @param {string} firstLetterArray - The first letter to select the right array to render the names. 
 * @returns - Returns the whole contats sorted by specified letter.
 */
function getSingleContact(firstLetterArray){
    let content = '';
    sortedContactsArrayByFirstLetter[firstLetterArray].forEach(nameRow => {
                content += getSingleContactTemp(nameRow);
    })
    return content;
}


// function openContactInFloatinMenu(position){
//     const contentRef = document.getElementById('bottom-board');
//           contentRef.innerHTML = getContactFloatingContentTemp(position);
// }

// CONTACTS --------------------------------------