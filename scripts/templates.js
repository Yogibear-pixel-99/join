/**
 * Creates a template for the add subtask function in add task menu.
 * 
 * @param {string} subtask - The title of the subtask.
 * @returns - Returns the subtask in the add task form.
 */
function renderSubtaskTemp(subtask){
  return `<div id="${subtask}" class="subtask-container-wrapper">
              <input
                onblur="deleteSubtaskIfEmpty(this, '${subtask}')"
                id="input-${subtask}"
                class="subtask-input" 
                type="text" 
                name="subtasks[]" 
                value="${subtask}">
              <div class="hide-on-focus subtask-dot">&#8226</div>
              <div class="single-task-icon-wrapper-before flex-ctr-ctr d-none hide-on-focus">
                <div class="single-subtask-small-icon-wrapper-right flex-ctr-ctr">
                    <svg onclick="focusToSubtaskInput('input-${subtask}')" class="single-subtask-icon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                    </svg>
                </div>
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
                    </svg>
                </div>
                <div class="mini-separator separator-dark"></div>
                <div class="single-subtask-small-icon-wrapper-right flex-ctr-ctr">
                    <svg class="single-subtask-icon-hook" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_291235_6193" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24"><rect x="0.248535" width="24" height="24" fill="#D9D9D9"/></mask><g mask="url(#mask0_291235_6193)">
                        <path d="M9.79923 15.15L18.2742 6.675C18.4742 6.475 18.7117 6.375 18.9867 6.375C19.2617 6.375 19.4992 6.475 19.6992 6.675C19.8992 6.875 19.9992 7.1125 19.9992 7.3875C19.9992 7.6625 19.8992 7.9 19.6992 8.1L10.4992 17.3C10.2992 17.5 10.0659 17.6 9.79923 17.6C9.53256 17.6 9.29923 17.5 9.09923 17.3L4.79923 13C4.59923 12.8 4.5034 12.5625 4.51173 12.2875C4.52006 12.0125 4.62423 11.775 4.82423 11.575C5.02423 11.375 5.26173 11.275 5.53673 11.275C5.81173 11.275 6.04923 11.375 6.24923 11.575L9.79923 15.15Z" fill="#091931"/></g>
                    </svg>
                </div>
              </div>
             </div>`;
}


/**
 * Creates an empty template and gets the next free id number from the database.
 * 
 * @returns - Returns the empty task template to create a new task.
 */
async function getEmptyTaskTemplate(){
  return {
    status: `${addTaskStatus}`,
    category: "",
    title: "",
    description: "",
    date: "",
    priority: "",
    assignTo: [],
    subtasks: []
  };
}


/**
 * Creates the single task cards shown in the board menu.
 * 
 * @param {Object} task - The task object from the database.
 * @param {HTMLElement} assignedHTML - A initials template to see who is assigned to the task.
 * @param {HTMLElement} priorityHTML - A selected priority image template.
 * @param {integer} allSubTasksNr - All subtasks in thise task.
 * @param {integer} doneSubTasksNr - All finished subtask in this task.
 * @returns - Returns the created single task card shown in board menu.
 */
function getSingleTaskCardForBoardTemp(task, assignedHTML, priorityHTML, allSubTasksNr, doneSubTasksNr){
  return `<div class="task-card" 
              id="task-${task.title.replace(/\s+/g, "-")}" 
              onclick="noClose(event); openTask('${task.apiKey}')" 
              draggable="true" 
              data-status="${task.status}">
                <div class= "task-type-wrapper">
                  <span class="task-type task-color-${task.category.charAt(0).toUpperCase()}">${task.category}</span>
                  <div onclick="noClose(event); dragAndDropDropdown('${task.apiKey}', '${task.status}'); closeDropDownTasks('${task.apiKey}')" id="task-${task.apiKey}" class= "dropdown-tasks-content"> 
                  <svg class="drag-and-drop-mobile" width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.75" y="25.25" width="24.5" height="22.5" rx="5.25" transform="rotate(-90 0.75 25.25)" stroke="#2A3647" stroke-width="1.5"/>
                  <mask id="mask0_294678_9763" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="3" width="20" height="20">
                  <rect x="2" y="23" width="20" height="20" transform="rotate(-90 2 23)" fill="#D9D9D9"/>
                  </mask>
                  <g mask="url(#mask0_294678_9763)">
                  <path d="M15.3333 18.1457L16.8958 16.5832C17.0486 16.4304 17.2396 16.354 17.4688 16.354C17.6979 16.354 17.8958 16.4304 18.0625 16.5832C18.2292 16.7498 18.3125 16.9478 18.3125 17.1769C18.3125 17.4061 18.2292 17.604 18.0625 17.7707L15.0833 20.7498C15 20.8332 14.9097 20.8922 14.8125 20.9269C14.7153 20.9616 14.6111 20.979 14.5 20.979C14.3889 20.979 14.2847 20.9616 14.1875 20.9269C14.0903 20.8922 14 20.8332 13.9167 20.7498L10.9167 17.7498C10.75 17.5832 10.6701 17.3887 10.6771 17.1665C10.684 16.9443 10.7708 16.7498 10.9375 16.5832C11.1042 16.4304 11.2986 16.3505 11.5208 16.3436C11.7431 16.3366 11.9375 16.4165 12.1042 16.5832L13.6667 18.1457V12.9998C13.6667 12.7637 13.7465 12.5658 13.9062 12.4061C14.066 12.2464 14.2639 12.1665 14.5 12.1665C14.7361 12.1665 14.934 12.2464 15.0938 12.4061C15.2535 12.5658 15.3333 12.7637 15.3333 12.9998V18.1457ZM10.3333 7.854V12.9998C10.3333 13.2359 10.2535 13.4339 10.0938 13.5936C9.93403 13.7533 9.73611 13.8332 9.5 13.8332C9.26389 13.8332 9.06597 13.7533 8.90625 13.5936C8.74653 13.4339 8.66667 13.2359 8.66667 12.9998V7.854L7.10417 9.4165C6.95139 9.56928 6.76042 9.64567 6.53125 9.64567C6.30208 9.64567 6.10417 9.56928 5.9375 9.4165C5.77083 9.24984 5.6875 9.05192 5.6875 8.82275C5.6875 8.59359 5.77083 8.39567 5.9375 8.229L8.91667 5.24984C9 5.1665 9.09028 5.10748 9.1875 5.07275C9.28472 5.03803 9.38889 5.02067 9.5 5.02067C9.61111 5.02067 9.71528 5.03803 9.8125 5.07275C9.90972 5.10748 10 5.1665 10.0833 5.24984L13.0833 8.24984C13.25 8.4165 13.3299 8.61095 13.3229 8.83317C13.316 9.05539 13.2292 9.24984 13.0625 9.4165C12.8958 9.56928 12.7014 9.64914 12.4792 9.65609C12.2569 9.66303 12.0625 9.58317 11.8958 9.4165L10.3333 7.854Z" fill="#2A3647"/>
                  </g>
                  </svg>
                  <div class="dropdown-tasks-menu d-none" id="dropdown-${task.apiKey}">
                   <div class="header-dropdown-link-mobile">
                   <div class="dropdown-text">Move to</div>
                   </div>
                    <div onclick="noClose(event); changeStatusMobile('todo', '${task.apiKey}')" id="tasks-todo-${task.apiKey}" class="">
                   <div class="dropdown-tasks-text">To-Do</div>
                   </div>
                   <div onclick="noClose(event); changeStatusMobile('inprogress', '${task.apiKey}')" id="tasks-inprogress-${task.apiKey}" class="">
                   <div class="dropdown-tasks-text">In progress</div>
                   </div>
                   <div onclick="noClose(event); changeStatusMobile('awaitfeedback', '${task.apiKey}')" id="tasks-awaitfeedback-${task.apiKey}" class="">
                   <div class="dropdown-tasks-text">Await feedback</div>
                   </div>
                    <div onclick="noClose(event); changeStatusMobile('done', '${task.apiKey}')" id="tasks-done-${task.apiKey}" class="">
                   <div class="dropdown-tasks-text">Done</div>
                   </div>
                   </div>
                  </div>
                  </div>
                  <div class="task-title-description-wrapper">
                    <div class="task-title" id="titleTask${task.apiKey}">${task.title}</div>
                    <div class="task-description" id="titleDescription${task.apiKey}">${task.description}</div>
                  </div>
                    ${allSubTasksNr != "" ? getFilledSubtaskTemp(allSubTasksNr, doneSubTasksNr) : '<div class="d-none"></div>'}

                <div class="task-meta-assignend-user-container flex-ctr-spbtw"> 
                    <div class="task-meta">${priorityHTML}</div>
                    <div class="init-board-assigned">${assignedHTML}</div>
                </div>
          </div>`;
}


/**
 * Creates a subtask template for every single task shown in the board menu.
 * 
 * @param {integer} allSubTasksNr - All subtasks in thise task.
 * @param {integer} doneSubTasksNr - All finished subtask in this task.
 * @returns - Returns the width value to adjust the progress bar shown in every single task in board menu.
 */
function getFilledSubtaskTemp(allSubTasksNr, doneSubTasksNr){
  return `<div class="task-subtask-info">
        <div class="subtask-progressbar">
          <div class="subtask-progress" style="width: ${
            (100 / allSubTasksNr) * doneSubTasksNr}%"></div>
        </div>
        <span class="subtask-count">${doneSubTasksNr}/${allSubTasksNr} Subtasks</span>
      </div>`;
}


/**
 * Creates a user template for the dropdown menu in add task - task assign to.
 * 
 * @param {Object} user - The single user object from the database.
 * @param {string} checkboxImg - The source of the checkbox image.
 * @param {string} rowClass - If user is checked, adds a class to visualize the checked user.
 * @returns - Returns the rendered user in the dropdwon menu including initials.
 */
function getDropDownUserTemp(user, checkboxImg, rowClass){
    return `<label onclick="toggleUserSelection('${user.email}')" class="user-item ${rowClass}">
                <div class="user-itmen-names">
                    <div class="contact-list-initals flex-ctr-ctr initials-bg-color-${user.name.charAt(0).toUpperCase()}">${returnInitials(user.name)}
                    </div>
                    <span>${user.name}</span>
                </div>
                <img
                  src="${checkboxImg}"
                  class="checkbox-img"
                  data-user-id="${user.email}"
                  alt="checkbox" />
            </label>
        `;
}


/**
 * Creates a filtered user template in add task, assign to.
 * 
 * @param {Object} user 
 * @returns - Returns the filterd user template.
 */
function getDropDownUserFilterdTemp(user, checkboxImg, rowClass){
    return `
             <label onclick="toggleSearchedUserSelection('${user.email}')" class="user-item ${rowClass}">
            <div class="user-itmen-names">
                <div class="contact-list-initals flex-ctr-ctr initials-bg-color-${user.name.charAt(0).toUpperCase()}">${returnInitials(user.name)}
                </div>
                <span>${user.name}</span>
                </div>
                <img
                  src="${checkboxImg}"
                  class="checkbox-img"
                  data-user-id="${user.email}"
                  alt="checkbox" />
            </label>
        `;
}


/**
 * Creates the alphabetical sorted first letter header for 
 * the all contacts menu and calls a function who gets every single 
 * contact with first letter of the header letter.
 * 
 * @param {string} firstLetterHeader - The header letter for sorting all contacts alphabetical.
 * @returns - Returns the a container with a header letter and all contacts matching that header letter by name (first letter).
 */
function firstLetterContainerTemp(firstLetterHeader){
    return `<div class="contacts-first-letter">
                <span>${firstLetterHeader}</span>
            </div>
            <div class="contacts-separator"></div>
            <div>${getSingleContact(firstLetterHeader)}</div>`
}


/**
 * Creates the template for every single contact in the contact list.
 * 
 * @param {Object} contact - The single contact object from the database.
 * @param {string} firstLetter - The first letter to add a speciefid css class and a parameter for the floating contact menu to add a specified class.
 * @returns - Returns the renderd single contact for the contact list.
 */
function getSingleContactTemp(contact, firstLetter){
    return `<div class="single-contact" id="contact-${contact.id}" onclick="openContactInFloatMenu('${contact.id}', '${firstLetter}')">
                <div class="contact-list-initals flex-ctr-ctr initials-bg-color-${firstLetter}">${returnInitials(contact.name).slice(0, 3)}</div>
                <div class="flex-col flex1">
                    <span class="contact-name">${contact.name}</span>
                    <span class="contact-email">${contact.email}</span>
                </div>
            </div>`
}


/**
 * Creates the template for the contact in the floating menu after click on a single contact in the contact list.
 * 
 * @param {Object} contact - The contact object from the database.
 * @param {string} colorLetter - A letter to specifie a css class with a background color.
 * @returns - Returns the whole contact including functions to edit and delete in the floating contact menu.
 */
function getSingleContactForFloatingMenuTemp(contact, colorLetter){
        return `<div class="floating-single-contact">                 
                    <div class="floating-contact-header">
                        <div class="floating-initials-wrapper initials-bg-color-${colorLetter}">
                            <span" class="floating-initials">${returnInitials(contact.name).slice(0, 2)}</span>
                        </div>
                        <div class="floating-name-wrapper">
                            <div class="floating-full-name">${contact.name}</div>

                            <div class="floating-edit-delete-wrapper">
                                <div class="floating-edit-wrapper" onclick="openEditContact('${contact.apiKey}')">
                                    <div>
                                        <svg class="floating-edit-icon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                                        </svg>
                                    </div>
                                    <div>Edit</div>
                                </div>
                                <div class="floating-delete-wrapper" onclick="deleteContact('${contact.apiKey}')">
                                    <div>
                                        <svg class="floating-delete-icon" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
                                        </svg>
                                    </div>
                                    <div>Delete</div>
                                </div>
                            </div>
                                 <section class="mobile-mask-overlay d-none" id="mobile-mask-overlay-edit-delete-menu"></section>
                        </div>
                    </div>
                        <div class="contact-info">Contact Information</div>
                        <div class="floating-mail-phone-wrapper">
                            <div class="floating-mail-phone">
                                <div class="floating-mail-phone-header">Email</div>
                                <a href="mailto" class="color-blue-mail">${contact.email}</a>
                            </div> 
                            <div class="floating-mail-phone">
                                <div class="floating-mail-phone-header">Phone</div>
                                <div>${contact.phone}</div>
                                <div class="dark-button contact-created-button d-none" id="contact-created-button">Contact succesfully created</div>
                            </div>
                        </div>
                    </div>
                </div>`
    }


/**
 * Creates template for the mobile edit and delete minimenu sliding 
 * in after click on options in the floating contact menu.
 * 
 * @param {Object} contact - The contact object from the database to get the needed api key for the edit and delete function.
 * @returns - Returns the minimenu including the functions to delete/edit the selected contact.
 */
    function getEditDeleteMobileMenuTemp(contact){
        return `<div class="floating-edit-wrapper-mobile" onclick="openEditContact('${contact.apiKey}'); toggleEditDeleteContactMenuMobile()">
                    <div>
                        <svg class="floating-edit-icon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                        </svg>
                    </div>
                    <div>Edit</div>
                </div>
                <div class="floating-delete-wrapper-mobile" onclick="deleteContact('${contact.apiKey}'); toggleEditDeleteContactMenuMobile(); switchFloatingContactAndContactsInMobile()">
                    <div>
                        <svg class="floating-delete-icon" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
                        </svg>
                    </div>
                    <div>Delete</div>
                </div>`
    }

/**
 * Creates a template for the whole summary menu.
 * 
 * @param {string} name - The name of the logged user. If no user logged in, it is guest.
 * @param {string} greetingText - The greeting text, depends on the actual time.
 * @param {integer} toDo - Task who are in the todo sub menu in the board menu.
 * @param {integer} done - Tasks who are in the done sub menu in the board menu.
 * @param {integer} inProgress - Tasks who are in the in progress sub menu in the board menu.
 * @param {integer} awaitFeedback - Tasks who are in the await feedback sub menu in the board menu.
 * @param {integer} urgent - Tasks who has the priority urgent in the board menu.
 * @param {HTMLElement} closestDate - Returns a template with the closest due date from all tasks in the database.
 * @returns - Returns the complete summary with all information to the html site.
 */
function summaryTemplate(name, greetingText, toDo, done, inProgress, awaitFeedback, urgent, closestDate){
    return `<header class="header-container">
                <span class="header-text">Kanban Project Management Tool</span>
                <svg class="header-logo-mobile" width="32" height="39" viewBox="0 0 101 122" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="join-logo-color-change" d="M71.6721 0H49.5143V25.4923H71.6721V0Z" fill="#2A3647"/><path class="join-logo-color-change" d="M49.5142 46.2251H71.6721V82.1779C71.7733 90.8292 69.3112 99.3153 64.5986 106.557C59.9455 113.594 50.963 121.966 34.3446 121.966C16.2434 121.966 5.69286 113.406 0 108.715L13.9765 91.4743C19.533 96.0112 24.885 99.7435 34.4299 99.7435C41.6567 99.7435 44.5372 96.7988 46.2247 94.2307C48.5186 90.6637 49.7052 86.4923 49.6335 82.2464L49.5142 46.2251Z" fill="#2A3647"/><path d="M38.2137 30.1318H16.0559V52.3884H38.2137V30.1318Z" fill="#29ABE2"/><path class="join-logo-color-change" d="M83.2793 111.522C83.2793 116.265 80.8761 118.815 77.5183 118.815C74.1605 118.815 71.9618 115.785 71.9618 111.762C71.9618 107.739 74.2287 104.554 77.7058 104.554C81.1829 104.554 83.2793 107.687 83.2793 111.522ZM74.5355 111.711C74.5355 114.57 75.6775 116.675 77.6376 116.675C79.5977 116.675 80.7056 114.45 80.7056 111.539C80.7056 108.988 79.6829 106.592 77.6376 106.592C75.5923 106.592 74.5355 108.903 74.5355 111.711Z" fill="#2A3647"/><path class="join-logo-color-change" d="M87.6768 104.76V118.593H85.2224V104.76H87.6768Z" fill="#2A3647"/><path class="join-logo-color-change" d="M90.3358 118.593V104.76H93.0629L95.9946 110.461C96.7493 111.952 97.4207 113.483 98.0058 115.049C97.8524 113.337 97.7843 111.368 97.7843 109.177V104.76H100.034V118.593H97.4945L94.5288 112.772C93.7436 111.243 93.0437 109.671 92.4323 108.064C92.4323 109.776 92.5516 111.711 92.5516 114.09V118.576L90.3358 118.593Z" fill="#2A3647"/></svg>
                <div class="header-logos-right">
                    <a href="../html/help.html">
                        <img class="help-logo" src="../assets/icons/help.svg" alt="helplogo"/>
                    </a>
                    <div onclick="toggleHeaderDropdownMenu(); noClose(event)" class="header-initials">${returnInitials(name).slice(0, 2)}</div>
                </div>
            </header>
      <div class="dropdown-menu d-none" id="dropdown">
        <a href="./help.html" class="header-dropdown-link-mobile">
          <div class="dropdown-text">Help</div>
        </a>
        <a href="./legalnotice.html">
          <div class="dropdown-text">Legal Notice</div>
        </a>
        <a href="./Privacypolicy.html">
          <div class="dropdown-text">Privacy Policy</div>
        </a>
        <a href="./index.html" onclick="removeUserFromLocalStorage()">
          <div class="dropdown-text">Log out</div>
        </a>
      </div>
            <div id="main-content" class="main-content-summary">
                <div class="main-content-header-summary main-content-header-summary-mobile">
                    <h1 class="header-contacts-floatin-mobile header-summary">Join 360</h1>
                    <div class="line line-summary line-summary-desktop"></div>
                    <span class="contacts-text">Better with a team</span>
                    <div class="line line-summary line-summary-mobile"></div>
                </div>
                <div class="bottom-summary">
                    <div class="summary-wrapper">
                        <div class="bottom-top-summary">
                            <div onclick="directToBoard()" class="to-do-summary">
                                <svg width="69" height="70" viewBox="0 0 69 70" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="to-do-circle-summary" cx="34.5" cy="35" r="34.5" fill="#2B3647" /><mask id="mask0_290159_6053" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="18" y="19" width="33" height="32"><rect x="18.5" y="19" width="32" height="32" fill="#D9D9D9" /></mask><g mask="url(#mask0_290159_6053)"><path class="to-do-path-summary" d="M25.1667 44.3332H27.0333L38.5333 32.8332L36.6667 30.9665L25.1667 42.4665V44.3332ZM44.2333 30.8998L38.5667 25.2998L40.4333 23.4332C40.9444 22.9221 41.5722 22.6665 42.3167 22.6665C43.0611 22.6665 43.6889 22.9221 44.2 23.4332L46.0667 25.2998C46.5778 25.8109 46.8444 26.4276 46.8667 27.1498C46.8889 27.8721 46.6444 28.4887 46.1333 28.9998L44.2333 30.8998ZM42.3 32.8665L28.1667 46.9998H22.5V41.3332L36.6333 27.1998L42.3 32.8665Z"fill="white"/></g></svg>
                                <div class="content-summary">
                                    <h2 class="quantity-summary">${toDo}</h2>
                                    <div class="text-summary">To-do</div>
                                </div>
                            </div>
                            <div onclick="directToBoard()" class="done-summary">
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="done-circle-summary" cx="35" cy="35" r="34.5" fill="#2A3647"/><path class="done-path-summary" d="M20.0283 35.0001L31.2571 46.0662L49.9717 23.9341"stroke="white"stroke-linecap="round" stroke-width="6px" stroke-linejoin="round"/></svg>
              <div class="content-summary">
                <h2 class="quantity-summary">${done}</h2>
                <div class="text-summary">Done</div>
              </div>
            </div>
          </div>
          <div class="bottom-middle-summary">
            <div onclick="directToBoard()" class="urgent-summary">
              <div class="urgent-left-summary">
                <img src="../assets/icons/urgent.svg" alt="" />
                <div class="content-summary">
                  <h2 class="quantity-summary">${urgent}</h2>
                  <div class="text-summary">Urgent</div>
                </div>
              </div>
              <div class="urgent-line-summary"></div>
              <div class="content-summary">
                <div class="date-summary">${closestDate}</div>
                <div class="deadline-summary">Upcomming Deadline</div>
              </div>
            </div>
          </div>
          <div class="bottom-end-summary">
                <div onclick="directToBoard()" class="bottom-end-left-box-summary">
                    <div class="content-summary">
                    <h2 class="end-quantity-summary">${tasksFromApi.length}</h2>
                    <div class="end-text-summary">Tasks in Board</div>
                </div>
            </div>
            <div onclick="directToBoard()" class="bottom-end-middle-box-summary">
                <div class="content-summary">
                    <h2 class="end-quantity-summary">${inProgress}</h2>
                    <div class="end-text-summary">Tasks in Progress</div>
                </div>
            </div>
            <div onclick="directToBoard()" class="bottom-end-right-box-summary">
                <div class="content-summary">
                    <h2 class="end-quantity-summary">${awaitFeedback}</h2>
                    <div class="end-text-summary">Awaiting Feedback</div>
                </div>
            </div>
        </div>
            </div>
                <div class="welcome-summary">
                    <h2 class="welcome-text-summary">${greetingText},</h2>
                    <div class="welcome-name-summary">${name}</div>
                </div>
            </div>
      </div>
    <section class="greeting-overlay d-none" id="summary-greeting-overlay-guest">
        <div class="greeting-text" id="summary-greeting-text-overlay-guest">Good Morning</div>
    </section>
    <section class="greeting-overlay d-none" id="summary-greeting-overlay-user">
        <div class="greeting-text" id="summary-greeting-name-overlay-user">Good Morning,</div>
        <div class="greeting-name" id="summary-greeting-text-overlay-user">${name}</div>
    </section>
          <section class="mobile-navbar">
        <a class="mobile-link-navbar mobile-active" href="../html/summary.html" class="mobile-navbar-logo-text-wrapper"><img src="../assets/icons/summary.svg" alt="Summary link icon"><div>Summary</div></a>
        <a class="mobile-link-navbar" href="../html/board.html" class="mobile-navbar-logo-text-wrapper"><img src="../assets/icons/board.svg" alt="Board link icon"><div>Board</div></a>
        <a class="mobile-link-navbar" href="../html/addtask.html" class="mobile-navbar-logo-text-wrapper"><img src="../assets/icons/addTask.svg" alt="Addtasks link icon"><div>Add Task</div></a>
        <a class="mobile-link-navbar" href="../html/contacts.html" class="mobile-navbar-logo-text-wrapper"><img src="../assets/icons/contacts.svg" alt="Contacts link icon"><div>Contacts</div></a>
    </section>`
}