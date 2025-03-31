

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


function renderSubtaskTemp(subtask) {
  return `<div id="${subtask}" class="subtask-container-wrapper">
            
            <input
              id="input-${subtask}"
              class="subtask-input" 
              type="text" 
              name="subtask" 
              value="${subtask}">
            <div class="hide-on-focus subtask-dot">&#8226</div>
            <div class="single-task-icon-wrapper-before flex-ctr-ctr d-none hide-on-focus">
              <div class="single-subtask-small-icon-wrapper-right flex-ctr-ctr">
            <svg onclick="focusToSubtaskInput('input-${subtask}')" class="single-subtask-icon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
              </svg></div>
              <div class="mini-separator separator-dark"></div>
              <div class="single-subtask-small-icon-wrapper-right flex-ctr-ctr">
              <svg onmousedown="deleteSubtask('${subtask}')" class="single-subtask-icon" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
              </svg>
              </div>
            </div>
            <div class="single-task-icon-wrapper-after flex-ctr-ctr show-on-focus">
              <div class="single-subtask-small-icon-wrapper-right flex-ctr-ctr">
              <svg onmousedown="deleteSubtask('${subtask}')" class="single-subtask-icon" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
              </svg></div>
              <div class="mini-separator separator-dark"></div>
              <div class="single-subtask-small-icon-wrapper-right flex-ctr-ctr">
              <svg class="single-subtask-icon-hook" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_291235_6193" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
<rect x="0.248535" width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_291235_6193)">
<path d="M9.79923 15.15L18.2742 6.675C18.4742 6.475 18.7117 6.375 18.9867 6.375C19.2617 6.375 19.4992 6.475 19.6992 6.675C19.8992 6.875 19.9992 7.1125 19.9992 7.3875C19.9992 7.6625 19.8992 7.9 19.6992 8.1L10.4992 17.3C10.2992 17.5 10.0659 17.6 9.79923 17.6C9.53256 17.6 9.29923 17.5 9.09923 17.3L4.79923 13C4.59923 12.8 4.5034 12.5625 4.51173 12.2875C4.52006 12.0125 4.62423 11.775 4.82423 11.575C5.02423 11.375 5.26173 11.275 5.53673 11.275C5.81173 11.275 6.04923 11.375 6.24923 11.575L9.79923 15.15Z" fill="#091931"/>
</g>
</svg></div>

            </div>
           </div>`;
}


function toggleAssignedDropdown() {
    const dropdown = document.getElementById("dropdownContent");
    dropdown.classList.toggle("d-none");
    if (dropdown.classList.contains("d-none")) {
    renderDropdown();
    }
  }
function renderDropdown() {
    let dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.innerHTML = '';

    usersFromApi.forEach(user => {
      let isChecked = user.isSelected ? 'checked' : '';
      let rowClass = user.isSelected ? 'checked-row' : '';

        let userItem = document.createElement("div");
        userItem.classList.add("dropdown-item");
        userItem.innerHTML = `
            <label class="user-item ${rowClass}">
            <div class="user-itmen-names">
                <div class="contact-list-initals flex-ctr-ctr initials-bg-color-${user.name.charAt(0).toUpperCase()}">${returnInitials(user.name)}
                </div>
                <span>${user.name}</span>
                </div>
                <input type="checkbox" data-user-id="${user.email}" class="user-checkbox" onclick="handleCheckboxChange(event)" ${isChecked}>
            </label>
        `;
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
        userItem.innerHTML = `
             <label class="user-item">
            <div class="user-itmen-names">
                <div class="contact-list-initals flex-ctr-ctr initials-bg-color-${user.name.charAt(0).toUpperCase()}">${returnInitials(user.name)}
                </div>
                <span>${user.name}</span>
                </div>
                <input type="checkbox" data-user-id="${user.email}" class="user-checkbox" onclick="handleCheckboxChange(event)">
            </label>
        `;
        dropdownContent.appendChild(userItem);
    });
}

function handleCheckboxChange(event) {
    const userEmail = event.target.getAttribute("data-user-id");
    const user = usersFromApi.find(u => u.email === userEmail);
    const userItem = event.target.closest('.user-item');
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
  
  
  function addSelectedContact(user) {
    let container = document.getElementById("addSelectedContacts");
    let userEmail = user.email;
    let existing = container.querySelector(`.selected-contact[data-user-id="${userEmail}"]`);
    if (!existing) {
      const selectedDiv = document.createElement("div");
      selectedDiv.classList.add("selected-contact");
      selectedDiv.setAttribute("data-user-id", userEmail);
  
      selectedDiv.innerHTML = `
        <div class="contact-list-initals flex-ctr-ctr initials-bg-color-${user.name.charAt(0).toUpperCase()}">
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
  


function getDate(){
  let inputRef = document.getElementById('due-date');
  const newDate = new Date();
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  inputRef.value = day + '/' + month + '/' + year;
}