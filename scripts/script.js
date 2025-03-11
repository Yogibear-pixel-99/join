

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
    await getDataFromServer('users', usersFromApi);
    await getDataFromServer('tasks', tasksFromApi);
    renderBoard();
}



function renderBoard() {
    let todo = document.getElementById('boardToDoCard');
    let prog = document.getElementById('boardInprogressCard');
    let feed = document.getElementById('boardAwaitFeedbackCard');
    let done = document.getElementById('boardDoneCard');

    clearBoardColums(todo, prog, feed, done);
    fillBaordColums(tasksFromApi,todo, prog, feed, done);
    checkEmptyColums(todo, prog, feed, done);
}

function clearBoardColums(todo, prog, feed, done) {
    todo.innerHTML = '';
    prog.innerHTML = '';
    feed.innerHTML = '';
    done.innerHTML = '';
}

function fillBaordColums(tasks, todo, prog, feed, done) {
    tasks.forEach(task => {
        let cardHtml = createTaskCard(task);
        if (task.status === 'toDo') todo.innerHTML += cardHtml;
        if (task.status === 'inProgress') prog.innerHTML += cardHtml;
        if (task.status === 'awaitFeedback') feed.innerHTML += cardHtml;
        if (task.status === 'done') done.innerHTML += cardHtml;
    })
}

function checkEmptyColums(todo, prog, feed, done) {
    if(!todo.innerHTML.trim()) {
        todo.innerHTML = `<div class="no-tasks">no-task in progress</div>`;
    }
    if(!prog.innerHTML.trim()) {
        prog.innerHTML = `<div class="no-tasks">no-task in progress</div>`;
    }
    if(!feed.innerHTML.trim()) {
        feed.innerHTML = `<div class="no-tasks">no-task in progress</div>`;
    }
    if(!done.innerHTML.trim()) {
        done.innerHTML = `<div class="no-tasks">no-task in progress</div>`;
    }
}

function getInitialsForName(fullName) {
    if (!fullName) return '';
    let parts = fullName.trim().split(' ');
    if (parts.length < 2) {
        return fullName.charAt(0).toUpperCase();
    }
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[1].charAt(0).toUpperCase()
    );
}


function renderAssignedUsers(task) {
    if (!task.assignTo || !task.assignTo.length) {
      return '';
    }
  
    return task.assignTo.map(email => {
      let user = usersFromApi.find(u => u.email === email);
  
      if (user) {
        let initials = getInitialsForName(user.name);
        return `<div class="contact-list-initals">${initials}</div>`;
      } else {
        return `<div class="contact-list-initals">??</div>`;
      }
    }).join('');
  }
  
    

   

  function createTaskCard(task) {
    let assignedHTML = renderAssignedUsers(task);
  
    return `
      <div class="task-card">
      <div>
      <div class="task-type">${task.task}</div>
      </div>
        
        <div>
        <div class="task-title">${task.title}</div>
        <div class="task-description">${task.description}</div>
        </div>
        
        <div class="task-meta">
          <span class="task-date">Due: ${task.date}</span>
        </div>
        <div class="task-assigned-users">
          ${assignedHTML}
          <span class="task-priority">Priority: ${task.priority}</span>
        </div>
      </div>
    `;
  }
  