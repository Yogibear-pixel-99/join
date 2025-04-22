
/**
 * This Onload function calls up all functions that are to be displayed when the page is opened.
 *
 */
function initBoard(){
  loadAndRenderTasks();
}

/**
 * This function takes all users and tasks from the database and displays the initials in the header area.
 * It also renders the board with the respective tasks.
 * 
 */
async function loadAndRenderTasks(){
  await getDataFromServer("users", usersFromApi);
  await getDataFromServer("tasks", tasksFromApi);
  setInitialsToHeader();
  renderBoard();
}

/**
 * This function renders the respective tasks into the columns by first emptying them, then filling them 
 * and then checking whether a column is empty.
 * 
 */
function renderBoard(){
  let todo = document.getElementById("boardToDoCard");
  let prog = document.getElementById("boardInprogressCard");
  let feed = document.getElementById("boardAwaitFeedbackCard");
  let done = document.getElementById("boardDoneCard");

  clearBoardColums(todo, prog, feed, done);
  fillBoardColums(tasksFromApi, todo, prog, feed, done);
  checkEmptyColums(todo, prog, feed, done);
}

/**
 * This function empties the columns
 * 
 * @param {HTMLElement} todo - The todo column.
 * @param {HTMLElement} prog - The inprogress column.
 * @param {HTMLElement} feed - The awaitfeedback column.
 * @param {HTMLElement} done - The done column.
 */
function clearBoardColums(todo, prog, feed, done){
  todo.innerHTML = "";
  prog.innerHTML = "";
  feed.innerHTML = "";
  done.innerHTML = "";
}

/**
 * This function fills the respective columns with the tasks.
 * 
 * @param {Object} tasks - The fetched object with the tasks from the database.
 * @param {HTMLElement} todo - The todo column.
 * @param {HTMLElement} prog - The inprogress column.
 * @param {HTMLElement} feed - The awaitfeedback column.
 * @param {HTMLElement} done - The done column.
 */
function fillBoardColums(tasks, todo, prog, feed, done){
  tasks.forEach((task) => {
    let cardHtml = createTaskCard(task);
    if (task.status === "todo") todo.innerHTML += cardHtml;
    if (task.status === "inprogress") prog.innerHTML += cardHtml;
    if (task.status === "awaitfeedback") feed.innerHTML += cardHtml;
    if (task.status === "done") done.innerHTML += cardHtml;
  });
}

/**
 * This function checks whether empty fields exist and places a No Tasks container there.
 * 
 * @param {HTMLElement} todo - The todo column
 * @param {HTMLElement} prog - The inprogress column
 * @param {HTMLElement} feed - The awaitfeedback column
 * @param {HTMLElement} done - The done column
 */
function checkEmptyColums(todo, prog, feed, done){
  if (!todo.innerHTML.trim()){
    todo.innerHTML = `<div class="no-tasks">No tasks to do</div>`;
  }
  if (!prog.innerHTML.trim()){
    prog.innerHTML = `<div class="no-tasks">No tasks in progress</div>`;
  }
  if (!feed.innerHTML.trim()){
    feed.innerHTML = `<div class="no-tasks">No tasks await feedback</div>`;
  }
  if (!done.innerHTML.trim()){
    done.innerHTML = `<div class="no-tasks">No tasks done</div>`;
  }
}

/**
 * Filters assigned emails to only include those existing in the usersFromApi array.
 * Returns an empty string if no valid assignments exist.
 * 
 * @param {Object} task - The task object containing assignTo array
 * @returns {(Array|string)} - Array of valid emails or empty string
 */
function getExistingEmails(task){
  if (!task.assignTo || !task.assignTo.length === 0){
    return "";
  }

  let existingEmail = task.assignTo.filter((element) => {
    return usersFromApi.some((email) => email.email === element);
  });
  return existingEmail;
}

/**
 * Renders assigned users as styled initials with position offsets.
 * Returns empty string if no valid assignments exist.
 * 
 * @param {Object} task - The task object containing assignTo array
 * @returns {string} - HTML string of user initials
 */
function renderAssignedUsers(task){
  let existingEmail = getExistingEmails(task);
  if (!existingEmail) return "";

  let initialsPosition = -24;
  return existingEmail.map((email) => {
      let user = usersFromApi.find((u) => u.email === email);
      initialsPosition += 24;
      if (user){
        let initials = returnInitials(user.name);
        return `<div class="contact-list-board-initals 
                            initials-bg-color-${user.name
                              .charAt(0)
                              .toUpperCase()}"
                            style="left: ${initialsPosition}px">
                            ${initials}
                </div>`;
      } else {
        return `<div class="contact-list-board-initals">??</div>`;
      }
    })
    .join("");
}
/**
 *  Generates HTML code for the priority icon based on the task's priority level.
 * 
 * @param {String} priority - The priority for rendering the icon into the task
 * @returns {string} - HTML img element or empty string
 */
function getPriorityIconHTML(priority){
  if (!priority) return "";

  let prio = priority.toLowerCase();
  if (prio === "urgent"){
    return `<img src="../assets/icons/prio-urgent.svg" class="task-priority-icon" alt="Urgent" />`;
  } else if (prio === "medium"){
    return `<img src="../assets/icons/prio-medium.svg" class="task-priority-icon" alt="Medium" />`;
  } else if (prio === "low"){
    return `<img src="../assets/icons/prio-low.svg" class="task-priority-icon" alt="Low" />`;
  }
  return "";
}
/**
 * This function searches for the respective task that is searched for in the search input field.
 * 
 */
function searchForTask(){
  let inputTaskREF = document.getElementById("find-task");
  let inputTaskValue = inputTaskREF.value.toLowerCase();
  findTask(inputTaskValue);
}

/**
 * This function takes the value and searches for it in the title or description of the tasks. 
 * The respective tasks that were found are displayed.
 * 
 * @param {String} inputTaskValue - The value that was typed in the search field
 */
function findTask(inputTaskValue){
  for (let index = 1; index < tasksFromApi.length + 1; index++){
    let titleTaskREF = document.getElementById("titleTask" + tasksFromApi[index-1].id);
    let descriptionTaskREF = document.getElementById("titleDescription" + tasksFromApi[index-1].id);
    console.log(index);
    
    let titleTaskValue = titleTaskREF.innerText.toLowerCase();
    let descriptionValue = descriptionTaskREF.innerText.toLowerCase();
    if (titleTaskValue.includes(inputTaskValue) || inputTaskValue == " " || descriptionValue.includes(inputTaskValue)){
      titleTaskREF.parentElement.parentElement.classList.remove("d-none");
    } else {
      titleTaskREF.parentElement.parentElement.classList.add("d-none");
    }
  }
}

/**
 * Generates a complete HTML representation for a task card.
 * 
 * @param {Object} task - The object with the respective task
 * @returns {string} - Fully rendered HTML template for the task card
 */
function createTaskCard(task){
  let assignedHTML = renderAssignedUsers(task);
  let priorityHTML = getPriorityIconHTML(task.priority);
  let allSubTasksNr = getAllSubtasksLength(task);
  let doneSubTasksNr = getDoneSubtasksLength(task);
  let taskTemp = getSingleTaskCardForBoardTemp(task, assignedHTML, priorityHTML, allSubTasksNr, doneSubTasksNr);
  return taskTemp;
  }

/**
 * Calculates the total number of valid subtasks for a task.
 * 
 * @param {Object} task - The task object containing subtasks array
 * @returns {(number|string)} - Number of valid subtasks or empty string for invalid input
 */
function getAllSubtasksLength(task){
  if (Array.isArray(task.subtasks)){
    return task.subtasks.filter(
      (subtask) => subtask != null && subtask.subtaskName != undefined
    ).length;
  } else {
    return "";
  }
}

/**
 * This function determines the length of the subtasks that have been completed, if subtasks exist at all
 * 
 * @param {Object} task - The task object containing subtasks array
 *  * @returns {(number|string)} - Number of completed subtasks or empty string for invalid input
 */
function getDoneSubtasksLength(task){
  if (Array.isArray(task.subtasks)){
    return task.subtasks.filter(
      (subtask) =>
        subtask.finished == true && subtask.subtaskName != undefined
    ).length;
  } else {
    return "";
  }
}

/**
 * This function changes the status of the task when the drag and drop is executed
 * 
 * @param {string} newStatus - The new status of the task
 * @param {Object} taskKey - The object with the respective task whose status is to be changed
 */
function getNewStatusInfo(newStatus, taskKey){
  collectedStatusInfo = {
    status: newStatus,
  };
  patchTaskDataToApi(collectedStatusInfo, `tasks/${taskKey.apiKey}`);
}

/**
 * This function patches the new status of the respective task into the database.
 * 
 * @param {Object} payload - The object with the new status that will be patched into the database
 * @param {String} taskKey - The API key to identify the correct task and patch the status
 */
async function patchTaskDataToApi(payload, taskKey){
  if (taskKey != undefined){
    try {
      let response = await fetch(MAIN_URL + taskKey + ".json", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok){
        throw new Error("Contact not found in Database!");
      } else {
        await resetTaskApi();
        checkEmptyColumsExists();
      }
    } catch (error){
      console.log(error);
    }
  }
}


/**
 * This function executes a function to check whether empty columns exist in the board
 * 
 */
async function checkEmptyColumsExists(){
  let todo = document.getElementById("boardToDoCard");
  let prog = document.getElementById("boardInprogressCard");
  let feed = document.getElementById("boardAwaitFeedbackCard");
  let done = document.getElementById("boardDoneCard");
  checkEmptyColums(todo, prog, feed, done);
}

/**
 * This function takes the newly updated tasks from the API
 * 
 */
async function resetTaskApi(){
  return await getDataFromServer("tasks", tasksFromApi);
}


  // drag and drop 

/**
 * Initializes the drag-and-drop system once the DOM is fully loaded.
 * Adds event listeners for drag-and-drop to all columns.
 * 
 */
  document.addEventListener("DOMContentLoaded", () => {
    let columns = document.querySelectorAll(".board-rendered");

    columns.forEach(column => {
        column.addEventListener("dragover", dragover);
        column.addEventListener("drop", dropTask);
    });

    document.addEventListener("dragstart", dragstart);
    document.addEventListener("dragend", dragend);
});

/**
 * Starts the drag process for a task card.
 * 
 * @param {DragEvent} event - The drag event that was triggered.
 */
function dragstart(event){
    if (!event.target.classList.contains("task-card")) return;
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add("dragging");
}

/**
 * Allows a task card to be dragged over a column.
 * 
 * @param {DragEvent} event - The dragover event.
 */
function dragover(event){
    event.preventDefault();
    let column = event.currentTarget;
    let draggingCard = document.querySelector(".dragging");
    if (draggingCard && !column.contains(draggingCard)){
        column.appendChild(draggingCard);
    }
}

/**
 * Manages the logic for moving a task card to a new column via drag-and-drop.
 * Updates the task's status both in the UI and via an API call.
 * 
 * @param {DragEvent} event - The drop event fired when the card is released.
 */
function dropTask(event){
    event.preventDefault();
    let taskId = event.dataTransfer.getData("text/plain");
    let taskCard = document.getElementById(taskId);
    let spanElement = taskCard.closest('.board-single-task-container').querySelector('.board-task-header-container span');
    let column = event.currentTarget;
    if (taskCard && column){
        let newStatus = spanElement.innerText.toLowerCase().replace(" ", "");
        taskCard.dataset.status = newStatus;
        console.log(`Task ${taskId} moved to ${newStatus}`);
        let updateTask = tasksFromApi.find(task => {return task.apiKey === taskId || "task-" + task.title.replace(/\s+/g, '-') === taskId;});
        getNewStatusInfo(newStatus, updateTask);
    }
    taskCard.classList.remove("dragging");
    hideEmptyContentTasks(taskId);
}

/**
 * Hides the "no tasks" message when a task is moved into a column.
 * 
 * @param {string} taskId - The ID of the moved task card.
 */
function hideEmptyContentTasks(taskId){
  let contentRef = document.getElementById(taskId).parentElement.querySelector(".no-tasks");
  let allContent = document.querySelectorAll('.task-column');
    allContent.forEach((element) => {
      if (element.children.length == 1){
        element.children[0].classList.remove('d-none');
      }
    })
  if (contentRef){
    contentRef.classList.add('d-none');
  }
}

/**
 * Removes the "dragging" class after the drag operation ends.
 * 
 * @param {DragEvent} event - The dragend event.
 */
function dragend(event){
    event.target.classList.remove("dragging");
}


/**
 * Emptys the overlays.
 */
function emptyEditAddTaskOverlays(){
  let ref1 = document.getElementById('addtask-content');
  let ref2 = document.getElementById('task-overlay-menu');
      ref1.innerHTMl = '';
      ref2.innerHTML = '';
}


/**
 * Opens the selected task and gets an template for the task overlay.
 * 
 * @param {string} addTaskLocation - The location of the new task column to be added.
 */
function openAddTaskOverlay(addTaskLocation){
  emptyEditAddTaskOverlays();
  let ref = document.getElementById('addtask-content');
      ref.innerHTML = getAddTaskOverlayTemp();
      toggleOverlayMenu('addtask-content', 'addtask-overlay-mask-container');
      renderAssignToDropdown();
      renderCategoryOptions();
      addTaskStatus = addTaskLocation;
}


/**
 * Opens the overlay for a specific task.
 * Loads the latest data from the server and renders the overlay.
 * 
 * @param {string} taskId - The ID of the task to display.
 */
async function openTask(taskId){
  let addTaskRef = document.getElementById('addtask-content');
      addTaskRef.innerHTML = '';
  let taskRef = document.getElementById('task-overlay-menu');
  await getDataFromServer("tasks", tasksFromApi);
  let task = tasksFromApi.find(element => element.id === taskId);
  taskRef.innerHTML = await getTaskOverlayTemp(task);
  toggleOverlayMenu('task-overlay-menu', 'task-overlay-mask-container');
}


