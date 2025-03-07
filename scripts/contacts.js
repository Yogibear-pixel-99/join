

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
    console.log(allContactsFromApi);
}

function sortAllContactsByFirstLetter(){
    sortedContactsArrayByFirstLetter = allContactsFromApi.reduce((newArray, element) => {
        const firstLetter = element.name.slice(0, 1);
            return {...newArray,
                [firstLetter] : [...(newArray[firstLetter] || []), element]
            };
        },
            {});
}



function renderContactsHeaderLetter(){
    let firstLetterArray = Object.keys(sortedContactsArrayByFirstLetter);
    const contentRef = document.getElementById('contacts-content');
          contentRef.innerHTML = '';
          firstLetterArray.forEach(element => {
            contentRef.innerHTML += firstLetterContainerTemp(element);
          })
}


function getSingleContact(element){
    let content = '';
    sortedContactsArrayByFirstLetter[element].forEach(nameRow => {
                content += getSingleContactTemp(nameRow);
    })
    return content;
}


function openContactInFloatinMenu(position){
    const contentRef = document.getElementById('bottom-board');
          contentRef.innerHTML = getContactFloatingContentTemp(position);
}

// CONTACTS --------------------------------------