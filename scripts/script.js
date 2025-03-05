
MAIN_URL = "https://join-e2ac8-default-rtdb.europe-west1.firebasedatabase.app/";

function toggleDropdown() {
    let dropdownREF = document.getElementById("dropdown");
    dropdownREF.classList.toggle("d-none");
}


// CONTACTS -----------------------------------
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

function toggleAddTaskOverlay() {
    let addtaskREF = document.getElementById("addtask-overlay");
    addtaskREF.classList.toggle("d-none")
}


function noClose(event) {
    event.stopPropagation();
}


// async function getContactsFromServer() {
//     try {
//         let response = await fetch (MAIN_URL + "contacts" + ".json");
//         if (!response.ok) {
//             throw new Error('no answere from server');
//         } else {
//             let data = response.json();
//             console.log(data);
//             renderContacts(data);
//         }
//     } catch (error) {
//         console.log(error);
//     }
    
// }

// function renderContacts(data){
//     for (let contactIndex = 0; contactIndex < data.length; contactIndex++) {
//         const initials = data[contactIndex];
//         const name = data[contactIndex].name;
//         const email = data[contactIndex].email;

        
//     }
// }

function openContactInFloatinMenu(position){
    const contentRef = document.getElementById('bottom-board');
          contentRef.innerHTML = getContactFloatingContentTemp(position);
}

// CONTACTS --------------------------------------




// USERS --------------------------------------------

// USERS --------------------------------------------




// TASKS --------------------------------------------

// TASKS --------------------------------------------


function toggleAddedToBoard() {
    let addedToBoardREF = document.getElementById("task-added");
    addedToBoardREF.classList.toggle("d-none");
    loadingToBoard();
}

function loadingToBoard() {
    return setTimeout(() => {
        let addtaskREF = document.getElementById("addtask-overlay");
        let addedToBoardREF = document.getElementById("task-added");
        addedToBoardREF.classList.toggle("d-none");
        addtaskREF.classList.toggle("d-none")
        }, 3000);
      }




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

