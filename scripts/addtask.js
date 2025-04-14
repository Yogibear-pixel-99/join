const staticCategories = ["Technical Task", "User Story"];
let selectedCategory = null;
let collectSubTask = []
let savedCategory;
let addTaskStatus = "todo";



function resetForm(formId) {
  const ref = document.getElementById(formId);
  const priorityRef = document.getElementById('standard-prio');
  ref.reset();
  setPriorityButtonColor(priorityRef);
  deleteSubtasksContent();
}


function deleteSubtasksContent(){
  document.getElementById("added-subtasks").innerHTML = '';
  allSubtasks = [];

}


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


function showSubtasksInputMenu() {
  const plusIcon = document.getElementById("subtasks-plus");
  const focusIcons = document.getElementById("subtasks-on-focus-icons");
  plusIcon.classList.add("d-none");
  focusIcons.classList.remove("d-none");
}


function hideSubtasksInputMenu() {
  const plusIcon = document.getElementById("subtasks-plus");
  const focusIcons = document.getElementById("subtasks-on-focus-icons");
  plusIcon.classList.remove("d-none");
  focusIcons.classList.add("d-none");
}

let allSubtasks = [];

function addSubtaskValueToArray() {
  let subtaskOutput = document.getElementById("added-subtasks");
  let subtaskInput = document.getElementById("subtasks-input");
  let allSubtasks = Array.from(document.getElementsByClassName('subtask-input'), element => element.value);
  const userInput = subtaskInput.value;
  console.log(allSubtasks);
  if ((allSubtasks.length != 0) && (allSubtasks.some((element) => element === userInput))) {
    getAddSubtaskError(subtaskInput, 'Subtask already exists');
  }  else if (userInput == "") {
    getAddSubtaskError(subtaskInput, 'Type in a subtask');
  } else {
    subtaskOutput.innerHTML += renderSubtaskTemp(userInput);
  }
  subtaskInput.value = "";
}


function getAddSubtaskError(subtaskInput, errorMessage) {
  subtaskInput.classList.add("subtask-input-error");
  subtaskInput.setAttribute("placeholder", errorMessage);
  setTimeout(() => clearSubtaskError(subtaskInput), 2000);
}


function clearSubtaskError(subtaskInput) {
  subtaskInput.classList.remove("subtask-input-error");
  subtaskInput.setAttribute("placeholder", "Add new subtask");
}


function deleteSubtask(containerId){
  let contentRef = document.getElementById(containerId);
      console.log(contentRef);
      contentRef.remove();
}


function focusToSubtaskInput(containerId){
  let ref = document.getElementById(containerId);
      ref.focus();
}




async function loadDropdown() {
  await getDataFromServer("users", usersFromApi);
  renderAssignToDropdown();
  renderCategoryOptions();
  initialsChange();
}



async function toggleAssignedDropdown() {
    let dropdown = document.getElementById("dropdownContent");
    let wrapper = document.getElementById("addTaskWrapper")
  if (wrapper.classList.contains('add-task-wrapper-passive')) {
    wrapper.style.maxHeight = "500px";
    wrapper.classList.remove('add-task-wrapper-passive');
    wrapper.classList.add('add-task-wrapper-active');
  } else {
    wrapper.style.maxHeight = '0';
    wrapper.classList.remove('add-task-wrapper-active');
    wrapper.classList.add('add-task-wrapper-passive');
  }
  closeDropdown(dropdown);
  }

 function closeDropdown(dropdown) {
  if (dropdown.classList.contains("d-none")) {
    dropdown.classList.toggle("d-none");
  } else {
    timeOutDropDown(dropdown);
  }
 } 

 function timeOutDropDown(dropdown) {
  return setTimeout(() => {
    dropdown.classList.toggle("d-none");
  }, 1000);
 }

 function renderAssignToDropdown() {
    let dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.innerHTML = '';

    usersFromApi.forEach(user => {
      let rowClass = user.isSelected ? 'checked-row' : '';
      let checkboxImg = user.isSelected
        ? '../assets/icons/Check button checked white.svg'
        : '../assets/icons/Check button Box.svg';

        let userItem = document.createElement("div");
        userItem.classList.add("dropdown-item");
        userItem.innerHTML = getDropDownUserTemp(user, checkboxImg, rowClass);
        dropdownContent.appendChild(userItem);
    });
}

function startSearchingContacts() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let filteredUsers = usersFromApi.filter(user => user.name.toLowerCase().includes(searchInput));
    renderDropdownWithSearchResults(filteredUsers);
}

function renderDropdownWithSearchResults(filteredUsers) {
    let dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.innerHTML = ''; 
    filteredUsers.forEach(user => {
        let userItem = document.createElement("div");
        userItem.classList.add("dropdown-item");
        userItem.innerHTML = getDropDownUserFilterdTemp(user);
        dropdownContent.appendChild(userItem);
    });
}

function handleCheckboxChange(event) {
    let userEmail = event.target.getAttribute("data-user-id");
    let user = usersFromApi.find(u => u.email === userEmail);
    let userItem = event.target.closest('.user-item');
    if (!user || !userItem) return;
    user.isSelected = event.target.checked;
  
    if (event.target.checked) {
      userItem.classList.add('checked-row');
      addSelectedContact(user);
    } else {
      userItem.classList.remove('checked-row');
      removeSelectedContact(userEmail);
    }
  }

  function toggleUserSelection(userEmail) {
    let user = usersFromApi.find(u => u.email === userEmail);
    if (!user) return;
  
    user.isSelected = !user.isSelected;
    renderAssignToDropdown();
    user.isSelected ? addSelectedContact(user) : removeSelectedContact(userEmail);
  }
  
  
  
  function addSelectedContact(user) {
    let container = document.getElementById("addSelectedContacts");
    let userEmail = user.email;
    let existing = container.querySelector(`.selected-contact[data-user-id="${userEmail}"]`);
    if (!existing) {
      let selectedDiv = document.createElement("div");
      selectedDiv.classList.add("selected-contact");
      selectedDiv.setAttribute("data-user-id", userEmail);
  
      selectedDiv.innerHTML = `
        <div id = "${user.name.split(" ").join("")}" class="contact-list-initals flex-ctr-ctr initials-bg-color-${user.name.charAt(0).toUpperCase()}">
          ${returnInitials(user.name)}
        </div>
      `;
      container.appendChild(selectedDiv);
    }
  }
  
  function removeSelectedContact(userEmail) {
    let container = document.getElementById("addSelectedContacts");
    let existingDiv = container.querySelector(`.selected-contact[data-user-id="${userEmail}"]`);
    if (existingDiv) {
      existingDiv.remove();
    }
  }
  
  function selectCategory(category) {
    selectedCategory = category;
    document.getElementById("categoryDropdown").value = category;
    document.getElementById("categoryDropdownContent").classList.add("d-none");
  }

  function toggleCategoryDropdown() {
    let dropdown = document.getElementById("categoryDropdownContent");
    wrapperCategory(dropdown);
  }

 function wrapperCategory(dropdown) {
  let wrapper = document.getElementById("categoryWrapper")
  if (wrapper.classList.contains('category-wrapper-passive')) {
    wrapper.style.maxHeight = "200px";
    wrapper.classList.remove('category-wrapper-passive');
    wrapper.classList.add('category-wrapper-active');
  } else {
    wrapper.style.maxHeight = '0';
    wrapper.classList.remove('category-wrapper-active');
    wrapper.classList.add('category-wrapper-passive');
  }
  closeCategoryDropdown(dropdown);
 }


 function closeCategoryDropdown(dropdown) {
  if (dropdown.classList.contains("d-none")) {
    dropdown.classList.toggle("d-none");
  } else {
    timeOutDropDown(dropdown);
  }
 } 

 function timeOutCategoryDropDown(dropdown) {
  return setTimeout(() => {
    dropdown.classList.toggle("d-none");
  }, 1000);
 }

  function renderCategoryOptions() {
    let dropdownContent = document.getElementById("categoryDropdownContent");
    dropdownContent.innerHTML = ""; 
    
    staticCategories.forEach(category => {
      let option = document.createElement("div");
      option.classList.add("dropdown-item");
      option.innerHTML = `
        <label onclick="formDataCategory('${category}')" class="category-item">
        <div onclick="selectCategory('${category}')" class="category-itmen-names">
          <span>${category}</span>
        </div>
        </label>
      `;
      dropdownContent.appendChild(option);
    });
  }

  function changeTextColorCategory(){
    let contentRef = document.getElementById('category');
        contentRef.style.color = "black";
  }
  
function showDatePicker(){
  let hiddenDate = document.getElementById('hidden-date-input');
  hiddenDate.showPicker();
}

 function putDateToUserInput(){
    let shownDate = document.getElementById('due-date');
    let hiddenDate = document.getElementById('hidden-date-input').value;
        hiddenDate = hiddenDate.split('-').reverse().join('/');
    shownDate.value = hiddenDate;
 }

 function checkDateInput(event){
  let contentRef = document.getElementById('due-date');
    if (event.keyCode == 8 || event.keyCode == 46) {
      contentRef.value = '';
    } else {
      userInput = contentRef.value.replace(/\D/g, '');
      contentRef.value = '';
  let userDay, userMonth, userYear;
  let contentRef1 = '';


    if (userInput.length >= 2) {
      userDay = userInput.slice(0, 2);
      contentRef1 += userDay + '/';
    } else {contentRef1 += userInput};

    if (userInput.length >= 4) {
      userMonth = userInput.slice(2, 4);
      contentRef1 += userMonth + '/';
    } else {
      contentRef1 += userInput.slice(2, 3);
    }

    if (userInput.length >= 5) {
      userYear = userInput.slice(4, 8);
      contentRef1 += userYear;
    }
    contentRef.value = contentRef1;
  }
}

async function addTask(event){
event.preventDefault();
collectedFormInfos = await getEmptyTaskTemplate();
collectFormInformation('add-task-form');
collectCategory();
collectSubTasks(new FormData(document.getElementById('add-task-form')));
collectAssingTo();
await postDataToApi("tasks", collectedFormInfos);
toggleAddedToBoardButton();
setTimeout(toggleAddedToBoardButton, 3000);
setTimeout(() => {window.location.href = "../html/board.html"}, 3000);
}


function toggleAddedToBoardButton() {
  let addedToBoardREF = document.getElementById("task-added-overlay-button");
  addedToBoardREF.classList.toggle("d-none");
 
}


function collectSubTasks(data) {
  data.forEach((value, key) => {
    if (key === "subtasks[]") {
        collectedFormInfos.subtasks.push({
          "subtaskName": value,
          "finished": "false"
      });
    }
})
}


function collectAssingTo() {
  let userREF = document;
  console.log(usersFromApi[1].name);
  for (let index = 0; index < usersFromApi.length; index++) {
    if (userREF.getElementById(usersFromApi[index].name.split(" ").join("")) !== null) {
     collectedFormInfos.assignTo.push(usersFromApi[index].email)
    } 
  }
}




function formDataCategory(category) {
  savedCategory = category;
}

function collectCategory() {
  collectedFormInfos.category = savedCategory;
}

function createNewTask(event) {
  event.preventDefault();
  let title = document.getElementById('form-title').value;
  let dueDate = document.getElementById('due-date').value;
  let assignedTo = document.getElementById("addSelectedContacts");
  let category = document.getElementById('categoryDropdown').value;


  if (title === '' || dueDate === ''|| category === '') {
    event.preventDefault();  
    titleRedBorder(title);
    dateRedBorder(dueDate);
    categoryRedBorder(category);
  } else {
    titleRedBorder(title);
    dateRedBorder(dueDate);
    addTask(event);
  }
}


function titleRedBorder(title) {
  if (title == '') {
    addRedBorderAndTextFalseInputAddTask(
      "form-title",
      "title-error-message",
      "This field is required."
    );
  } else {
    removeRedBorderAndTextFalseInputAddTask("form-title", "title-error-message");
  }
}


function dateRedBorder(dueDate) {
  if (dueDate == '') {
    addRedBorderAndTextFalseInputAddTask(
      "due-date",
      "date-error-message",
      "This field is required."
    );
  } else {
    removeRedBorderAndTextFalseInputAddTask("due-date", "date-error-message");
  }
}


function categoryRedBorder(category) {
  if (category == '') {
    addRedBorderAndTextFalseInputAddTask(
      "categoryDropdown",
      "category-error-message",
      "This field is required."
    );
  } else {
    removeRedBorderAndTextFalseInputAddTask("categoryDropdown", "category-error-message");
  }
}

function addRedBorderAndTextFalseInputAddTask(borderContainer, messageContainer, errorMessage){
  const contentRef = document.getElementById(borderContainer);
  const textRef = document.getElementById(messageContainer);
        contentRef.classList.add('red-border-inputfield');
        textRef.innerText = errorMessage;
        textRef.style.color = 'red';
}

function removeRedBorderAndTextFalseInputAddTask(borderContainer, messageContainer){
  const contentRef = document.getElementById(borderContainer);
  const textRef = document.getElementById(messageContainer);
        contentRef.classList.remove('red-border-inputfield');
        textRef.innerHTML = '';
}


// NOT FINISHED YET -------------------------------------------------------------------------------------------------------------------------------
function toggleAddTaskOverlay() {
  let addtaskREF = document.getElementById("addtask-overlay");
      // addtaskREF.innerHTML = getAddTaskOverlayTemp();
  let maskREF = document.getElementById("mask-container");
  let addtaskHideREF = document.getElementById("addtask-content");
      addtaskHideREF.innerHTML = getAddTaskOverlayTemp();
  addtaskHideREF.classList.toggle("addtask-content-hide")
  maskREF.classList.toggle("d-none")
 /*  addtaskREF.classList.toggle("d-none") */
}