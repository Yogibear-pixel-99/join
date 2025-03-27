

let assignedUsersArray = [];

async function openTask(taskId){
    let taskRef = document.getElementById('task-overlay-menu');
    await getDataFromServer("tasks", tasksFromApi);
    console.log(tasksFromApi);
    let task = tasksFromApi.find(element => element.id === taskId);
    console.log(task);
    taskRef.innerHTML = await getTaskOverlayTemp(task);
    toggleOverlayMenu('task-overlay-menu', 'task-overlay-mask-container');
}

async function getTaskOverlayTemp(task){
    return `<header class="flex-ctr-spbtw overlay-header-wrapper">
                <div class="overlay-task-header-text task-color-${task.task.charAt(0)}">${task.task}</div>
                <div class="close-icon-wrapper flex-ctr-ctr" onclick="toggleOverlayMenu('task-overlay-menu', 'task-overlay-mask-container')">
                    <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.00005 8.40005L2.10005 13.3C1.91672 13.4834 1.68338 13.575 1.40005 13.575C1.11672 13.575 0.883382 13.4834 0.700049 13.3C0.516715 13.1167 0.425049 12.8834 0.425049 12.6C0.425049 12.3167 0.516715 12.0834 0.700049 11.9L5.60005 7.00005L0.700049 2.10005C0.516715 1.91672 0.425049 1.68338 0.425049 1.40005C0.425049 1.11672 0.516715 0.883382 0.700049 0.700049C0.883382 0.516715 1.11672 0.425049 1.40005 0.425049C1.68338 0.425049 1.91672 0.516715 2.10005 0.700049L7.00005 5.60005L11.9 0.700049C12.0834 0.516715 12.3167 0.425049 12.6 0.425049C12.8834 0.425049 13.1167 0.516715 13.3 0.700049C13.4834 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4834 1.91672 13.3 2.10005L8.40005 7.00005L13.3 11.9C13.4834 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4834 13.1167 13.3 13.3C13.1167 13.4834 12.8834 13.575 12.6 13.575C12.3167 13.575 12.0834 13.4834 11.9 13.3L7.00005 8.40005Z" fill="#2A3647"/>
                    </svg>
                </div>
            </header>
            <h1>${task.title}</h1>
            <section class="overlay-task-body">
                <div>${task.description}</div>
                
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
                            <div class="task-overlay-button-wrapper" onclick="overlayEditTask('${task.id}')">
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

function getPriorityIconForTaskOverlay(task){
    let iconSrc = "";
    switch (task.priority) {
        case "Urgent": iconSrc = "prio-urgent.svg";
            break;

        case "Medium": iconSrc = "prio-medium.svg";
            break;

        case "Low": iconSrc = "prio-low.svg";
            break;
    }
    return iconSrc;
}

async function getTaskAssignedUsers(task){
    let content = '';
    let name = '';
    let initials = '';
        await getDataFromServer('users', usersFromApi);
        if (task.assignTo && task.assignTo.length > 0) {
        for (let userIndex = 0; userIndex < task.assignTo.length; userIndex++) {
            const userEmail = task.assignTo[userIndex];
                usersFromApi.find((element) => {
                    if (element.email === userEmail) {
                        name = element.name;
                        initials = returnInitials(name);
                        content += getAssignedUserTemp(name, initials);
                    }
                })   
            }
        if (content == '' || content == undefined) {
        return 'No user assigned to task!'; 
        } else {
            return content;
        }
    }
}

function getAssignedUserTemp(name, initials){
    return `<span class="task-user-wrapper">
                    <span class="task-overlay-initials flex-ctr-ctr initials-bg-color-${name.charAt(0)}">${initials}</span>
                    <span class="assigned-user-task-overlay">${name}</span>
            </span>`
}

async function getSubtasksForTaskOverlay(task){
    let content = '';
    await getDataFromServer(`tasks/${task.apiKey}/subtasks`, subtasksFromApi);
        console.log(subtasksFromApi);
            subtasksFromApi.forEach(subtask => content += getSubtaskTemp(task, subtask));
    return content;
}

function getSubtaskTemp(task, subtask){
    return `<label>
                <input 
                    id="subtask-${subtask.apiKey}"
                    onclick="changeSubTaskCheckedApi('tasks/${task.apiKey}/subtasks/${subtask.apiKey}', 'subtask-${subtask.apiKey}')" 
                    type="checkbox" ${checkIfSubtaskIsDone(subtask)}>
                <span>${subtask.subtaskName}</span>
            </label>
            `
}

function checkIfSubtaskIsDone(subtask){
    return subtask.finished == "true" ? "checked" : "";
}

async function changeSubTaskCheckedApi(location, id){
    let inputRef = document.getElementById(id);
    let isChecked = {};
    inputRef.checked ? isChecked = {"finished":"true"} : isChecked = {"finished":"false"};
    console.log(isChecked);
    await putDataToApi(isChecked, location);
}

async function overlayDeleteTask(apiKey){
    let taskRef = document.getElementById('task-overlay-menu');
    await deleteDataFromApi("tasks/", apiKey);
    toggleOverlayMenu('task-overlay-menu', 'task-overlay-mask-container');
    setTimeout(() => {taskRef.innerHTML = ""}, 1000);
    initBoard();
}

function overlayEditTask(taskId){
    let taskRef = document.getElementById('task-overlay-menu');
    let taskData = tasksFromApi.find(element => element.id === taskId);
    console.log(taskData);
    taskRef.innerHTML = getEditTaskTemp(taskData);

    // design edit task container
    // show edit Task Container
    // fill edit task container with values





    // change values
    // save values to api
    // show new values in task overlay
    // render alltasks from api
}

function getEditTaskTemp(task){
    return `<div class="flex-end">
                <div class="close-icon-wrapper flex-ctr-ctr" onclick="toggleOverlayMenu('task-overlay-menu', 'task-overlay-mask-container')">
                    <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.00005 8.40005L2.10005 13.3C1.91672 13.4834 1.68338 13.575 1.40005 13.575C1.11672 13.575 0.883382 13.4834 0.700049 13.3C0.516715 13.1167 0.425049 12.8834 0.425049 12.6C0.425049 12.3167 0.516715 12.0834 0.700049 11.9L5.60005 7.00005L0.700049 2.10005C0.516715 1.91672 0.425049 1.68338 0.425049 1.40005C0.425049 1.11672 0.516715 0.883382 0.700049 0.700049C0.883382 0.516715 1.11672 0.425049 1.40005 0.425049C1.68338 0.425049 1.91672 0.516715 2.10005 0.700049L7.00005 5.60005L11.9 0.700049C12.0834 0.516715 12.3167 0.425049 12.6 0.425049C12.8834 0.425049 13.1167 0.516715 13.3 0.700049C13.4834 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4834 1.91672 13.3 2.10005L8.40005 7.00005L13.3 11.9C13.4834 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4834 13.1167 13.3 13.3C13.1167 13.4834 12.8834 13.575 12.6 13.575C12.3167 13.575 12.0834 13.4834 11.9 13.3L7.00005 8.40005Z" fill="#2A3647"/>
                    </svg>
                </div>
            </div>

    
            `
}