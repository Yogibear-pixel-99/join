function initBoard() {
  loadAndRenderTasks();
}

async function loadAndRenderTasks() {
  await getDataFromServer("users", usersFromApi);
  await getDataFromServer("tasks", tasksFromApi);
  setInitialsToHeader();
  renderBoard();
}

function renderBoard() {
  let todo = document.getElementById("boardToDoCard");
  let prog = document.getElementById("boardInprogressCard");
  let feed = document.getElementById("boardAwaitFeedbackCard");
  let done = document.getElementById("boardDoneCard");

  clearBoardColums(todo, prog, feed, done);
  fillBoardColums(tasksFromApi, todo, prog, feed, done);
  checkEmptyColums(todo, prog, feed, done);
}

function clearBoardColums(todo, prog, feed, done) {
  todo.innerHTML = "";
  prog.innerHTML = "";
  feed.innerHTML = "";
  done.innerHTML = "";
}

function fillBoardColums(tasks, todo, prog, feed, done) {
  tasks.forEach((task) => {
    let cardHtml = createTaskCard(task);
    if (task.status === "todo") todo.innerHTML += cardHtml;
    if (task.status === "inprogress") prog.innerHTML += cardHtml;
    if (task.status === "awaitfeedback") feed.innerHTML += cardHtml;
    if (task.status === "done") done.innerHTML += cardHtml;
  });
}

function checkEmptyColums(todo, prog, feed, done) {
  if (!todo.innerHTML.trim()) {
    todo.innerHTML = `<div class="no-tasks">No tasks to do</div>`;
  }
  if (!prog.innerHTML.trim()) {
    prog.innerHTML = `<div class="no-tasks">No tasks in progress</div>`;
  }
  if (!feed.innerHTML.trim()) {
    feed.innerHTML = `<div class="no-tasks">No tasks await feedback</div>`;
  }
  if (!done.innerHTML.trim()) {
    done.innerHTML = `<div class="no-tasks">No tasks done</div>`;
  }
}

function renderAssignedUsers(task) {
  if (!task.assignTo || !task.assignTo.length === 0) {
    return "";
  }

  let existingEmail = task.assignTo.filter((element) => {
    return usersFromApi.some((email) => email.email === element);
  });
  let initialsPosition = -24;
  return existingEmail
    .map((email) => {
      let user = usersFromApi.find((u) => u.email === email);
      initialsPosition += 24;
      if (user) {
        let initials = returnInitials(user.name);
        return `<div class="contact-list-board-initals 
                            initials-bg-color-${user.name
                              .charAt(0)
                              .toUpperCase()}"
                            style="left: ${initialsPosition}px">
                            ${initials}
                </div>`;
      } else {
        return `<div class="contact-list-board-initals">??</div>`;
      }
    })
    .join("");
}

function getPriorityIconHTML(priority) {
  if (!priority) return "";

  let prio = priority.toLowerCase();
  if (prio === "urgent") {
    return `<img src="../assets/icons/prio-urgent.svg" class="task-priority-icon" alt="Urgent" />`;
  } else if (prio === "medium") {
    return `<img src="../assets/icons/prio-medium.svg" class="task-priority-icon" alt="Medium" />`;
  } else if (prio === "low") {
    return `<img src="../assets/icons/prio-low.svg" class="task-priority-icon" alt="Low" />`;
  }
  return "";
}

function loadingToBoard() {
  return setTimeout(() => {
    let maskREF = document.getElementById("mask-container");
    let addtaskREF = document.getElementById("addtask-content");
    let addedToBoardREF = document.getElementById("task-added-overlay-button");
    addedToBoardREF.classList.toggle("d-none");
    maskREF.classList.toggle("d-none");
    addtaskREF.classList.toggle("addtask-content-hide");
    renderNewBoard();
  }, 3000);
}


async function renderNewBoard() {
 await getDataFromServer("tasks", tasksFromApi);
 renderBoard();
}

function searchForTask() {
  let inputTaskREF = document.getElementById("find-task");
  let inputTaskValue = inputTaskREF.value.toLowerCase();
  findTask(inputTaskValue);
}

function findTask(inputTaskValue) {
  for (let index = 1; index < tasksFromApi.length + 1; index++) {
    let titleTaskREF = document.getElementById("titleTask" + index);
    let descriptionTaskREF = document.getElementById(
      "titleDescription" + index
    );
    let titleTaskValue = titleTaskREF.innerText.toLowerCase();
    let descriptionValue = descriptionTaskREF.innerText.toLowerCase();
    if (
      titleTaskValue.includes(inputTaskValue) ||
      inputTaskValue == " " ||
      descriptionValue.includes(inputTaskValue)
    ) {
      titleTaskREF.parentElement.parentElement.classList.remove("d-none");
    } else {
      titleTaskREF.parentElement.parentElement.classList.add("d-none");
    }
  }
}


function createTaskCard(task) {
  let assignedHTML = renderAssignedUsers(task);
  let priorityHTML = getPriorityIconHTML(task.priority);
  let allSubTasksNr = getAllSubtasksLength(task);
  let doneSubTasksNr = getDoneSubtasksLength(task);
  let taskTemp = getSingleTaskCardForBoardTemp(task, assignedHTML, priorityHTML, allSubTasksNr, doneSubTasksNr);
  return taskTemp;
  }





function getAllSubtasksLength(task) {
  if (Array.isArray(task.subtasks)) {
    return task.subtasks.filter(
      (subtask) => subtask != null && subtask.subtaskName != undefined
    ).length;
  } else {
    return "";
  }
}


function getDoneSubtasksLength(task) {
  if (Array.isArray(task.subtasks)) {
    return task.subtasks.filter(
      (subtask) =>
        subtask.finished == "true" && subtask.subtaskName != undefined
    ).length;
  } else {
    return "";
  }
}

function getNewStatusInfo(newStatus, taskKey) {
  collectedStatusInfo = {
    status: newStatus,
  };
  patchTaskDataToApi(collectedStatusInfo, `tasks/${taskKey.apiKey}`);
}

async function checkEmptyColumsExists() {
  let todo = document.getElementById("boardToDoCard");
  let prog = document.getElementById("boardInprogressCard");
  let feed = document.getElementById("boardAwaitFeedbackCard");
  let done = document.getElementById("boardDoneCard");
  checkEmptyColums(todo, prog, feed, done);
}

async function resetTaskApi() {
  return await getDataFromServer("tasks", tasksFromApi);
}

async function patchTaskDataToApi(payload, taskKey) {
  if (taskKey != undefined) {
    try {
      let response = await fetch(MAIN_URL + taskKey + ".json", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Contact not found in Database!");
      } else {
        console.log(response);
        await resetTaskApi();
        checkEmptyColumsExists();
      }
    } catch (error) {
      console.log(error);
    }
  }
}


  // drag and drop 

  document.addEventListener("DOMContentLoaded", () => {
    let columns = document.querySelectorAll(".board-rendered");

    columns.forEach(column => {
        column.addEventListener("dragover", dragover);
        column.addEventListener("drop", dropTask);
    });

    document.addEventListener("dragstart", dragstart);
    document.addEventListener("dragend", dragend);
});

function dragstart(event) {
    if (!event.target.classList.contains("task-card")) return;
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add("dragging");
}

function dragover(event) {
    event.preventDefault();
    let column = event.currentTarget;
    let draggingCard = document.querySelector(".dragging");
    if (draggingCard && !column.contains(draggingCard)) {
        column.appendChild(draggingCard);
    }
}

function dropTask(event) {
    event.preventDefault();
    let taskId = event.dataTransfer.getData("text/plain");
    let taskCard = document.getElementById(taskId);
    let spanElement = taskCard.closest('.board-single-task-container').querySelector('.board-task-header-container span');
    let column = event.currentTarget;
    if (taskCard && column) {
        let newStatus = spanElement.innerText.toLowerCase().replace(" ", "");
        taskCard.dataset.status = newStatus;
        console.log(`Task ${taskId} moved to ${newStatus}`);
        let updateTask = tasksFromApi.find(task => {return task.apiKey === taskId || "task-" + task.title.replace(/\s+/g, '-') === taskId;});
        console.log(updateTask.apiKey);
        console.log(MAIN_URL + `tasks/${updateTask.apiKey}` + ".json");
        
        getNewStatusInfo(newStatus, updateTask);
    }
    taskCard.classList.remove("dragging");
    hideEmptyContentTasks(taskId);
}

function hideEmptyContentTasks(taskId){
  let contentRef = document.getElementById(taskId).parentElement.querySelector(".no-tasks");
  let allContent = document.querySelectorAll('.task-column');
    allContent.forEach((element) => {
      if (element.children.length == 1) {
        element.children[0].classList.remove('d-none');
      }
    })
  if (contentRef) {
    contentRef.classList.add('d-none');
  }
}

function dragend(event) {
    event.target.classList.remove("dragging");
}

function openAddTaskOverlayAndEmptyEditTaskOverlay(addTaskLocation){
  let ref1 = document.getElementById('addtask-content');
  let ref2 = document.getElementById('task-overlay-menu');
      ref1.innerHTML = getAddTaskOverlayTemp(); ref2.innerHTML = '';
      toggleOverlayMenu('addtask-content', 'addtask-overlay-mask-container');
      renderAssignToDropdown();
      renderCategoryOptions();
      addTaskStatus = addTaskLocation;
}


async function openTask(taskId){
  let addTaskRef = document.getElementById('addtask-content');
      addTaskRef.innerHTML = '';
  let taskRef = document.getElementById('task-overlay-menu');
  await getDataFromServer("tasks", tasksFromApi);
  let task = tasksFromApi.find(element => element.id === taskId);
  taskRef.innerHTML = await getTaskOverlayTemp(task);
  toggleOverlayMenu('task-overlay-menu', 'task-overlay-mask-container');
}


