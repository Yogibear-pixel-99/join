
/**
 * Starts the drag process for a task card.
 * 
 * @param {DragEvent} event - The drag event that was triggered.
 */
function dragstart(event){
    if (!event.target.classList.contains("task-card")) return;
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add("dragging");
}


/**
 * Allows a task card to be dragged over a column.
 * 
 * @param {DragEvent} event - The dragover event.
 */
function dragover(event){
    event.preventDefault();
    let column = event.currentTarget;
    let draggingCard = document.querySelector(".dragging");
    if (draggingCard && !column.contains(draggingCard)){
        column.appendChild(draggingCard);
    }
}


/**
 * Manages the logic for moving a task card to a new column via drag-and-drop.
 * Updates the task's status both in the UI and via an API call.
 * 
 * @param {DragEvent} event - The drop event fired when the card is released.
 */
function dropTask(event){
    event.preventDefault();
    let taskId = event.dataTransfer.getData("text/plain");
    let taskCard = document.getElementById(taskId);
    let spanElement = taskCard.closest('.board-single-task-container').querySelector('.board-task-header-container span');
    let column = event.currentTarget;
    if (taskCard && column){
        let newStatus = spanElement.innerText.toLowerCase().replace(" ", "");
        taskCard.dataset.status = newStatus;
        let updateTask = tasksFromApi.find(task => {return task.apiKey === taskId || "task-" + task.title.replace(/\s+/g, '-') === taskId;});
        getNewStatusInfo(newStatus, updateTask);
    }
    taskCard.classList.remove("dragging");
    hideEmptyContentTasks(taskId);
}


/**
 * Hides the "no tasks" message when a task is moved into a column.
 * 
 * @param {string} taskId - The ID of the moved task card.
 */
function hideEmptyContentTasks(taskId){
  let contentRef = document.getElementById(taskId).parentElement.querySelector(".no-tasks");
  let allContent = document.querySelectorAll('.task-column');
    allContent.forEach((element) => {
      if (element.children.length == 1){
        element.children[0].classList.remove('d-none');
      }
    })
  if (contentRef){
    contentRef.classList.add('d-none');
  }
}
