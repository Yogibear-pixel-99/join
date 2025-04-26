
/**
 * Renders the assign to and the category dropdown menu in the add task form and sets the initials to the header onload the add task site.
 */
async function loadDropdown(){
    await getDataFromServer("users", usersFromApi);
    renderAssignToDropdown();
    renderCategoryOptions();
    setInitialsToHeader();
  }
  

  /**
   * Toggles the assigned to dropdown menu wrapper in the add task form.
   * 
   * @param {Event} event - The click event triggering the toggle (prevents event bubbling).
   */
  async function toggleAssignedDropdown(){
      let dropdown = document.getElementById("dropdownContent");
      let wrapper = document.getElementById("addTaskWrapper")
    if (wrapper.classList.contains('add-task-wrapper-passive')){
      wrapper.style.maxHeight = "500px";
      wrapper.classList.remove('add-task-wrapper-passive');
      wrapper.classList.add('add-task-wrapper-active');
    } else {
      wrapper.style.maxHeight = '0';
      wrapper.classList.remove('add-task-wrapper-active');
      wrapper.classList.add('add-task-wrapper-passive');
    }
    closeMainDropdown(dropdown);
    }
  
  
    /**
     * Toggles the inner assigned to dropdown menu in the add task form. 
     * 
     * @param {id} dropdown - Container id of the dropdown menu.
     */
   function closeMainDropdown(dropdown){
    if (dropdown.classList.contains("d-none")){
      dropdown.classList.toggle("d-none");
    } else {
      setTimeout(() => {
        dropdown.classList.toggle("d-none");
      }, 500);
    }
   } 
  
  
  /**
   * Shows the selected assigned user in the assign to dropdown menu in the add task form.
   */
   function renderAssignToDropdown(){
      let dropdownContent = document.getElementById('dropdownContent');
      dropdownContent.innerHTML = '';
      usersFromApi.forEach(user => {
        let rowClass = user.isSelected ? 'checked-row' : '';
        let checkboxImg = user.isSelected ? '../assets/icons/Check button checked white.svg' : '../assets/icons/Check button Box.svg';
        let userItem = document.createElement("div");
          userItem.classList.add("dropdown-item");
          userItem.innerHTML = getDropDownUserTemp(user, checkboxImg, rowClass);
          dropdownContent.appendChild(userItem);
      });
  }
  

  /**
 * Closes the dropdowns when clicking outside the dropdown (assigned-to and category).
 * 
 */
  function closeFormDropdown() {
  let dropdown = document.getElementById("dropdownContent");
  if (dropdown) {
    closeAssignedToDrop()
    closeCategDrop();
  }
  }


  /**
 * Closes the assigned-to dropdown when clicking outside the dropdown
 * 
 */
  function closeAssignedToDrop() {
    let dropdown = document.getElementById("dropdownContent");
    if (!dropdown.classList.contains("d-none")){
      toggleAssignedDropdown()
    }
  }


/**
 * Closes the category dropdown when clicking outside the dropdown
 * 
 */
  function closeCategDrop() {
    let dropdown = document.getElementById("categoryDropdownContent");
    if (!dropdown.classList.contains("d-none")){
      toggleCategoryDropdown();
    }
  }


  /**
   * Filters the users in the assign to dropdown menu, based on the value typed in the search bar input field.
   */
  function startSearchingContacts(){
      let searchInput = document.getElementById('searchInput').value.toLowerCase();
      let filteredUsers = usersFromApi.filter(user => user.name.toLowerCase().includes(searchInput));
      renderDropdownWithSearchResults(filteredUsers);
  }
  
  
  /**
   * Renders the searched users in the assign to dropdown menu in the add task form.
   * 
   * @param {Array} filteredUsers - An array of the filterd users from the search function.
   */
  function renderDropdownWithSearchResults(filteredUsers){
      let dropdownContent = document.getElementById('dropdownContent');
      dropdownContent.innerHTML = ''; 
      filterUsers = filteredUsers;
      filteredUsers.forEach(user => {
          let userItem = document.createElement("div");
          let rowClass = user.isSelected ? 'checked-row' : '';
          let checkboxImg = user.isSelected ? '../assets/icons/Check button checked white.svg' : '../assets/icons/Check button Box.svg';
          userItem.classList.add("dropdown-item");
          userItem.innerHTML = getDropDownUserFilterdTemp(user, checkboxImg, rowClass);
          dropdownContent.appendChild(userItem);
      });
  }
  
  
  /**
   * Adds or removes the selected user from the "Assigned To" dropdown.
   * 
   * @param {string} userEmail - The email of the selected user.
   * @returns Nothing if there is an empty object.
   */
  function toggleUserSelection(userEmail){
    let user = usersFromApi.find(u => u.email === userEmail);
    if (!user) return;
    user.isSelected = !user.isSelected;
    renderAssignToDropdown();
    user.isSelected ? addSelectedContact(user) : removeSelectedContact(userEmail);
  }
  

  /**
   * Adds or removes the selected user from the "Assigned To" dropdown, only for users currently filtered.
   * 
   * @param {string} userEmail - The email of the selected user.
   * @returns Nothing if there is an empty object.
   */
  function toggleSearchedUserSelection(userEmail){
    let user = usersFromApi.find(u => u.email === userEmail);
    if (!user) return;
    user.isSelected = !user.isSelected;
    renderDropdownWithSearchResults(filterUsers)
    user.isSelected ? addSelectedContact(user) : removeSelectedContact(userEmail);
  }


  /**
 * Marks the checkbox of a searched user in the assign to dropdown menu.
 * 
 * @param {HTMLElement} event - The selected HTML Container (user).
 * @returns Nothing if there is an empty object.
 */
function handleCheckboxChange(event){
    let userEmail = event.target.getAttribute("data-user-id");
    let user = usersFromApi.find(u => u.email === userEmail);
    let userItem = event.target.closest('.user-item');
    if (!user || !userItem) return; 
    user.isSelected = event.target.checked;
  
    if (event.target.checked){
      userItem.classList.add('checked-row');
      addSelectedContact(user);
    } else {
      userItem.classList.remove('checked-row');
      removeSelectedContact(userEmail);
    }
  }
  

  /**
   * Selects the category in the add task form.
   * 
   * @param {string} category - The selected category.
   */
  function selectCategory(category){
    selectedCategory = category;
    document.getElementById("categoryDropdown").value = category;
    toggleCategoryDropdown();
  }


  /**
   * Opens the wrapper from the dropdown menu to animate it.
   * 
   * @param {HTMLElement} dropdown - The id of the dropdown container.
   * @param {Event} event - The click event triggering the toggle (prevents event bubbling).
   */
 function toggleCategoryDropdown(){
  let dropdown = document.getElementById("categoryDropdownContent");
  let wrapper = document.getElementById("categoryWrapper")
  if (wrapper.classList.contains('category-wrapper-passive')){
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


 /**
  * Closes the category dropdown menu.
  * 
  * @param {HTMLElement} dropdown - The dropdown container.
  */
 function closeCategoryDropdown(dropdown){
  if (dropdown.classList.contains("d-none")){
    dropdown.classList.toggle("d-none");
  } else {
    setTimeout(() => {
      dropdown.classList.toggle("d-none");
    }, 500);
  }
 } 


 /**
  * Renders the category dropdown menu in the add task form.
  */
  function renderCategoryOptions(){
    let dropdownContent = document.getElementById("categoryDropdownContent");
    dropdownContent.innerHTML = ""; 
    staticCategories.forEach(category => {
      let option = document.createElement("div");
      option.classList.add("dropdown-item");
      option.innerHTML = `
        <label class="category-item">
        <div onclick="selectCategory('${category}')" class="category-itmen-names">
          <span>${category}</span>
        </div>
        </label>`;
      dropdownContent.appendChild(option);
    });
  }
  

/**
 * Toggles the dropdown menu in the header if click on the initials button.
 */
function toggleHeaderDropdownMenu(){
  let dropdownREF = document.getElementById("dropdown");
  dropdownREF.classList.toggle("d-none");
}


/**
* Toggles the dropdown menu in the header if click on the initials button.
*/
function closeHeaderDropdownMenu(){
  let dropdownREF = document.getElementById("dropdown");
  dropdownREF.classList.add("d-none");
}


/**
 * Handles the drag-and-drop dropdown display for a specific task.
 * Hides the task card and toggles the visibility of its dropdown menu.
 * 
 * @param {string|number} id - The unique identifier for the task
 * @param {string} status - The status/category of the task (e.g., "To Do")
 */
function dragAndDropDropdown(id, status) {
  let dropdownREF = document.getElementById("dropdown-" + id);
  let taskREF = document.getElementById("tasks-" + status.toLowerCase().replace(/\s+/g, '') + "-"+id);
  taskREF.classList.add("d-none")
  dropdownREF.classList.toggle("d-none");
}


/**
 * Closes all open dropdowns for tasks except the one with the given id.
 * Fetches the latest tasks from the server before closing dropdowns.
 * 
 * @param {string|number} id - The unique identifier for the task to keep open (or null to close all)
 */
async function closeDropDownTasks(id) {
  await getDataFromServer("tasks", tasksFromApi);
  for (let index = 0; index < tasksFromApi.length; index++) {
    if (tasksFromApi[index].apiKey !== id || id == null) {
      let dropdownREF = document.getElementById("dropdown-" + tasksFromApi[index].apiKey);
      if (dropdownREF) {
        if (!dropdownREF.classList.contains("d-none")) {
          dropdownREF.classList.add("d-none");
        } 
      } 
    }
    }
}


/**
 * Changes the status of a task
 * 
 * @param {string} newStatus - The new status/category for the task
 * @param {string|number} apiKey - The unique identifier for the task
 */
function changeStatusMobile(newStatus, apiKey) {
  getNewStatusInfoMobile(newStatus, apiKey);
}


/**
 * Updates the status of a task in the backend and reloads the task list.
 * 
 * @param {string} newStatus - The new status/category for the task
 * @param {string|number} taskKey - The unique identifier for the task
 */
async function getNewStatusInfoMobile(newStatus, taskKey){
  collectedStatusInfo = {
    status: newStatus,
  };
  await patchTaskDataToApi(collectedStatusInfo, `tasks/${taskKey}`);
  loadAndRenderTasks()
}