
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
  async function toggleAssignedDropdown(event){
    event.stopPropagation();
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
 * @param {Event} event - The click event triggering the closure.
 */
  function closeFormDropdown(event) {
  let dropdown = document.getElementById("dropdownContent");
  if (dropdown) {
    closeAssignedToDrop(event)
    closeCategDrop(event);
  }
  }

  /**
 * Closes the assigned-to dropdown when clicking outside the dropdown
 * 
 * @param {Event} event - The click event triggering the closure.
 */
  function closeAssignedToDrop(event) {
    let dropdown = document.getElementById("dropdownContent");
    if (!dropdown.classList.contains("d-none")){
      toggleAssignedDropdown(event)
    }
  }
/**
 * Closes the category dropdown when clicking outside the dropdown
 * 
 * @param {Event} event - The click event triggering the closure.
 */
  function closeCategDrop(event) {
    let dropdown = document.getElementById("categoryDropdownContent");
    if (!dropdown.classList.contains("d-none")){
      toggleCategoryDropdown(event);
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
 function toggleCategoryDropdown(event){
  event.stopPropagation();
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
        <label onclick="formDataCategory('${category}')" class="category-item">
        <div onclick="selectCategory('${category}')" class="category-itmen-names">
          <span>${category}</span>
        </div>
        </label>`;
      dropdownContent.appendChild(option);
    });
  }
  