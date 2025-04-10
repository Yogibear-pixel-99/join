/**
 * Creates a template for the add subtask function in add task menu.
 * 
 * @param {string} subtask - The title of the subtask.
 * @returns - Returns the subtask in the add task form.
 */
function renderSubtaskTemp(subtask) {
  return `<div id="${subtask}" class="subtask-container-wrapper">
              <input
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
async function getEmptyTaskTemplate() {
  return {
    status: "todo",
    category: "",
    title: "",
    description: "",
    date: "",
    priority: "",
    assignTo: [],
    subtasks: [],
    id: `${await getTheNextFreeIdNumberFromApi("tasks")}`,
  };
}


/**
 * Creates the single task cards shown in the board menu.
 * 
 * @param {object} task - The task object from the database.
 * @param {HTMLElement} assignedHTML - The initials to see who is assigned to the task.
 * @param {HTMLElement} priorityHTML - The selected priority image.
 * @param {integer} allSubTasksNr - All subtasks in thise task.
 * @param {integer} doneSubTasksNr - All finished subtask in this task.
 * @returns - Returns the created single task card shown in board menu.
 */
function getSingleTaskCardForBoardTemp(task, assignedHTML, priorityHTML, allSubTasksNr, doneSubTasksNr) {
  return `<div class="task-card" 
              id="task-${task.title.replace(/\s+/g, "-")}" 
              onclick="openTask('${task.id}')" 
              draggable="true" 
              data-status="${task.status}">
                  <span class="task-type task-color-${task.category.charAt(0).toUpperCase()}">${task.category}</span>
                  <div class="task-title-description-wrapper">
                    <div class="task-title" id="titleTask${task.id}">${task.title}</div>
                    <div class="task-description" id="titleDescription${task.id}">${task.description}</div>
                  </div>
                    ${allSubTasksNr != "" ? getFilledSubtaskTemp(allSubTasksNr, doneSubTasksNr) : '<div class="d-none"></div>'}
                <div class="task-meta-assignend-user-container"> 
                <div class="task-meta">${priorityHTML}</div>
                ${assignedHTML}
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
function getFilledSubtaskTemp(allSubTasksNr, doneSubTasksNr) {
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
 * @param {object} user - The single user object from the database.
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
 * @param {object} user 
 * @returns - Returns the filterd user template.
 */
function getDropDownUserFilterdTemp(user){
    return `
             <label class="user-item">
            <div class="user-itmen-names">
                <div class="contact-list-initals flex-ctr-ctr initials-bg-color-${user.name.charAt(0).toUpperCase()}">${returnInitials(user.name)}
                </div>
                <span>${user.name}</span>
                </div>
                <input type="checkbox" data-user-id="${user.email}" class="user-checkbox" onclick="handleCheckboxChange(event)">
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
 * @param {object} contact - The single contact object from the database.
 * @param {string} firstLetter - The first letter to add a speciefid css class and a parameter for the floating contact menu to add a specified class.
 * @returns - Returns the renderd single contact for the contact list.
 */
function getSingleContactTemp(contact, firstLetter){
    return `<div class="single-contact" id="contact-${contact.id}" onclick="openContactInFloatMenu('${contact.id}', '${firstLetter}')">
                <div class="contact-list-initals flex-ctr-ctr initials-bg-color-${firstLetter}">${contact.initials.slice(0, 3)}</div>
                <div class="flex-col flex1">
                    <span class="contact-name">${contact.name}</span>
                    <span class="contact-email">${contact.email}</span>
                </div>
            </div>`
}


/**
 * Creates the template for the contact in the floating menu after click on a single contact in the contact list.
 * 
 * @param {object} contact - The contact object from the database.
 * @param {string} colorLetter - A letter to specifie a css class with a background color.
 * @returns - Returns the whole contact including functions to edit and delete in the floating contact menu.
 */
function getSingleContactForFloatingMenuTemp(contact, colorLetter){
        return `<div class="floating-single-contact">                 
                    <div class="floating-contact-header">
                        <div class="floating-initials-wrapper initials-bg-color-${colorLetter}">
                            <span" class="floating-initials">${contact.initials.slice(0, 3)}</span>
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
                                <div class="dark-button contact-created-button" id="contact-created-button">Contact succesfully created</div>
                            </div>
                        </div>
                    </div>
                </div>`
    }


/**
 * Creates template for the mobile edit and delete minimenu sliding 
 * in after click on options in the floating contact menu.
 * 
 * @param {object} contact - The contact object from the database to get the needed api key for the edit and delete function.
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
 * Creats a template for the task overlay, if click on a single task in board menu.
 * 
 * @param {object} task - The task object with the needed information from the database.
 * @returns - Returns the task to the overlay menu including edit and delete onclick function.
 */
async function getTaskOverlayTemp(task){
    return `<header class="flex-ctr-spbtw overlay-header-wrapper">
                <div class="overlay-task-header-text task-color-${task.category.charAt(0)}">${task.category}</div>
                <div class="close-icon-wrapper flex-ctr-ctr" onclick="toggleOverlayMenu('task-overlay-menu', 'task-overlay-mask-container')">
                    <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.00005 8.40005L2.10005 13.3C1.91672 13.4834 1.68338 13.575 1.40005 13.575C1.11672 13.575 0.883382 13.4834 0.700049 13.3C0.516715 13.1167 0.425049 12.8834 0.425049 12.6C0.425049 12.3167 0.516715 12.0834 0.700049 11.9L5.60005 7.00005L0.700049 2.10005C0.516715 1.91672 0.425049 1.68338 0.425049 1.40005C0.425049 1.11672 0.516715 0.883382 0.700049 0.700049C0.883382 0.516715 1.11672 0.425049 1.40005 0.425049C1.68338 0.425049 1.91672 0.516715 2.10005 0.700049L7.00005 5.60005L11.9 0.700049C12.0834 0.516715 12.3167 0.425049 12.6 0.425049C12.8834 0.425049 13.1167 0.516715 13.3 0.700049C13.4834 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4834 1.91672 13.3 2.10005L8.40005 7.00005L13.3 11.9C13.4834 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4834 13.1167 13.3 13.3C13.1167 13.4834 12.8834 13.575 12.6 13.575C12.3167 13.575 12.0834 13.4834 11.9 13.3L7.00005 8.40005Z" fill="#2A3647"/>
                    </svg>
                </div>
            </header>
            <h1>${task.title}</h1>
            <section class="overlay-task-body">
                <div class="font16-weight400-768px">${task.description}</div>
                <div>
                    <span class="overlay-task-body-left">Due date:</span>
                    <span>${task.date}</span>
                </div>
                <div>
                    <span class="overlay-task-body-left">Priority:</span>
                    <span>${task.priority}
                        <img src="../assets/icons/${getPriorityIconForTaskOverlay(task)}"
                    </span>
                </div>
                <span>Assigned To:</span>
                    <div class="assigned-users-wrapper">
                        ${await getTaskAssignedUsers(task)}
                    </div>
                    <div class="subtasks-overlay-wrapper">
                        <span>Subtasks</span>
                        ${await getSubtasksForTaskOverlay(task)}
                    <div class="task-overlay-footer-buttons">
                            <div class="task-overlay-button-wrapper" onclick="overlayEditTask('${task.id}')">
                                    <svg class="floating-edit-icon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                                    </svg>
                                <div>Edit</div>
                            </div>
                            <div class="task-overlay-button-separator"></div>
                            <div class="task-overlay-button-wrapper" onclick="overlayDeleteTask('${task.apiKey}')">
                                    <svg class="floating-delete-icon" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
                                    </svg>
                                <div>Delete</div>
                            </div>
                    </div>
            </section>`
}


/**
 * Creates a template to see which user is assigned to the task in the task overlay menu.
 * 
 * @param {string} name - The assigned user name.
 * @param {string} initials - The assigned initials of the user.
 * @returns - Returns a container with the name and the initials of the assigned user.
 */
function getAssignedUserTaskOverlayTemp(name, initials){
    return `<span class="task-user-wrapper">
                    <span class="task-overlay-initials flex-ctr-ctr initials-bg-color-${name.charAt(0)}">${initials}</span>
                    <span class="assigned-user-task-overlay">${name}</span>
            </span>`
}


/**
 * Creates a template for all subtasks in the selected task overlay menu.
 * 
 * @param {object} task - The task object from the database.
 * @param {object} subtask - The subtask from the task in the object from the database.
 * @returns 
 */
function getSubtaskForTaskOverlayTemp(task, subtask){
    return `<label>
                <input 
                    id="subtask-${subtask.apiKey}"
                    onclick="changeSubTaskCheckedApi('tasks/${task.apiKey}/subtasks/${subtask.apiKey}', 'subtask-${subtask.apiKey}')" 
                    type="checkbox" ${checkIfSubtaskIsDone(subtask)}>
                <span>${subtask.subtaskName}</span>
            </label>
            `
}


// NEEDED AFTER CREATING OVERLAY --> AFTER ADD TASK WORKING
// function getEditTaskTemp(task){
//     return `<div class="flex-end">
//                 <div class="close-icon-wrapper flex-ctr-ctr" onclick="toggleOverlayMenu('task-overlay-menu', 'task-overlay-mask-container')">
//                     <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M7.00005 8.40005L2.10005 13.3C1.91672 13.4834 1.68338 13.575 1.40005 13.575C1.11672 13.575 0.883382 13.4834 0.700049 13.3C0.516715 13.1167 0.425049 12.8834 0.425049 12.6C0.425049 12.3167 0.516715 12.0834 0.700049 11.9L5.60005 7.00005L0.700049 2.10005C0.516715 1.91672 0.425049 1.68338 0.425049 1.40005C0.425049 1.11672 0.516715 0.883382 0.700049 0.700049C0.883382 0.516715 1.11672 0.425049 1.40005 0.425049C1.68338 0.425049 1.91672 0.516715 2.10005 0.700049L7.00005 5.60005L11.9 0.700049C12.0834 0.516715 12.3167 0.425049 12.6 0.425049C12.8834 0.425049 13.1167 0.516715 13.3 0.700049C13.4834 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4834 1.91672 13.3 2.10005L8.40005 7.00005L13.3 11.9C13.4834 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4834 13.1167 13.3 13.3C13.1167 13.4834 12.8834 13.575 12.6 13.575C12.3167 13.575 12.0834 13.4834 11.9 13.3L7.00005 8.40005Z" fill="#2A3647"/>
//                     </svg>
//                 </div>
//             </div>`
// }


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
function summaryTemplate(name, greetingText, toDo, done, inProgress, awaitFeedback, urgent, closestDate) {
    return `<header class="header-container">
                <span class="header-text">Kanban Project Management Tool</span>
                <svg class="header-logo-mobile" width="32" height="39" viewBox="0 0 101 122" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="join-logo-color-change" d="M71.6721 0H49.5143V25.4923H71.6721V0Z" fill="#2A3647"/><path class="join-logo-color-change" d="M49.5142 46.2251H71.6721V82.1779C71.7733 90.8292 69.3112 99.3153 64.5986 106.557C59.9455 113.594 50.963 121.966 34.3446 121.966C16.2434 121.966 5.69286 113.406 0 108.715L13.9765 91.4743C19.533 96.0112 24.885 99.7435 34.4299 99.7435C41.6567 99.7435 44.5372 96.7988 46.2247 94.2307C48.5186 90.6637 49.7052 86.4923 49.6335 82.2464L49.5142 46.2251Z" fill="#2A3647"/><path d="M38.2137 30.1318H16.0559V52.3884H38.2137V30.1318Z" fill="#29ABE2"/><path class="join-logo-color-change" d="M83.2793 111.522C83.2793 116.265 80.8761 118.815 77.5183 118.815C74.1605 118.815 71.9618 115.785 71.9618 111.762C71.9618 107.739 74.2287 104.554 77.7058 104.554C81.1829 104.554 83.2793 107.687 83.2793 111.522ZM74.5355 111.711C74.5355 114.57 75.6775 116.675 77.6376 116.675C79.5977 116.675 80.7056 114.45 80.7056 111.539C80.7056 108.988 79.6829 106.592 77.6376 106.592C75.5923 106.592 74.5355 108.903 74.5355 111.711Z" fill="#2A3647"/><path class="join-logo-color-change" d="M87.6768 104.76V118.593H85.2224V104.76H87.6768Z" fill="#2A3647"/><path class="join-logo-color-change" d="M90.3358 118.593V104.76H93.0629L95.9946 110.461C96.7493 111.952 97.4207 113.483 98.0058 115.049C97.8524 113.337 97.7843 111.368 97.7843 109.177V104.76H100.034V118.593H97.4945L94.5288 112.772C93.7436 111.243 93.0437 109.671 92.4323 108.064C92.4323 109.776 92.5516 111.711 92.5516 114.09V118.576L90.3358 118.593Z" fill="#2A3647"/></svg>
                <div class="header-logos-right">
                    <a href="../html/help.html">
                        <img class="help-logo" src="../assets/icons/help.svg" alt="helplogo"/>
                    </a>
                    <div onclick="toggleDropdown()" class="header-initials">${returnInitials(name).slice(0, 2)}</div>
                </div>
            </header>
            <div class="dropdown-menu d-none" id="dropdown">
                <a href="./legalnotice.html">
                    <div class="dropdown-text">Legal Notice</div>
                </a>
                <a href="./Privacypolicy.html">
                    <div class="dropdown-text">Privacy Policy</div>
                </a>
                <a href="./login.html" onclick="removeSessionStorageUser()">
                    <div class="dropdown-text">Log out</div>
                </a>
            </div>
            <div id="main-content" class="main-content-summary">
                <div class="main-content-header-summary main-content-header-summary-mobile">
                    <h1 class="header-contacts-floatin-mobile">Join 360</h1>
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
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="done-circle-summary" cx="35" cy="35" r="34.5" fill="#2A3647"/><path class="done-path-summary" d="M20.0283 35.0001L31.2571 46.0662L49.9717 23.9341"stroke="white"stroke-linecap="round" stroke-linejoin="round"/></svg>
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
    </section>`
}