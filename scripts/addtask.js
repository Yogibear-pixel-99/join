/**
 * Sets the button and the button color.
 *
 * @param {HTMLElement} selected - The selected button container.
 */
function setPriorityButtonColor(selected) {
  const labelRef = document.querySelectorAll("#priority-wrapper label");
  labelRef.forEach((element) => {
    if (element === selected) {
      element.classList.add("active");
      element.querySelector("svg").classList.add("prio-svg");
    } else {
      element.classList.remove("active");
      element.querySelector("svg").classList.remove("prio-svg");
    }
  });
}


/**
 * Creates the div container for the selected user.
 *
 * @param {Object} user - The user object.
 */
function addSelectedContact(user) {
  let container = document.getElementById("addSelectedContacts");
  let userEmail = user.email;
  let existing = container.querySelector(`.selected-contact[data-user-id="${userEmail}"]`);
  if (!existing) {
    assignedToContact++;
    let selectedDiv = document.createElement("div");
    selectedDiv.classList.add("selected-contact");
    selectedDiv.setAttribute("data-user-id", userEmail);
    selectedDiv.innerHTML = getAssignedUserInitials(user);
    container.appendChild(selectedDiv);
  }
}


/**
 * Creates a template to display the selected user initials.
 *
 * @param {Object} user - The selected user object.
 * @returns A template with the user initials.
 */
function getAssignedUserInitials(user) {
  return `<div id = "${user.name
    .split(" ")
    .join(
      ""
    )}" class="contact-list-initals flex-ctr-ctr initials-bg-color-${user.name
    .charAt(0)
    .toUpperCase()}">${returnInitials(user.name)}</div>`;
}


/**
 * Removes the selected contact.
 *
 * @param {string} userEmail - The email of the selected contact.
 */
function removeSelectedContact(userEmail) {
  let container = document.getElementById("addSelectedContacts");
  let existingDiv = container.querySelector(
    `.selected-contact[data-user-id="${userEmail}"]`
  );
  if (existingDiv) {
    assignedToContact = assignedToContact - 1;
    existingDiv.remove();
  }
}


/**
 * Checks if the user input date is valid.
 */
function checkIfDateIsValid() {
  let dateValid = false;
  let userInput = document.getElementById("due-date");
  let userDate = userInput.value.replaceAll("/", "");
  if (userDate.length === 8) {
    let dateNow = new Date();
    const day = parseInt(userDate.slice(0, 2));
    const month = parseInt(userDate.slice(2, 4) - 1);
    const year = parseInt(userDate.slice(4, 8));
    let wholeUserDate = new Date(year, month, day);
    wholeUserDate = wholeUserDate.setHours(0, 0, 0, 0);
    dateNow = dateNow.setHours(0, 0, 0, 0);
    if (checkDayAndMonthValid(day, month, wholeUserDate, dateNow)) {
      dateValid = true;
      removeRedBorderAndTextFalseInputAddTask("due-date", "date-error-message");
    }
    return dateValid;
  }
}


/**
 * Checks if the day and the month are valid values.
 *
 * @param {integer} day - The userinput day.
 * @param {integer} month - The userinput month.
 * @param {integer} wholeUserDate - The user input time stamp.
 * @param {integer} dateNow - The date time stamp.
 */
function checkDayAndMonthValid(day, month, wholeUserDate, dateNow) {
  let dateValid = true;
  const maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const maxDay = maxDaysInMonth[month];
  if (month + 1 < 1 || month + 1 > 12 || day < 1 || day > maxDay) {
    addRedBorderAndTextFalseInputAddTask("due-date", "date-error-message", "Enter a valid date");
    dateValid = false;
  } else if (wholeUserDate < dateNow) {
    addRedBorderAndTextFalseInputAddTask("due-date", "date-error-message", "Date must be in the future");
    dateValid = false;
  }
  return dateValid;
}


/**
 * Shows the date picker from the hidden date input container.
 */
function showDatePicker() {
  let hiddenDate = document.getElementById("hidden-date-input");
  hiddenDate.showPicker();
}


/**
 * Gets the picked date from the hidden date input field to the shown text input field.
 */
function putDateToUserInput() {
  let shownDate = document.getElementById("due-date");
  let hiddenDate = document.getElementById("hidden-date-input").value;
  hiddenDate = hiddenDate.split("-").reverse().join("/");
  shownDate.value = hiddenDate;
  setTimeout(() => {
    checkIfDateIsValid();
  }, 200);
}


/**
 * Checks the input value and shows only a special date pattern value in the date input field in the add task form.
 */
function checkDateInput() {
  let contentRef = document.getElementById("due-date");
  let dateContent = "";
  userInput = contentRef.value.replace(/\D/g, "");
  contentRef.value = "";
  dateContent += setDayToAddTaskDateInput(userInput);
  dateContent += setMonthToAddTaskDateInput(userInput);
  dateContent += setYearToAddTaskDateInput(userInput);
  contentRef.value = dateContent;
  if ((dateContent.length = 10)) {
    checkIfDateIsValid();
  }
}


/**
 * Resets the date input value in the add task date input field if backspace or del key is pressed.
 *
 * @param {Object} event - The default object.
 */
function resetDateValue(event) {
  if (event.keyCode == 8 || event.keyCode == 46) {
    resetValueFromInputField("due-date");
  }
}


/**
 * Gets the first two numbers as the day for the special date pattern.
 *
 * @param {string} userInput - The user input from the date input field in the add task form.
 * @returns The day integer from the user input.
 */
function setDayToAddTaskDateInput(userInput) {
  if (userInput.length >= 2) {
    let userDay = userInput.slice(0, 2);
    return userDay + "/";
  } else {
    return userInput;
  }
}


/**
 * Gets the second two numbers as the month for the special date pattern.
 *
 * @param {string} userInput - The user input from the date input field in the add task form.
 * @returns The month integer from the user input.
 */
function setMonthToAddTaskDateInput(userInput) {
  if (userInput.length >= 4) {
    let userMonth = userInput.slice(2, 4);
    return userMonth + "/";
  } else {
    return userInput.slice(2, 3);
  }
}


/**
 * Gets the last four numbers as the year for the special date pattern.
 *
 * @param {string} userInput - The user input from the date input field in the add task form.
 * @returns The year integer from the user input.
 */
function setYearToAddTaskDateInput(userInput) {
  if (userInput.length >= 5) {
    let userYear = userInput.slice(4, 8);
    return userYear;
  } else {
    return "";
  }
}


/**
 * This function takes the information from the fields in order to add a new task to the database and also display it on the board.
 *
 * @param {Object} event - The default event object.
 */
async function addTask(event) {
  event.preventDefault();
  await collectAllTaskInfos();
  await postDataToApi("tasks", collectedFormInfos);
  toggleAddedButton("task-added-overlay-button", "task-added-overlay-button-show", "d-none");
  setTimeout(() => {
    window.location.href = "../html/board.html";
  }, 1500);
}


/**
 * Collect form infos for the task object.
 */
async function collectAllTaskInfos() {
  collectedFormInfos = await getEmptyTaskTemplate();
  collectFormInformation("add-task-form");
  collectCategory();
  collectSubTasks(new FormData(document.getElementById("add-task-form")));
  collectAssingTo();
}


/**
 * This function extracts the assignTo and inserts them into collectedFormInfos.
 *
 */
function collectAssingTo() {
  let userREF = document;
  for (let index = 0; index < usersFromApi.length; index++) {
    if (
      userREF.getElementById(usersFromApi[index].name.split(" ").join("")) !==
      null
    ) {
      collectedFormInfos.assignTo.push(usersFromApi[index].email);
    }
  }
}


/**
 * This function inserts the category into collectedFormInfos.
 *
 *
 */
function collectCategory() {
  collectedFormInfos.category = savedCategory;
}


/**
 * This function checks all mandatory fields in the AddTask for empty fields.
 *
 * @param {Object} event - The default event object.
 */
function createNewTask(event) {
  event.preventDefault();
  let title = document.getElementById("form-title").value.trim();
  let dueDate = document.getElementById("due-date").value.trim();
  savedCategory = document.getElementById("categoryDropdown").value;
  getTaskStatus();
  if (title.trim() == "" || dueDate == "" || !checkIfDateIsValid() || savedCategory == "") {
    event.preventDefault();
    titleRedBorder(title);
    dateRedBorder(dueDate);
    categoryRedBorder(savedCategory);
  } else {
    titleRedBorder(title);
    dateRedBorder(dueDate);
    categoryRedBorder(savedCategory);
    blockButton();
    addTask(event);
  }
}


/**
 * Gets the data status from the session storage.
 */
function getTaskStatus() {
  let data = sessionStorage.getItem("taskStatus");
  if (data === null) {
    addTaskStatus = "todo";
  } else {
    addTaskStatus = data;
  }
}


/**
 * Disables the "Create Task" button by removing its click event handler.
 *
 * This function sets the 'onclick' property of the button to null,
 * effectively blocking any user interaction via clicking.
 */
function blockButton() {
  let createTaskButtonREF = document.getElementById("create-task-button");
  let overlayREF = document.getElementById("create-task-overlay");
  overlayREF.classList.toggle("d-none");
  createTaskButtonREF.onclick = null;
}


/**
 * This function checks whether the title field is empty. If it is empty, it is displayed in red
 * with a warning message below the field.
 *
 * @param {string} title - The value of the Title Input Field
 *
 */
function titleRedBorder(title) {
  if (title.trim() == "") {
    addRedBorderAndTextFalseInputAddTask("form-title", "title-error-message", "This field is required.");
  } else {
    removeRedBorderAndTextFalseInputAddTask("form-title", "title-error-message");
  }
}


/**
 * This function checks whether the date field is empty. If it is empty, it is displayed in red
 * with a warning message below the field.
 *
 * @param {string} dueDate - The value of the Date Input Field
 */
function dateRedBorder(dueDate) {
  if (dueDate == "") {
    addRedBorderAndTextFalseInputAddTask("due-date", "date-error-message", "This field is required.");
  } else if (!checkIfDateIsValid()) {
    addRedBorderAndTextFalseInputAddTask("due-date", "date-error-message", "Enter a valid date.");
  } else {
    removeRedBorderAndTextFalseInputAddTask("due-date", "date-error-message");
  }
}


/**
 * This function checks whether the category field is empty. If it is empty, it is displayed in red
 * with a warning message below the field.
 *
 * @param {string} category - The value of the category Field
 */
function categoryRedBorder(category) {
  if (category == "") {
    addRedBorderAndTextFalseInputAddTask("categoryDropdown", "category-error-message", "This field is required.");
  } else {
    removeRedBorderAndTextFalseInputAddTask("categoryDropdown", "category-error-message");
  }
}


/**
 * This function resets the assigned users list and toggles the selection state
 * of any previously selected users in the data source.
 *
 */
function clearAssignedTo() {
  const assignedUsersREF = document.getElementById("addSelectedContacts");
  assignedUsersREF.innerHTML = "";
  for (let index = 0; index < usersFromApi.length; index++) {
    if (usersFromApi[index].isSelected) {
      usersFromApi[index].isSelected = !usersFromApi[index].isSelected;
      renderAssignToDropdown();
    }
  }
}


/**
 * Stores the task status in session storage for use during task creation.
 *
 * @param {string} status - The status to set for the new task (e.g., "todo", "in-progress")
 */
function setStatusToAddTask(status) {
  sessionStorage.setItem("taskStatus", status);
}


/**
 * Handles the Enter key press event by removing focus from the active element.
 *
 * @param {KeyboardEvent} event - The keyboard event object
 */
function enterKey(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    event.target.blur();
  }
}
