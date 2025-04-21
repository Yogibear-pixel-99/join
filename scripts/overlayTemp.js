/**
 * Creats a template for the task overlay, if click on a single task in board menu.
 * 
 * @param {Object} task - The task object with the needed information from the database.
 * @returns - Returns the task to the overlay menu including edit and delete onclick function.
 */
async function getTaskOverlayTemp(task){
    return `<header class="flex-ctr-spbtw overlay-header-wrapper">
                <div class="overlay-task-header-text task-color-${task.category.charAt(0)}">${task.category}</div>
                <div class="close-icon-wrapper flex-ctr-ctr" onclick="closeOverlayMenu('task-overlay-menu', 'task-overlay-mask-container')">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            <div class="task-overlay-button-wrapper" onclick="overlayEditTask('${task.apiKey}')">
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
 * @param {Object} task - The task object from the database.
 * @param {Object} subtask - The subtask from the task in the object from the database.
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


/**
 * Creates the template for the add task overlay.
 * 
 * @returns - A whole template form, to post a new task to the api.
 */
function getAddTaskOverlayTemp(){
    return `
          <h1 class="add-task-header">Add Task</h1>
          <form id="add-task-form" class="add-task-form-content" onsubmit action="submit">
          <div class="info-input-field-container">
            <div class="info-input-field-container-left">
              <div class="flex-col gap8">
                <label for="form-title"
                  >Title<span class="red-asterisk">*</span></label
                >
                <input
                  class="addTask-input-field"
                  id="form-title"
                  name="title"
                  required
                  type="text"
                  placeholder="Enter a title" />
                  <span id="title-error-message" class="title-error-message"></span>
              </div>
              <div class="flex-col gap8">
                <label for="form-description"
                  >Description</label
                >
                <textarea
                  name="description"
                  id="form-description"
                  placeholder="Enter a description"></textarea>
              </div>
              <div class="flex-col gap8 hover-pointer">
                <label for="due-date"
                  >Due date<span class="red-asterisk">*</span></label
                >
                <div class="relative">
                <input
                onkeyup="checkDateInput(event)"
                class="addTask-input-field hover-pointer"
                  id="due-date"
                  name="date"
                  required
                  pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\d{4}$"
                  type="text"
                  placeholder="dd/mm/yyyy" />
                  <input onchange="putDateToUserInput()" id="hidden-date-input" class="hidden-date-input" type="date">
                  <img onclick="showDatePicker()" class="input-logo date-icon hover-pointer" src="../assets/icons/dateicon.svg"></img>
                  </div>
                  <span id="date-error-message" class="date-error-message"></span>
              </div>
            </div>
            <div class="add-task-separator"></div>
            <div class="info-input-field-container-right">
              <div class="flex-col gap8">
                <label>Prio</label>
                <div id="priority-wrapper" class="btn-importance-container">
                  <input
                  value="Urgent"
                    class="d-none"
                    type="radio"
                    id="priority-urgent"
                    name="priority" />
                  <label
                    class="prio-urgent flex-ctr-ctr prio-button"
                    onclick="setPriorityButtonColor(this)"
                    for="priority-urgent"
                    ><span>Urgent</span
                    ><svg class="prio-urgent-svg" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_290772_5743)">
                        <path d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z" fill="#FF3D00" />
                        <path d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z"
                          fill="#FF3D00" /></g><defs><clipPath id="clip0_290772_5743"><rect width="20" height="14.5098" fill="white" transform="translate(0.748535 0.745117)" /></clipPath></defs>
                    </svg>
                  </label>
                  <input
                  value="Medium"
                    class="d-none"
                    type="radio"
                    id="priority-medium"
                    name="priority"
                    checked />
                  <label
                    class="prio-medium active flex-ctr-ctr prio-button"
                    id="standard-prio"
                    onclick="setPriorityButtonColor(this)"
                    for="priority-medium"
                    ><span>Medium</span
                    ><svg class="prio-medium-svg" width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z" fill="#FFA800" />
                      <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFA800" />
                    </svg>
                  </label>
                  <input
                  value="Low"
                    class="d-none"
                    type="radio"
                    id="priority-low"
                    name="priority" />
                  <label
                    class="prio-low flex-ctr-ctr prio-button"
                    onclick="setPriorityButtonColor(this)"
                    for="priority-low"
                    ><span>Low</span
                    ><svg
                      class="prio-low-svg"
                      width="21"
                      height="16"
                      viewBox="0 0 21 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z" fill="#7AE229" />
                      <path d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z" fill="#7AE229" />
                    </svg>
                  </label>
                </div>
              </div>
              <div class="flex-col gap8">
                <label for="searchInput">Assigned to</label>
                <div class="custom-dropdown" id="customDropdown">
                  <input class="dropdown-label addTask-input-field-img" type="text" id="searchInput" placeholder="Select contacts to assign" 
                  onkeyup="startSearchingContacts()"
                  onclick="toggleAssignedDropdown()" />
                  <div id="addTaskWrapper" class="add-task-wrapper add-task-wrapper-passive">
                    <div class="dropdown-content d-none" id="dropdownContent"></div>
                  </div>
                </div>
                <div class="add-selected-contacts" id="addSelectedContacts">
                </div>
            </div>
            <div class="flex-col gap8">
              <label for="categoryDropdown">Category<span class="red-asterisk">*</span></label>
                  <div class="custom-dropdown" id="categoryDropdownWrapper">
                <input
                  class="dropdown-label addTask-input-field-img"
                  type="text"
                  id="categoryDropdown"
                  placeholder="Select task category"
                  readonly
                  onclick="toggleCategoryDropdown()"
                />
                <div id="categoryWrapper" class="category-wrapper category-wrapper-passive">
                  <div class="dropdown-content d-none" id="categoryDropdownContent"></div>
                </div>
              </div>
              <span id="category-error-message" class="title-error-message"></span>
              <div class="subtask-input-wrapper flex-col gap8">
                <label for="subtasks-input"
                  >Subtasks  </label>
                  <div class="subtasks-wrapper">
                  <input
                    onfocus="showSubtasksInputMenu()"
                    onblur="hideSubtasksInputMenu()"
                    onkeydown="enterKeyAddSubtaskValueToArray(event)"
                    class="subtasks-input addTask-input-field"
                    id="subtasks-input"
                    type="text"
                    maxlength="30"
                    placeholder="Add new subtask" />
                  <!-- FUNCTION TO CREATE INPUT FIELD FOR SUBTASKS TO COLLECT WITH new FormData -->
                  <div id="subtasks-plus" class="plus-icon subtasks-icon">
                    <img src="../assets/icons/Subtasks icons11.svg" onclick="focusSubtaskInputMenu()" />
                  </div>
                  </div>
                <div
                  id="subtasks-on-focus-icons"
                  class="subtasks-icons-wrapper flex-ctr-ctr d-none">
                  <div class="subtasks-icon-container flex-ctr-ctr">
                    <img
                      class="subtasks-icon-x"
                      src="../assets/icons/clear-x.svg" />
                  </div>
                  <div class="mini-separator"></div>
                  <div class="subtasks-icon-container flex-ctr-ctr">
                    <img onmousedown="addSubtaskValueToArray()"
                      class="subtasks-icon"
                      src="../assets/icons/check-icon-dark.svg" />
                  </div>
                </div>
              </div>
              <div id="added-subtasks" class="added-subtasks"></div>
            </div>
          </div>
          <div class="add-task-footer">
            <div class="required-wrapper">
              <span class="red-asterisk">*</span>
              <span>This field is required</span>
            </div>
            <div class="addTask-button-container">
              <div class="light-button btns-addtask flex-ctr-ctr button-wrapper-add-task">
                <div
                  onclick="resetForm('add-task-form'); setPriorityButtonColor(document.getElementById('standard-prio')); deleteSubtasksContent();"
                  class="">
                  Clear
                </div>
                <svg class="clear-icon" width="14" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.24959 6.99984L11.4926 12.2428M1.00659 12.2428L6.24959 6.99984L1.00659 12.2428ZM11.4926 1.75684L6.24859 6.99984L11.4926 1.75684ZM6.24859 6.99984L1.00659 1.75684L6.24859 6.99984Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="dark-button btns-addtask" onclick="createNewTask(event)">
                Create Task <img src="../assets/icons/check.svg" />
              </div>
            </div>
          </div>
          </div>
        </form>`
}


/**
 * Creates a template for the task overlay to edit.
 * 
 * @param {Object} task - The task object to edit.
 * @returns - The template of the actual task to edit.
 */
function getEditTaskTemp(task){
  return `<div class="edit-task-overlay-close-wrapper white-box-top close-icon-wrapper flex-ctr-ctr" onclick="closeOverlayMenu('task-overlay-menu', 'task-overlay-mask-container')">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.00005 8.40005L2.10005 13.3C1.91672 13.4834 1.68338 13.575 1.40005 13.575C1.11672 13.575 0.883382 13.4834 0.700049 13.3C0.516715 13.1167 0.425049 12.8834 0.425049 12.6C0.425049 12.3167 0.516715 12.0834 0.700049 11.9L5.60005 7.00005L0.700049 2.10005C0.516715 1.91672 0.425049 1.68338 0.425049 1.40005C0.425049 1.11672 0.516715 0.883382 0.700049 0.700049C0.883382 0.516715 1.11672 0.425049 1.40005 0.425049C1.68338 0.425049 1.91672 0.516715 2.10005 0.700049L7.00005 5.60005L11.9 0.700049C12.0834 0.516715 12.3167 0.425049 12.6 0.425049C12.8834 0.425049 13.1167 0.516715 13.3 0.700049C13.4834 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4834 1.91672 13.3 2.10005L8.40005 7.00005L13.3 11.9C13.4834 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4834 13.1167 13.3 13.3C13.1167 13.4834 12.8834 13.575 12.6 13.575C12.3167 13.575 12.0834 13.4834 11.9 13.3L7.00005 8.40005Z" fill="#2A3647"/>
                  </svg>
              </div>
          <form id="add-task-form" class="scrollable-y add-task-form-content add-task-form-content-edit-task-overlay">
              <div class="info-input-field-container info-input-field-container-edit-task-overlay">
            <div class="flex-col gap8 width-100p">
              <label for="form-title">Title</label>
              <input
                class="addTask-input-field"
                id="form-title"
                name="title"
                required
                type="text"
                value="${task.title}"
                placeholder="Enter a title" />
                <span id="title-error-message" class="title-error-message"></span>
            </div>
            <div class="flex-col gap8 width-100p">
              <label for="form-description"
                >Description</label>
              <textarea
                name="description"
                id="form-description"
                placeholder="Enter a description">${task.description}</textarea>
            </div>
            <div class="flex-col gap8 width-100p hover-pointer">
              <label for="due-date"
                >Due date<span class="red-asterisk">*</span></label>
              <div class="relative">
              <input  value="${task.date}"
              onkeyup="checkDateInput(event)"
              class="addTask-input-field addTask-input-field-edit-task-overlay hover-pointer"
                id="due-date"
                name="date"
                required
                pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\d{4}$"
                type="text"
                placeholder="dd/mm/yyyy" />
                <input onchange="putDateToUserInput()" id="hidden-date-input" class="hidden-date-input" type="date">
                <img onclick="showDatePicker()" class="input-logo date-icon hover-pointer" src="../assets/icons/dateicon.svg">
                </div>
                <span id="date-error-message" class="date-error-message"></span>
            </div>
            <div class="flex-col width-100p gap8">
              <label>Prio</label>
              <div id="priority-wrapper" class="btn-importance-container">
                <input
                value="Urgent"
                  class="d-none"
                  type="radio"
                  id="priority-urgent"
                  name="priority" />
                <label
                  id="edit-priority-Urgent"
                  class="prio-urgent flex-ctr-ctr prio-button"
                  onclick="setPriorityButtonColor(this)"
                  for="priority-urgent"
                  ><span>Urgent</span
                  ><svg class="prio-urgent-svg" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_290772_5743)"> fill="#FF3D00" />
                      <path d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z"
                        fill="#FF3D00" /></g><defs><clipPath id="clip0_290772_5743"><rect width="20" height="14.5098" fill="white" transform="translate(0.748535 0.745117)" /></clipPath></defs>
                  </svg>
                </label>
                <input
                value="Medium"
                  class="d-none"
                  type="radio"
                  id="priority-medium"
                  name="priority"
                  checked />
                <label
                  class="prio-medium flex-ctr-ctr prio-button"
                  id="edit-priority-Medium"
                  onclick="setPriorityButtonColor(this)"
                  for="priority-medium"
                  ><span>Medium</span
                  ><svg class="prio-medium-svg" width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z" fill="#FFA800" />
                    <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFA800" />
                  </svg>
                </label>
                <input
                value="Low"
                  class="d-none"
                  type="radio"
                  id="priority-low"
                  name="priority" />
                <label
                  id="edit-priority-Low"
                  class="prio-low flex-ctr-ctr prio-button"
                  onclick="setPriorityButtonColor(this)"
                  for="priority-low"
                  ><span>Low</span
                  ><svg class="prio-low-svg" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z" fill="#7AE229" /><path d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z" fill="#7AE229" />
                  </svg>
                </label>
              </div>
            </div>
            <div class="flex-col width-100p gap8">
              <label for="searchInput">Assigned to</label>
              <div class="custom-dropdown" id="customDropdown"> 
                <input class="dropdown-label addTask-input-field-img" type="text" id="searchInput" placeholder="Select contacts to assign" 
                onkeyup="startSearchingContacts()"
                onclick="toggleAssignedDropdown()" />
                <div id="addTaskWrapper" class="add-task-wrapper add-task-wrapper-passive">
                  <div class="dropdown-content d-none" id="dropdownContent"></div>
                </div>
              </div>
              <div class="add-selected-contacts" id="addSelectedContacts">
              </div>
          <div class="flex-col width-100p gap8">
              <div id="categoryWrapper" class="category-wrapper category-wrapper-passive">
                <div class="dropdown-content d-none" id="categoryDropdownContent"></div>
              </div>
            </div>
            <span id="category-error-message" class="title-error-message"></span>
            <div class="subtask-input-wrapper flex-col gap8">
              <label for="subtasks-input"
                >Subtasks  </label>
                <div class="subtasks-wrapper">
                <input
                  onfocus="showSubtasksInputMenu()"
                  onblur="hideSubtasksInputMenu()"
                  onkeydown="enterKeyAddSubtaskValueToArray(event)"
                  class="subtasks-input addTask-input-field"
                  id="subtasks-input"
                  type="text"
                  maxlength="30"
                  placeholder="Add new subtask" />
                <!-- FUNCTION TO CREATE INPUT FIELD FOR SUBTASKS TO COLLECT WITH new FormData -->
                <div id="subtasks-plus" class="plus-icon subtasks-icon">
                  <img src="../assets/icons/Subtasks icons11.svg" onclick="focusSubtaskInputMenu()" />
                </div>
                </div>
              <div
                id="subtasks-on-focus-icons"
                class="subtasks-icons-wrapper flex-ctr-ctr d-none">
                <div class="subtasks-icon-container flex-ctr-ctr">
                  <img
                    class="subtasks-icon-x"
                    src="../assets/icons/clear-x.svg" />
                </div>
                <div class="mini-separator"></div>
                <div class="subtasks-icon-container flex-ctr-ctr">
                  <img
                  onmousedown="addSubtaskValueToArray()"
                    class="subtasks-icon"
                    src="../assets/icons/check-icon-dark.svg" />
                </div>
              </div>
            </div>
            <div id="added-subtasks" class="added-subtasks added-subtasks-edit-task-overlay"></div>
          </div>
        </div>
        </div>
      </form>
      <div class="add-task-footer-overlay white-box-bottom">
          <button class="dark-button btns-addtask" onclick="updateTask(event, '${task.apiKey}')">
            Ok <img src="../assets/icons/check.svg" />
          </button>
      </div>`
}

