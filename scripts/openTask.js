/**
 * Gets the icon source depending on the priority of the button selected.
 *
 * @param {Object} task - The task object.
 * @returns - The source of the needed svg icon.
 */
function getPriorityIconForTaskOverlay(task) {
  let iconSrc = "";
  switch (task.priority) {
    case "Urgent":
      iconSrc = "prio-urgent.svg";
      break;
    case "Medium":
      iconSrc = "prio-medium.svg";
      break;
    case "Low":
      iconSrc = "prio-low.svg";
      break;
  }
  return iconSrc;
}


/**
 * Shows the assigend users in the selected task.
 *
 * @param {Object} task
 * @returns - The HTML template with the assigend users.
 */
async function getTaskAssignedUsers(task) {
  let content = "";
  await getDataFromServer("users", usersFromApi);
  if (task.assignTo && task.assignTo.length > 0) {
    for (let userIndex = 0; userIndex < task.assignTo.length; userIndex++) {
      const userEmail = task.assignTo[userIndex];
      usersFromApi.find((element) => {
        if (element.email === userEmail) {
          content += getAssignedUserTaskOverlayTemp(
            element.name,
            returnInitials(element.name)
          );
        }
      });
    }
    return content;
  } else {
    return "No user assigned";
  }
}


/**
 * Gets all the subtasks from the selected task from the api.
 *
 * @param {Object} task - The selected task object.
 * @returns - A HTML template including all subtasks from the selected task.
 */
async function getSubtasksForTaskOverlay(task) {
  let content = "";
  await getDataFromServer(`tasks/${task.apiKey}/subtasks`, subtasksFromApi);
  subtasksFromApi.forEach(
    (subtask) => (content += getSubtaskForTaskOverlayTemp(task, subtask))
  );
  return content;
}


/**
 * Checks if the subtask is finished or not.
 *
 * @param {Object} subtask - A subtask object from the selected task(subtask) array.
 * @returns - A string with "checked" or an empty string.
 */
function checkIfSubtaskIsDone(subtask) {
  return subtask.finished == true ? "checked" : "";
}


/**
 * Changes the finished subtask boolean in the api.
 *
 * @param {string} SUB_URL - The location in the api database.
 * @param {string} id - The id of the selected subtask container.
 */
async function changeSubTaskCheckedApi(SUB_URL, id) {
  let inputRef = document.getElementById(id);
  let isChecked = {};
  inputRef.checked
    ? (isChecked = { finished: true })
    : (isChecked = { finished: false });
  await patchDataToApi(SUB_URL, isChecked);
  initBoard();
}


/**
 * Deletes the selected task in the api, toggles the overlay menu and initialze the board.
 *
 * @param {string} taskApiKey - The api key from the selected task to delete.
 */
async function overlayDeleteTask(taskApiKey) {
  let taskRef = document.getElementById("task-overlay-menu");
  await deleteDataFromApi("tasks/", taskApiKey);
  closeOverlayMenu("task-overlay-menu", "task-overlay-mask-container");
  setTimeout(() => {
    taskRef.innerHTML = "";
  }, 1000);
  initBoard();
}


/**
 * Opens an edit menu for the selected task to edit the values.
 *
 * @param {string} taskApiKey - The api key from the selected task to edit.
 */
function overlayEditTask(taskApiKey) {
  let taskRef = document.getElementById("task-overlay-menu");
  let taskData = tasksFromApi.find((element) => element.apiKey === taskApiKey);
  taskRef.innerHTML = getEditTaskTemp(taskData);
  renderAssignToDropdown();
  renderCategoryOptions();
  setTimeout(() => {
    setPriorityButtonContainer(taskData);
  }, 1);
  setTimeout(() => {
    setAssignedUsersToDropdown(taskData);
  }, 1);
  setTimeout(() => {
    showSubtaskInEditOverlay(taskData);
  }, 1);
}


/**
 * Gets the selected priority from the task in the edit menu.
 *
 * @param {Object} task - The selected task object.
 */
function setPriorityButtonContainer(task) {
  let ref = document.getElementById(`edit-priority-${task.priority}`);
  setPriorityButtonColor(ref);
}


/**
 * Shows the assigened users in the selected task to edit.
 *
 * @param {Objerct} task - The selected task object.
 */
function setAssignedUsersToDropdown(task) {
  task.assignTo.forEach((element) => {
    toggleUserSelection(element);
  });
}


/**
 * Shows the subtask from the selected subtasks to edit.
 *
 * @param {Object} task - The selected task object.
 */
function showSubtaskInEditOverlay(task) {
  let ref = document.getElementById("added-subtasks");
  ref.innerHTML = "";
  if (task.subtasks.map((element) => element.subtaskName)) {
    let subtaskArray = task.subtasks.map((element) => element.subtaskName);
    for (
      let subtaskIndex = 0;
      subtaskIndex < subtaskArray.length;
      subtaskIndex++
    ) {
      const element = subtaskArray[subtaskIndex];
      ref.innerHTML += renderSubtaskTemp(element);
    }
  }
}


/**
 * Updates the edited task to the new values, fetches them to the api and show the edited task in the overlay menu.
 *
 * @param {object} event - Default object to prevent the form to refresh the page.
 * @param {string} apiKey - The api key to update the selected task in the api.
 */
async function updateTask(event, apiKey, status) {
  event.preventDefault();
  if (checkEditTaskOverlayFormValidation()) {
    let taskRef = document.getElementById("task-overlay-menu");
    addTaskStatus = status;
    await collectAllTaskInfos();
    await patchDataToApi(`tasks/${apiKey}/`, collectedFormInfos);
    await getDataFromServer("tasks", tasksFromApi);
    let task = tasksFromApi.find((element) => element.apiKey === apiKey);
    taskRef.innerHTML = await getTaskOverlayTemp(task);
    renderBoard();
  }
}


/**
 * Checks if the edit task form has valid values.
 *
 * @returns - A boolean.
 */
function checkEditTaskOverlayFormValidation() {
  let title = document.getElementById("form-title").value.trim();
  let dueDate = document.getElementById("due-date").value.trim();
  if (title == "" || dueDate == "" || !checkIfDateIsValid()) {
    titleRedBorder(title);
    dateRedBorder(dueDate);
    return false;
  } else {
    titleRedBorder(title);
    dateRedBorder(dueDate);
    return true;
  }
}
