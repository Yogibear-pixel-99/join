

function resetForm(formId){
  const ref = document.getElementById(formId);
        ref.reset();
}

function setPriorityButtonColor(selected) {
  const labelRef = document.querySelectorAll("#priority-wrapper label");
  labelRef.forEach((element) => {
    if (element === selected) {
      element.classList.add("active");
      element.querySelector('svg').classList.add('prio-svg');
    } else {
      element.classList.remove("active");
      element.querySelector('svg').classList.remove('prio-svg');
    }
  });
}

function showSubtasksInputMenu(){
  const plusIcon = document.getElementById('subtasks-plus');
  const focusIcons = document.getElementById('subtasks-on-focus-icons');
        plusIcon.classList.add('d-none');
        focusIcons.classList.remove('d-none');
}

function hideSubtasksInputMenu(){
  const plusIcon = document.getElementById('subtasks-plus');
  const focusIcons = document.getElementById('subtasks-on-focus-icons');
        plusIcon.classList.remove('d-none');
        focusIcons.classList.add('d-none');
}