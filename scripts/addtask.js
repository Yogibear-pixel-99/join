
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
