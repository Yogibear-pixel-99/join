function initBoard() {
  loadAndRenderTasks();
}

async function loadAndRenderTasks() {
  await getDataFromServer("users", usersFromApi);
  await getDataFromServer("tasks", tasksFromApi);
  initialsChange();
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

function toggleAddedToBoard() {
  let addedToBoardREF = document.getElementById("task-added");
  addedToBoardREF.classList.toggle("d-none");
  loadingToBoard();
}

function loadingToBoard() {
  return setTimeout(() => {
    let addtaskREF = document.getElementById("addtask-overlay");
    let addedToBoardREF = document.getElementById("task-added");
    addedToBoardREF.classList.toggle("d-none");
    addtaskREF.classList.toggle("d-none");
  }, 3000);
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
  let allTasksNr = getAllSubtasksLength(task);
  let doneTasksNr = getDoneSubtasksLength(task);

  return `<div class="task-card" 
              id="task-${task.title.replace(/\s+/g, "-")}" 
              onclick="openTask('${task.id}')" 
              draggable="true" 
              data-status="${task.status}">
                  <span class="task-type task-color-${task.task
                    .charAt(0)
                    .toUpperCase()}">${task.task}</span>
                  <div class="task-title-description-wrapper">
                    <div class="task-title" id="titleTask${task.id}">${
    task.title
  }</div>
                    <div class="task-description" id="titleDescription${
                      task.id
                    }">${task.description}</div>
                  </div>
                  <div class="task-subtask-info">
                  <div class="subtask-progressbar">
                    <div class="subtask-progress" style="width: ${
                      (100 / allTasksNr) * doneTasksNr
                    }%"></div>
                  </div>
                  <span class="subtask-count">${doneTasksNr}/${allTasksNr} Subtasks</span>
                </div>
                <div class="task-meta-assignend-user-container"> 
                <div class="task-meta">
                  ${priorityHTML}
                </div>
                ${assignedHTML}
            </div>
          </div>`;
}

function getAllSubtasksLength(task) {
  return task.subtasks.filter(
    (subtask) => subtask != null && subtask.subtaskName != undefined
  ).length;
}

function getDoneSubtasksLength(task) {
  return task.subtasks.filter(
    (subtask) => subtask.finished == "true" && subtask.subtaskName != undefined
  ).length;
}

function getNewStatusInfo(newStatus, taskKey) {
  collectedStatusInfo = {
    status: newStatus,
  };
  patchTaskDataToApi(collectedStatusInfo, `tasks/${taskKey.id - 1}`);
}

function checkEmptyColumsExists() {
  let todo = document.getElementById("boardToDoCard");
  let prog = document.getElementById("boardInprogressCard");
  let feed = document.getElementById("boardAwaitFeedbackCard");
  let done = document.getElementById("boardDoneCard");

/*   clearBoardColums(todo, prog, feed, done);
  fillBoardColums(tasksFromApi, todo, prog, feed, done); */
  checkEmptyColums(todo, prog, feed, done);
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
        checkEmptyColumsExists();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
