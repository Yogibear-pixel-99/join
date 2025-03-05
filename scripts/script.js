
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



function toggleAddTaskOverlay() {
    let addtaskREF = document.getElementById("addtask-overlay");
    addtaskREF.classList.toggle("d-none")
}


function noClose(event) {
    event.stopPropagation();
  }

  
async function initContacts(){
    await getContactsFromServer();
    // renderContacts();
          
}

async function getContactsFromServer() {
    try {
        let response = await fetch (MAIN_URL);
        if (!response.ok) {
            throw new Error('no answere from server');
        } else {
            let data = response.json();
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
    
}

// CONTACTS --------------------------------------




// USERS --------------------------------------------

// USERS --------------------------------------------




// TASKS --------------------------------------------

// TASKS --------------------------------------------




// 

let task = [
    {
        title: 'User Story #1',
        description: 'Als User möchte uch ein einfaches Kanban-Board testen.',
        status: 'inprogress'
    }
];

function initBoard() {
    renderBoard();
}

function renderBoard() {
    let boardInProgress = document.getElementById('inprogress-card');
    boardInProgress.innerHTML = '';
    task.forEach(task => {
        if (task.status === 'inprogress') {
            let taskHTML = ` <div class="inprogress-card-content">
                <div>
                  <h3>${task.title}</h3>
                </div>
                <div>
                  <p>${task.description}</p>
                </div>
                <div>
                  <p>1/2 Subtask</p>
                </div>
                <div>
                  <img src="" alt="">
                  <img src="" alt="">
                </div>`;
            boardInProgress.innerHTML += taskHTML;
        }
    });
}

