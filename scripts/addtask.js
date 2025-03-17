function resetForm(formId) {
  const ref = document.getElementById(formId);
  ref.reset();
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

function delayHideSubtasksInputMenu() {
  setTimeout(() => hideSubtasksInputMenu(), 150);
}

function hideSubtasksInputMenu() {
  const plusIcon = document.getElementById("subtasks-plus");
  const focusIcons = document.getElementById("subtasks-on-focus-icons");
  plusIcon.classList.remove("d-none");
  focusIcons.classList.add("d-none");
}

let allSubtasks = [];

function addSubtaskValueToArray() {
  let subtaskInput = document.getElementById("subtasks-input");
  allSubtasks.push(subtaskInput.value);
  renderSubtasksFromArrayToForm();
  subtaskInput.value = "";
}

function renderSubtasksFromArrayToForm() {
  let subtaskContent = document.getElementById("added-subtasks");
  subtaskContent.innerHTML = "";
  for (
    let subtaskIndex = 0;
    subtaskIndex < allSubtasks.length;
    subtaskIndex++
  ) {
    const element = allSubtasks[subtaskIndex];
    subtaskContent.innerHTML += getSubtaskToFormTemp(element, subtaskIndex);
  }
}

function getSubtaskToFormTemp(subtask, index) {
  return `<div class="subtask-single-wrapper" >
            <span>&#8226</span>
            <input 
              type="text" 
              name="subtask-${index}" 
              value="${subtask}">
            <div class="single-task-icon-wrapper">
              
            </div>
          </div>`;
}

// collect info from subtask field
// put the info to a container below
// get a unorderd list template
// the template should have an edit and erase symbol
// on edit i should be able to edit the information
// on erase the info should delete
// on hover there should be a grey background
// only on hover the symbols for editing and delete should appear

// maybe i collect the infos in an array and render dynamically
