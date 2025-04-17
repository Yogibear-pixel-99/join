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
                        content += getAssignedUserTaskOverlayTemp(name, initials);
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


async function getSubtasksForTaskOverlay(task){
    let content = '';
    await getDataFromServer(`tasks/${task.apiKey}/subtasks`, subtasksFromApi);
            subtasksFromApi.forEach(subtask => content += getSubtaskForTaskOverlayTemp(task, subtask));
    return content;
}


function checkIfSubtaskIsDone(subtask){
    return subtask.finished == "true" ? "checked" : "";
}

async function changeSubTaskCheckedApi(location, id){
    let inputRef = document.getElementById(id);
    let isChecked = {};
    inputRef.checked ? isChecked = {"finished":"true"} : isChecked = {"finished":"false"};
    await patchDataToApi(location, isChecked);
    initBoard();
}

async function overlayDeleteTask(apiKey){
    let taskRef = document.getElementById('task-overlay-menu');
    await deleteDataFromApi("tasks/", apiKey);
    toggleOverlayMenu('task-overlay-menu', 'task-overlay-mask-container');
    setTimeout(() => {taskRef.innerHTML = ""}, 1000);
    initBoard();
}

function overlayEditTask(taskApiKey){
    let taskRef = document.getElementById('task-overlay-menu');
    let taskData = tasksFromApi.find(element => element.apiKey === taskApiKey);
    taskRef.innerHTML = getEditTaskTemp(taskData);
    renderAssignToDropdown();
    renderCategoryOptions();
    setTimeout(() => {setPriorityButtonContainer(taskData)}, 1);
    setTimeout(() => {setAssignedUsersToDropdown(taskData)}, 1);
    setTimeout(() => {showSubtaskInEditOverlay(taskData)}, 1);
}

function setPriorityButtonContainer(taskData){
    let ref = document.getElementById(`edit-priority-${taskData.priority}`)
    setPriorityButtonColor(ref);
}

function setAssignedUsersToDropdown(task){
    task.assignTo.forEach((element) => {
        toggleUserSelection(element);
    })
}

function showSubtaskInEditOverlay(task){
    let ref = document.getElementById('added-subtasks');
    ref.innerHTML = '';
    let subtaskArray = task.subtasks.map(element => element.subtaskName);
    console.log(subtaskArray);
    for (let subtaskIndex = 0; subtaskIndex < subtaskArray.length; subtaskIndex++) {
        const element = subtaskArray[subtaskIndex];
        ref.innerHTML += renderSubtaskTemp(element);
    }
}


async function updateTask(event, apiKey){
    event.preventDefault();
    let taskRef = document.getElementById('task-overlay-menu');
    collectedFormInfos = await getEmptyTaskTemplate();
    collectFormInformation('add-task-form');
    collectCategory();
    collectSubTasks(new FormData(document.getElementById('add-task-form')));
    collectAssingTo();
    await patchDataToApi(`tasks/${apiKey}/`, collectedFormInfos);
    await getDataFromServer("tasks", tasksFromApi);
    let task = tasksFromApi.find(element => element.apiKey === apiKey);
    taskRef.innerHTML = await getTaskOverlayTemp(task); 
}