

MAIN_URL = "https://join-e2ac8-default-rtdb.europe-west1.firebasedatabase.app/";

// GLOBAL ARRAYS ---------------------------------------
let contactsFromApi = [];
let tasksFromApi = [];
let usersFromApi = [];
let subtasksFromApi = [];
let collectedFormInfos = {};
// GLOBAL ARRAYS ---------------------------------------

/**
 * Get the new information from the input fields and patch them to the database.
 * 
 * @param {object} contactKey - The data to patch.
 * @param {string} contactKey - The keyvalue for the database to patch the payload.
 */
async function putDataToApi(payload, contactKey) {

    if (contactKey != undefined) {
      try {
        let response = await fetch(
          MAIN_URL + contactKey + ".json",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (!response.ok) {
          throw new Error("Contact not found in Database!");
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

/**
 * Fetches data from Firebase to specified arrays and gets the destination key for firebase.
 * 
 * @param {string} objName - The name of the needed object in firebase.
 * @param {array} destination - Storage place of the fetched array.
 */
async function getDataFromServer(objName, destination) {
    destination.splice(0, destination.length);
    try {
        let response = await fetch (MAIN_URL + objName + ".json");
        if (!response.ok) {
            throw new Error('no answer from server');
        } else {
            let data = await response.json();
            data != null ? filterDataAndKey(data, destination) : console.log('No Data to display!')
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Filters the fetched data, delete null positions, puts the database key to the data.
 * 
 * @param {object} data - Fetched data from server.
 */
function filterDataAndKey(data, destination){
  let dataArray = Object.entries(data);
  let filteredArray = dataArray.filter(element => element[1] != null);
  for (let dataIndex = 0; dataIndex < filteredArray.length; dataIndex++) {
      const element = filteredArray[dataIndex];
  destination.push(element[1]);
  destination[dataIndex]["apiKey"] = element[0];
  }
}

/**
 * 
 * @param {string} objPos - The header in the database.
 * @param {string} contactKey - The keyvalue to delete the data in the database.
 */
async function deleteDataFromApi(objPos, apiKey) {
  if (apiKey != "" || apiKey != undefined) {
    try {
      await fetch(MAIN_URL + objPos + apiKey + ".json", {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("contactKey is empty!");
  }
}

/**
 * Close the deleted contact in the float menu.
 */
function emptyFloatMenu() {
  const menuRef = document.getElementById("bottom-board");
  menuRef.classList.remove("floating-contact-container-open");
}

function getKeysToArray(destination, keys){
    for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
        const element = keys[keyIndex][0];
        destination[keyIndex].apiKey = element;
    }
    console.log(destination);
}

/**
 * Create the initials from the full name element and add them to the object.
 * 
 * @param {object} user - The user of the needed data in the array.
 * @returns - Returns the first letter of the first and last name. The initials.
 */

function returnInitials(user){
    const name = user.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const regExp = /\b\p{L}/gu;
    const initialsArray = name.match(regExp);
    return initialsArray.join("");
}

/**
 * Iterate through the whole object and calls a function to create the initials.
 * 
 */
function createInitialsForEachName(destinationArray){
    destinationArray.forEach(element => { 
        element['initials'] = returnInitials(element.name);
    })
}

// GLOBALE FUNKTION
function toggleDropdown() {
    let dropdownREF = document.getElementById("dropdown");
    dropdownREF.classList.toggle("d-none");
}


function toggleAddTaskOverlay() {
    let addtaskREF = document.getElementById("addtask-overlay");
    let maskREF = document.getElementById("mask-container");
    let addtaskHideREF = document.getElementById("addtask-content");
    addtaskHideREF.classList.toggle("addtask-content-hide")
    maskREF.classList.toggle("d-none")
   /*  addtaskREF.classList.toggle("d-none") */
}


function noClose(event) {
    event.stopPropagation();
}


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
        return `<div class="contact-list-initals initials-bg-color-${user.name.charAt(0).toUpperCase()}" style="z-index: ${100+input}">${initials}</div>`;
      } else {
        return `<div class="contact-list-initals">??</div>`;
      }
    }).join('');
  }
  
  function getPriorityIconHTML(priority) {
    if (!priority) return '';
  
    let prio = priority.toLowerCase();
    if (prio === 'urgent') {
      return `<img src="../assets/icons/prio-urgent.svg" class="task-priority-icon" alt="Urgent" />`;
    } else if (prio === 'medium') {
      return `<img src="../assets/icons/prio-medium.svg" class="task-priority-icon" alt="Medium" />`;
    } else if (prio === 'low') {
      return `<img src="../assets/icons/prio-low.svg" class="task-priority-icon" alt="Low" />`;
    }
    return '';
  }
   

  function createTaskCard(task) {
    let assignedHTML = renderAssignedUsers(task);
    let priorityHTML = getPriorityIconHTML(task.priority);
    
  
    return `
      <div class="task-card" id="task-${task.title.replace(/\s+/g, '-')}" draggable="true" data-status="${task.status}">
      <div class="task-type-container">
      <div class="task-type">${task.task}</div>
      </div>
      <div class="task-title" id="titleTask${task.id}">${task.title}</div>
      <div class="task-description" id="titleDescription${task.id}">${task.description}</div>
      <div class="task-subtask-info">
        <div class="subtask-progressbar">
          <div class="subtask-progress" style="width: 50%;"></div>
        </div>
        <span class="subtask-count">1/2 Subtasks</span>
      </div>
      <div class="task-meta-assignend-user-container"> 
      <div class="task-meta">
        ${priorityHTML}
      </div>
      <div class="task-assigned-users">
        ${assignedHTML}
      </div>
      </div>
      
    </div>

    `;
  }
  

  // drag and drop 

document.addEventListener("DOMContentLoaded", () => {
    let columns = document.querySelectorAll(".board-single-task-container");

    columns.forEach(column => {
        column.addEventListener("dragover", dragover);
        column.addEventListener("drop", dropTask);
    });

    document.addEventListener("dragstart", dragstart);
    document.addEventListener("dragend", dragend);
});

function dragstart(event) {
    if (!event.target.classList.contains("task-card")) return;
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add("dragging");
}

function dragover(event) {
    event.preventDefault();
    let column = event.currentTarget;
    let draggingCard = document.querySelector(".dragging");
    if (draggingCard && !column.contains(draggingCard)) {
        column.appendChild(draggingCard);
    }
}

function dropTask(event) {
    event.preventDefault();
    let taskId = event.dataTransfer.getData("text/plain");
    let taskCard = document.getElementById(taskId);
    let column = event.currentTarget;

    if (taskCard && column) {
        let newStatus = column.querySelector("span").innerText.toLowerCase().replace(" ", "");
        taskCard.dataset.status = newStatus;

        console.log(`Task ${taskId} moved to ${newStatus}`);

    }

    taskCard.classList.remove("dragging");
}

function dragend(event) {
    event.target.classList.remove("dragging");
}


