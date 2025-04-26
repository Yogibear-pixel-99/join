/**
 * This Onload function calls up all functions that are to be displayed when the page is opened.
 *
 */
async function initBoard() {
  removeDisplayNone("loading-spinner");
  redirectToLogInPage();
  await loadAndRenderTasks();
  addDisplayNone("loading-spinner");
}


/**
 * This function takes all users and tasks from the database and displays the initials in the header area.
 * It also renders the board with the respective tasks.
 *
 */
async function loadAndRenderTasks() {
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
function renderBoard() {
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
function clearBoardColums(todo, prog, feed, done) {
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
function fillBoardColums(tasks, todo, prog, feed, done) {
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
function checkEmptyColums(todo, prog, feed, done) {
  if (!todo.innerHTML.trim()) {
    todo.innerHTML = `<div class="no-tasks">No tasks to do</div>`;
  }
  if (!prog.innerHTML.trim()) {
    prog.innerHTML = `<div class="no-tasks">No tasks in progress</div>`;
  }
  if (!feed.innerHTML.trim()) {
    feed.innerHTML = `<div class="no-tasks">No tasks await feedback</div>`;
  }
  if (!done.innerHTML.trim()) {
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
function getExistingEmails(task) {
  if (!task.assignTo || !task.assignTo.length === 0) {
    return "";
  }

  let existingEmail = task.assignTo.filter((element) => {
    return usersFromApi.some((email) => email.email === element);
  });
  return existingEmail;
}


/**
 * Renders assigned users as styled initials with position offsets or a dot template if therer are more users assigned as four.
 * Returns empty string if no valid assignments exist.
 *
 * @param {Object} task - The task object containing assignTo array
 * @returns {HTMLElement} - Returns the HTML template to render at the board.
 */
function renderAssignedUsers(task) {
  let nr = 0;
  let existingEmail = getExistingEmails(task);
  if (!existingEmail) return "";
  let initialsPosition = -24;
  return renderExistingUsers(existingEmail, initialsPosition, nr);
}


/**
 * Generates HTML for assigned users' initials with position offsets.
 * Limits display to 3 users + "..." indicator for additional assignments.
 *
 * @param {Array} existingEmail - Array of valid assigned emails
 * @param {number} initialsPosition - Base offset for initials positioning
 * @param {number} nr - Counter for rendered users
 * @returns {string} - HTML string of user initials/dots
 */
function renderExistingUsers(existingEmail, initialsPosition, nr) {
  return existingEmail
    .map((email) => {
      let user = usersFromApi.find((u) => u.email === email);
      initialsPosition += 24;
      if (user && nr <= 3) {
        let initials = returnInitials(user.name);
        nr++;
        return getInitialsForBoardTemp(user, initialsPosition, initials);
      } else if (user && nr == 4) {
        let initials = "...";
        nr++;
        return getDotsForBoardTemp(initialsPosition, initials);
      } else {
        return ``;
      }
    })
    .join("");
}


/**
 *
 *
 * @param {integer} initialsPosition - The absolute position.
 * @param {string} initials - The dots to display.
 * @returns - The dot template.
 */
function getDotsForBoardTemp(initialsPosition, initials) {
  return `<div class="contact-list-board-initals 
  initials-bg-color-Plus"
  style="left: ${initialsPosition}px">
  ${initials}
</div>`;
}


/**
 *  Generates HTML code for the priority icon based on the task's priority level.
 *
 * @param {String} priority - The priority for rendering the icon into the task
 * @returns {string} - HTML img element or empty string
 */
function getPriorityIconHTML(priority) {
  if (!priority) return "";

  let prio = priority.toLowerCase();
  if (prio === "urgent") {
    return `<img src="../assets/icons/prio-urgent.svg" class="task-priority-icon" alt="Urgent" />`;
  } else if (prio === "medium") {
    return `<img src="../assets/icons/prio-medium.svg" class="task-priority-icon" alt="Medium" />`;
  } else if (prio === "low") {
    return `<img src="../assets/icons/prio-low.svg" class="task-priority-icon" alt="Low" />`;
  }
  return "";
}


/**
 * This function searches for the respective task that is searched for in the search input field.
 *
 */
function searchForTask() {
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
function findTask(inputTaskValue) {
  let foundAny = false;
  for (let index = 1; index < tasksFromApi.length + 1; index++) {
    let titleTaskREF = document.getElementById("titleTask" + tasksFromApi[index - 1].apiKey);
    let descriptionTaskREF = document.getElementById(
      "titleDescription" + tasksFromApi[index - 1].apiKey
    );
    let titleTaskValue = titleTaskREF.innerText.toLowerCase();
    let descriptionValue = descriptionTaskREF.innerText.toLowerCase();
    if (titleTaskValue.includes(inputTaskValue) || inputTaskValue == " " || descriptionValue.includes(inputTaskValue)) {
      titleTaskREF.parentElement.parentElement.classList.remove("d-none");
      foundAny = true;
    } else {
      titleTaskREF.parentElement.parentElement.classList.add("d-none");
    }
  }
  getAllBoards();
  foundTasks(foundAny);
}


/**
 * Shows error message if no tasks were found, otherwise clears error states.
 *
 * @param {boolean} foundAny - Indicates whether matching tasks were found
 */
function foundTasks(foundAny) {
  if (!foundAny) {
    addRedBorderAndTextFalseInput("find-task", "search-error-message", "No Task found!");
  } else {
    removeRedBorderAndTextFalseInput("find-task", "search-error-message");
  }
}


/**
 * Generates a complete HTML representation for a task card.
 *
 * @param {Object} task - The object with the respective task
 * @returns {string} - Fully rendered HTML template for the task card
 */
function createTaskCard(task) {
  let assignedHTML = renderAssignedUsers(task);
  let priorityHTML = getPriorityIconHTML(task.priority);
  let allSubTasksNr = getAllSubtasksLength(task);
  let doneSubTasksNr = getDoneSubtasksLength(task);
  let taskTemp = getSingleTaskCardForBoardTemp(task, assignedHTML, priorityHTML, allSubTasksNr, doneSubTasksNr);
  return taskTemp;
}


/**
 * This function changes the status of the task when the drag and drop is executed
 *
 * @param {string} newStatus - The new status of the task
 * @param {Object} taskKey - The object with the respective task whose status is to be changed
 */
function getNewStatusInfo(newStatus, taskKey) {
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
async function patchTaskDataToApi(payload, taskKey) {
  if (taskKey != undefined) {
    try {
      let response = await fetch(MAIN_URL + taskKey + ".json", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Contact not found in Database!");
      } else {
        await resetTaskApi();
        checkEmptyColumsExists();
      }
    } catch (error) {
      console.log(error);
    }
  }
}


/**
 * This function executes a function to check whether empty columns exist in the board
 *
 */
async function checkEmptyColumsExists() {
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
async function resetTaskApi() {
  return await getDataFromServer("tasks", tasksFromApi);
}


/**
 * Emptys the overlays.
 */
function emptyEditAddTaskOverlays() {
  let ref1 = document.getElementById("addtask-content");
  let ref2 = document.getElementById("task-overlay-menu");
  ref1.innerHTML = "";
  ref2.innerHTML = "";
}


/**
 * Opens the selected task and gets an template for the task overlay.
 *
 * @param {string} addTaskLocation - The location of the new task column to be added.
 */
function openAddTaskOverlay(addTaskLocation) {
  emptyEditAddTaskOverlays();
  let ref = document.getElementById("addtask-content");
  ref.innerHTML = getAddTaskOverlayTemp();
  openOverlayMenu("addtask-content", "addtask-overlay-mask-container");
  renderAssignToDropdown();
  renderCategoryOptions();
  setStatusToAddTask(addTaskLocation);
}


/**
 * Opens the overlay for a specific task.
 * Loads the latest data from the server and renders the overlay.
 *
 * @param {string} taskApiKey - The ID of the task to display.
 */
async function openTask(taskApiKey) {
  emptyEditAddTaskOverlays();
  let addTaskRef = document.getElementById("addtask-content");
  addTaskRef.innerHTML = "";
  let taskRef = document.getElementById("task-overlay-menu");
  await getDataFromServer("tasks", tasksFromApi);
  let task = tasksFromApi.find((element) => element.apiKey === taskApiKey);
  addMissingKeys(task, "assignTo", []);
  addMissingKeys(task, "subtasks", []);
  taskRef.innerHTML = await getTaskOverlayTemp(task);
  openOverlayMenu("task-overlay-menu", "task-overlay-mask-container");
}


/**
 * Checks all board containers for empty states and displays "No tasks" messages if needed.
 * Runs the empty check for To Do, In Progress, Await Feedback, and Done boards.
 */
function getAllBoards() {
  let todo = document.getElementById("boardToDoCard");
  let prog = document.getElementById("boardInprogressCard");
  let feed = document.getElementById("boardAwaitFeedbackCard");
  let done = document.getElementById("boardDoneCard");
  checkEmptyBoard(todo);
  checkEmptyBoard(prog);
  checkEmptyBoard(feed);
  checkEmptyBoard(done);
}


/**
 * Checks if all task cards in the container are hidden.
 * Shows or removes a "No tasks found" message accordingly.
 *
 * @param {HTMLElement} container - The board container element
 */
function checkEmptyBoard(container) {
  let allDivs = container.querySelectorAll(":scope > div:not(.no-task-search)");
  let existingMessage = container.querySelector(".no-task-search");
  if (Array.from(allDivs).every((div) => div.classList.contains("d-none"))) {
    if (!existingMessage) {
      container.innerHTML += `<div class="no-task-search">No tasks found</div>`;
    }
  } else {
    if (existingMessage) {
      existingMessage.remove();
    }
  }
}
