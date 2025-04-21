/**
 * Sets the button and the button color.
 * 
 * @param {HTMLElement} selected - The selected button container.
 */
function setPriorityButtonColor(selected){
  const labelRef = document.querySelectorAll("#priority-wrapper label");
  labelRef.forEach((element) => {
    if (element === selected){
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
  function addSelectedContact(user){
    let container = document.getElementById("addSelectedContacts");
    let userEmail = user.email;
    let existing = container.querySelector(`.selected-contact[data-user-id="${userEmail}"]`);
    if (!existing){
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
  function getAssignedUserInitials(user){
    return `<div id = "${user.name.split(" ").join("")}" class="contact-list-initals flex-ctr-ctr initials-bg-color-${user.name.charAt(0).toUpperCase()}">
          ${returnInitials(user.name)}
        </div>`;
  }
  

  /**
   * Removes the selected contact.
   * 
   * @param {string} userEmail - The email of the selected contact.
   */
  function removeSelectedContact(userEmail){
    let container = document.getElementById("addSelectedContacts");
    let existingDiv = container.querySelector(`.selected-contact[data-user-id="${userEmail}"]`);
    if (existingDiv){
      existingDiv.remove();
    }
  }


/**
 * Shows the date picker from the hidden date input container.
 */
function showDatePicker(){
  let hiddenDate = document.getElementById('hidden-date-input');
  hiddenDate.showPicker();
}


/**
 * Gets the picked date from the hidden date input field to the shown text input field.
 */
 function putDateToUserInput(){
    let shownDate = document.getElementById('due-date');
    let hiddenDate = document.getElementById('hidden-date-input').value;
        hiddenDate = hiddenDate.split('-').reverse().join('/');
    shownDate.value = hiddenDate;
 }


 /**
  * Checks the input value and shows only a special date pattern value in the date input field in the add task form.
  */
 function checkDateInput(){
   let contentRef = document.getElementById('due-date');
   let dateContent = '';
      userInput = contentRef.value.replace(/\D/g, '');
      contentRef.value = '';
      dateContent += setDayToAddTaskDateInput(userInput);
      dateContent += setMonthToAddTaskDateInput(userInput);
      dateContent += setYearToAddTaskDateInput(userInput);
    contentRef.value = dateContent;
  
}


/**
 * Resets the date input value in the add task date input field if backspace or del key is pressed.
 * 
 * @param {Object} event - The default object.
 */
function resetDateValue(event){
  let contentRef = document.getElementById('due-date');
  if (event.keyCode == 8 || event.keyCode == 46){
    contentRef.value = '';
  } 
}


/**
 * Gets the first two numbers as the day for the special date pattern.
 * 
 * @param {string} userInput - The user input from the date input field in the add task form.
 * @returns The day integer from the user input.
 */
function setDayToAddTaskDateInput(userInput){
  if (userInput.length >= 2){
    let userDay = userInput.slice(0, 2);
    return userDay + '/';
  } else {return userInput};
}


/**
 * Gets the second two numbers as the month for the special date pattern.
 * 
 * @param {string} userInput - The user input from the date input field in the add task form.
 * @returns The month integer from the user input.
 */
function setMonthToAddTaskDateInput(userInput){
  if (userInput.length >= 4){
    let userMonth = userInput.slice(2, 4);
    return userMonth + '/';
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
function setYearToAddTaskDateInput(userInput){
  if (userInput.length >= 5){
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
async function addTask(event){
event.preventDefault();
collectedFormInfos = await getEmptyTaskTemplate();
collectFormInformation('add-task-form');
collectCategory();
collectSubTasks(new FormData(document.getElementById('add-task-form')));
collectAssingTo();
await postDataToApi("tasks", collectedFormInfos);
toggleAddedToBoardButton();
setTimeout(() => {window.location.href = "../html/board.html"}, 1500);
}


/**
 * This function shows a button, that the generated task has been added to the board.
 * 
 */
function toggleAddedToBoardButton(){
  setTimeout(() => {toggleClassToContainer('task-added-overlay-button', 'd-none')}, 1);
  setTimeout(() => {toggleClassToContainer('task-added-overlay-button', 'task-added-overlay-button-show')}, 100);
  setTimeout(() => {toggleClassToContainer('task-added-overlay-button', 'task-added-overlay-button-show')}, 1400);
  setTimeout(() => {toggleClassToContainer('task-added-overlay-button', 'd-none')}, 1450);
}


/**
 * This function extracts the assignTo and inserts them into collectedFormInfos.
 * 
 */
function collectAssingTo(){
  let userREF = document;
  console.log(usersFromApi[1].name);
  for (let index = 0; index < usersFromApi.length; index++){
    if (userREF.getElementById(usersFromApi[index].name.split(" ").join("")) !== null){
     collectedFormInfos.assignTo.push(usersFromApi[index].email)
    } 
  }
}


/**
 * This function saves the selected category in the Add Task Menu.
 * 
 * @param {string} category - The selected category 
 */
function formDataCategory(category){
  savedCategory = category;
}


/**
 * This function inserts the category into collectedFormInfos.
 * 
 * 
 */
function collectCategory(){
  collectedFormInfos.category = savedCategory;
}


/**
 * This function checks all mandatory fields in the AddTask for empty fields.
 * 
* @param {Object} event - The default event object.
 */
function createNewTask(event){
  event.preventDefault();
  let title = document.getElementById('form-title').value;
  let dueDate = document.getElementById('due-date').value;
  let category = document.getElementById('categoryDropdown').value;
  if (title === '' || dueDate === ''|| category === ''){
    event.preventDefault();  
    titleRedBorder(title);
    dateRedBorder(dueDate);
    categoryRedBorder(category);
  } else {
    titleRedBorder(title);
    dateRedBorder(dueDate);
    categoryRedBorder(category);
    addTask(event);
  }
}


/**
 * This function checks whether the title field is empty. If it is empty, it is displayed in red
 * with a warning message below the field.
 * 
 * @param {string} title - The value of the Title Input Field
 * 
 */
function titleRedBorder(title){
  if (title == ''){
    addRedBorderAndTextFalseInputAddTask(
      "form-title",
      "title-error-message",
      "This field is required."
    );
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
function dateRedBorder(dueDate){
  if (dueDate == ''){
    addRedBorderAndTextFalseInputAddTask(
      "due-date",
      "date-error-message",
      "This field is required."
    );
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
function categoryRedBorder(category){
  if (category == ''){
    addRedBorderAndTextFalseInputAddTask(
      "categoryDropdown",
      "category-error-message",
      "This field is required."
    );
  } else {
    removeRedBorderAndTextFalseInputAddTask("categoryDropdown", "category-error-message");
  }
}


/**
 * This function highlights the respective field with an error 
 * message and changes the border to red.
 * 
 * @param {string} borderContainer - The element at which the border turns red
 * @param {string} errorMessage - The error Message
 * @param {string} messageContainer - The element that displays the error message
 */
function addRedBorderAndTextFalseInputAddTask(borderContainer, messageContainer, errorMessage){
  const contentRef = document.getElementById(borderContainer);
  const textRef = document.getElementById(messageContainer);
        contentRef.classList.add('red-border-inputfield');
        textRef.innerText = errorMessage;
        textRef.style.color = 'red';
}


/**
 * This function removes the error message and removes the red border.
 * 
 * @param {string} borderContainer - The element at which the red border is removed
 * @param {string} messageContainer - The element that displays the error message
 */
function removeRedBorderAndTextFalseInputAddTask(borderContainer, messageContainer){
  const contentRef = document.getElementById(borderContainer);
  const textRef = document.getElementById(messageContainer);
        contentRef.classList.remove('red-border-inputfield');
        textRef.innerHTML = '';
}