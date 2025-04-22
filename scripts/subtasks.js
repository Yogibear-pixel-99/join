/**
 * Emptys the subtask content.
 */
function deleteSubtasksContent(){
    document.getElementById("added-subtasks").innerHTML = '';
    allSubtasks = [];
  
  }

  
/**
 * Focus the subtask input field.
 */
function focusSubtaskInputMenu(){
    let ref = document.getElementById('subtasks-input');
    ref.focus();
  }
  
  
/**
 * Shows the subtask input menu in the add task form.
 */
function showSubtasksInputMenu(){
    const plusIcon = document.getElementById("subtasks-plus");
    const focusIcons = document.getElementById("subtasks-on-focus-icons");
    plusIcon.classList.add("d-none");
    focusIcons.classList.remove("d-none");
  }
  
  
  /**
   * Hides the subtask input menu in the add task form.
   */
  function hideSubtasksInputMenu(){
    const plusIcon = document.getElementById("subtasks-plus");
    const focusIcons = document.getElementById("subtasks-on-focus-icons");
    plusIcon.classList.remove("d-none");
    focusIcons.classList.add("d-none");
  }
  
  
  /**
   * Calls the add subtask function if enter key is pressed on focus subtask input field in the add task form.
   * 
   * @param {Object} event - The default event object.
   */
  function enterKeyAddSubtaskValueToArray(event){
      if (event.keyCode == 13){
        addSubtaskValueToArray();
      }
  }
  
  
  /**
   * Checks if the subtask input value already exists or is empty. Adds the subtask value to the add task form subtask array or shows an error.
   */
  function addSubtaskValueToArray(){
    let subtaskOutput = document.getElementById("added-subtasks");
    let subtaskInput = document.getElementById("subtasks-input");
    let allSubtasks = Array.from(document.getElementsByClassName('subtask-input'), element => element.value);
    const userInput = subtaskInput.value;
    if ((allSubtasks.length != 0) && (allSubtasks.some((element) => element === userInput))){
      getAddSubtaskError(subtaskInput, 'Subtask already exists');
    }  else if (userInput == ""){
      getAddSubtaskError(subtaskInput, 'Type in a subtask');
    } else {
      subtaskOutput.innerHTML += renderSubtaskTemp(userInput);
    }
    subtaskInput.value = "";
  }
  
  
  /**
   * Displays an error message if the subtask user input is empty or the subtask already exists.
   * 
   * @param {HTMLElement} subtaskInput - The subtask user input element. 
   * @param {string} errorMessage - The displayed error message.
   */
  function getAddSubtaskError(subtaskInput, errorMessage){
    subtaskInput.classList.add("subtask-input-error");
    subtaskInput.setAttribute("placeholder", errorMessage);
    setTimeout(() => clearSubtaskError(subtaskInput), 2000);
  }
  
  
  /**
   * Hides the subtask error message.
   * 
    * @param {HTMLElement} subtaskInput - The subtask user input element.
   */
  function clearSubtaskError(subtaskInput){
    subtaskInput.classList.remove("subtask-input-error");
    subtaskInput.setAttribute("placeholder", "Add new subtask");
  }
  
  
  /**
   * Delete the selected subtask in the add task form.
   * 
   * @param {string} containerId - The id of the selected subtask element in add task form.
   */
  function deleteSubtask(containerId){
    let contentRef = document.getElementById(containerId);
        contentRef.remove();
  }
  
  
  /**
   * Focus the selected subtask input field.
   * 
   * @param {string} containerId - The selected subtask input container id.
   */
  function focusToSubtaskInput(containerId){
    let ref = document.getElementById(containerId);
        ref.focus();
  }
  
  
/**
 * This function extracts the subtasks and inserts them into collectedFormInfos.
 * 
 * @param {FormData} data - FormData of the added Task
 */
function collectSubTasks(data){
    data.forEach((value, key) => {
      if (key === "subtasks[]"){
          collectedFormInfos.subtasks.push({
            "subtaskName": value,
            "finished": "false"
        });
      }
  })
  }
  
  