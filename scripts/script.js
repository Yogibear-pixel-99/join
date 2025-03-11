

MAIN_URL = "https://join-e2ac8-default-rtdb.europe-west1.firebasedatabase.app/";

// GLOBAL ARRAYS ---------------------------------------
let contactsFromApi = [];
let tasksFromApi = [];
let usersFromApi = [];
// GLOBAL ARRAYS ---------------------------------------


/**
 * Fetches data from Firebase to specified arrays.
 * 
 * @param {string} objName - The name of the needed object in firebase.
 * @param {array} destination - Storage place of the fetched array.
 */
async function getDataFromServer(objName, destination) {
    try {
        let response = await fetch (MAIN_URL + objName + ".json");
        if (!response.ok) {
            throw new Error('no answere from server');
        } else {
            let data = await response.json();
            destination.splice(0, 0, ...data);
        }
    } catch (error) {
        console.log(error);
    }
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
        initials = initials.replace(/[a-z]/g, '');
        console.log(initials);
    return initials;
}

/**
 * Iterate through the whole object and calls a function to create the initials.
 * 
 */
function createInitialsForEachName(){
    contactsFromApi.forEach(element => {
        element['initials'] = getInitialsForObject(element);
    })
}
// GLOBALE FUNKTION



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



function initBoard() {
 loadAndRenderTasks();
}

async function loadAndRenderTasks() {
    await getDataFromServer('tasks', tasksFromApi);
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