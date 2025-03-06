



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
            status: 'awaitfeedback'
        },
        {
            title: 'User Story #1',
            description: 'Als User möchte uch ein einfaches Kanban-Board testen.',
            status: 'done'
        }
    ] 

    renderBoard();
}

function renderBoard() {
    let boardToDo = document.getElementById('boardToDoCard');
    let boardInProgress = document.getElementById('boardInprogressCard');
    let boardAwaitFeedback = document.getElementById('boardAwaitFeedbackCard');
    let boardDone = document.getElementById('boardDoneCard');

    boardToDo.innerHTML = '';
    boardInProgress.innerHTML = '';
    boardAwaitFeedback.innerHTML = '';
    boardDone.innerHTML = '';

    tasks.forEach(task => {

        let taskCard = createTaskCard(task);
        if (task.status === 'todo') {
            boardToDo.innerHTML += taskCard;
        }else if (task.status === 'inprogress') {
            boardInProgress.innerHTML += taskCard;
        } else if (task.status === 'awaitfeedback') {
            boardAwaitFeedback.innerHTML += taskCard;
        } else if (task.status === 'done') {
            boardDone.innerHTML += taskCard;
        }
    });

    if (!boardToDo.innerHTML.trim()) {
        boardToDo.innerHTML = '<div class="no-tasks">No tasks to do</div>';
    }

    if (!boardInProgress.innerHTML.trim()) {
        boardInProgress.innerHTML = '<div class="no-tasks">No tasks in progress</div>';
    }
    if (!boardAwaitFeedback.innerHTML.trim()) {
        boardAwaitFeedback.innerHTML = '<div class="no-tasks">No tasks awaiting feedback</div>';
    }
    if (!boardDone.innerHTML.trim()) {
        boardDone.innerHTML = '<div class="no-tasks">No tasks done</div>';
    }
}

function createTaskCard(task) {
    return `
         <div class="no-tasks">
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>1/2 Subtasks</p>
      <!-- Beispiel: Avatare oder Initialen -->
      <div class="assigned-images">
        <img src="" alt="Avatar 1" />
        <img src="" alt="Avatar 2" />
      </div>
    </div>
    `;
}