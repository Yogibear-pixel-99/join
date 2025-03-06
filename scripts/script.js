



function toggleDropdown() {
    let dropdownREF = document.getElementById("dropdown");
    dropdownREF.classList.toggle("d-none");
}




function toggleAddTaskOverlay() {
    let addtaskREF = document.getElementById("addtask-overlay");
    addtaskREF.classList.toggle("d-none")
}


function noClose(event) {
    event.stopPropagation();
}






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

let tasks = [];

function initBoard() {
    renderBoard();

    tasks = [
        {
            title: 'User Story #1',
            description: 'Als User möchte uch ein einfaches Kanban-Board testen.',
            status: 'inprogress'
        },
        {
            title: 'User Story #1',
            description: 'Als User möchte uch ein einfaches Kanban-Board testen.',
            status: 'inprogress'
        },
        {
            title: 'User Story #1',
            description: 'Als User möchte uch ein einfaches Kanban-Board testen.',
            status: 'inprogress'
        },
        {
            title: 'User Story #1',
            description: 'Als User möchte uch ein einfaches Kanban-Board testen.',
            status: 'inprogress'
        }
    ] 
}

function renderBoard() {
    let boardInProgress = document.getElementById('inprogress-card');
    boardInProgress.innerHTML = '';
    tasks.forEach(task=> {
        if (tasks.status === 'inprogress') {
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

