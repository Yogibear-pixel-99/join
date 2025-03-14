


let sortedContactsArrayByFirstLetter = [];

/**
 * Opens the overlay to add a contact, disable the background buttons and darkens the background.
 * 
 */
function toggleAddContactsOverlay(){
    const overlay = document.getElementById('add-contact-overlay');
    const mask = document.getElementById('mask-container');
    const mainContent = document.getElementById('main-container');
        overlay.classList.toggle('add-contact-overlay-hide');
        overlay.classList.toggle('add-contact-overlay-open');
        mask.classList.toggle('d-none');
        mainContent.classList.toggle('disable-pointer-events');
}


/**
 * Get contacts from API firebase, create initials from first- and lastname, sort contacts by first letter and render the contacst header letter to HTML.
 * 
 */
async function sortAndRenderContacts(){
    await getDataFromServer('contacts', contactsFromApi);
    createInitialsForEachName();  
    sortAllContactsByFirstLetter();
    renderContactsHeaderLetter();
}


/**
 * Get all the fetched contacts from the API and puts them in an array specified by the first letter.
 * 
 */
function sortAllContactsByFirstLetter(){
    sortedContactsArrayByFirstLetter = contactsFromApi.reduce((newArray, element) => {
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
    const contact = contactsFromApi.find(element => element.id === contactId); 
          contentRef.innerHTML = getSingleContactForFloatingMenuTemp(contact, colorLetter);
        animateContactMenu();
}

/**
 * Animate the contact details to slide from the right outside under the contacts header.
 * 
 */
function animateContactMenu(){
 const menuRef = document.getElementById('bottom-board');
          requestAnimationFrame(() => {
            menuRef.classList.add('floating-contact-container-open');
          });
}

// contact function




async function createNewContact(event){
    event.preventDefault();
    await getNewContactTemp();
    collectFormInformation('new-contact-form');
    // check if user exists - no: go further - yes = call error border and text!
    // fill template with formData
    // add id to template
    // push to API
    // get info button "contact successfully added"
    // get alle Contacts
    // highlight new contact in contacts list
    // open new contact in float menu
}


async function getNewContactTemp(){
    collectedFormInfos =     {
        "id": `${await getMaxlengthOfEntriesFromApi('contacts') + 1}`,
        "name": "",
        "email": "",
        "phone": ""
      }
}


async function getMaxlengthOfEntriesFromApi(objName){
    try {
        let response = await fetch(MAIN_URL + objName + '.json');
        if (!response.ok) {
            throw new Error('Now answer from server!')
        }
        let data = await response.json();
        console.log(data.length);
        return data.length;
    } catch (error) {
        console.log(error);
    }
}

// TEXT INPUT FIELD DESIGN!!
// change post function that the response calls the message.