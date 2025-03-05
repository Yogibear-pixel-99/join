
MAIN_URL = 'https://join-e2ac8-default-rtdb.europe-west1.firebasedatabase.app/'

function toggleDropdown() {
    let dropdownREF = document.getElementById("dropdown");
    dropdownREF.classList.toggle("d-none");
}


// CONTACTS -----------------------------------
/**
 * Used to open an overlay menu.
 * 
 * @param {string} containerId - This is the selected container menu.
 * @param {string} overlayClass - Adds the specified class to the container to open the menu.
 */
function toggleOverlayMenu(containerId, overlayClass){
    let container = document.getElementById(containerId);
        container.classList.toggle(overlayClass);
}


async function initContacts(){
    await getContactsFromServer();
    renderContacts();
          
}

async function getContactsFromServer() {
    try {
        let response = await fetch (MAIN_URL + 'contacts');
        if (!response.ok)
    } catch (error) {
        
    }
    
}

// CONTACTS --------------------------------------




// USERS --------------------------------------------

// USERS --------------------------------------------




// TASKS --------------------------------------------

// TASKS --------------------------------------------