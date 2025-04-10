

let assignedUsersArray = [];

async function openTask(taskId){
    let taskRef = document.getElementById('task-overlay-menu');
    await getDataFromServer("tasks", tasksFromApi);
    let task = tasksFromApi.find(element => element.id === taskId);
    taskRef.innerHTML = await getTaskOverlayTemp(task);
    toggleOverlayMenu('task-overlay-menu', 'task-overlay-mask-container');
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
    await patchDataToApi(isChecked, location);
    initBoard();
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

