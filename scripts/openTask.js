

let assignedUsersArray = [];

async function openTask(taskId){
    let taskRef = document.getElementById('task-overlay-menu');
    await getDataFromServer("tasks", tasksFromApi);
    console.log(tasksFromApi);
    let task = tasksFromApi.find(element => element.id === taskId);
    console.log(task);
    taskRef.innerHTML = await getTaskOverlayTemp(task);
    // render infos to overlay
    toggleOverlayMenu('task-overlay-menu', 'task-overlay-mask-container');
    // open overlay
    // close overlay
}

async function getTaskOverlayTemp(task){
    return `<header class="flex-ctr-spbtw overlay-header-wrapper">
                <div class="overlay-task-header-text task-color-${task.task.charAt(0)}">${task.task}</div>
                <div class="close-icon-wrapper flex-ctr-ctr">
                    <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.00005 8.40005L2.10005 13.3C1.91672 13.4834 1.68338 13.575 1.40005 13.575C1.11672 13.575 0.883382 13.4834 0.700049 13.3C0.516715 13.1167 0.425049 12.8834 0.425049 12.6C0.425049 12.3167 0.516715 12.0834 0.700049 11.9L5.60005 7.00005L0.700049 2.10005C0.516715 1.91672 0.425049 1.68338 0.425049 1.40005C0.425049 1.11672 0.516715 0.883382 0.700049 0.700049C0.883382 0.516715 1.11672 0.425049 1.40005 0.425049C1.68338 0.425049 1.91672 0.516715 2.10005 0.700049L7.00005 5.60005L11.9 0.700049C12.0834 0.516715 12.3167 0.425049 12.6 0.425049C12.8834 0.425049 13.1167 0.516715 13.3 0.700049C13.4834 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4834 1.91672 13.3 2.10005L8.40005 7.00005L13.3 11.9C13.4834 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4834 13.1167 13.3 13.3C13.1167 13.4834 12.8834 13.575 12.6 13.575C12.3167 13.575 12.0834 13.4834 11.9 13.3L7.00005 8.40005Z" fill="#2A3647"/>
                    </svg>
                </div>
            </header>
            <h1>${task.title}</h1>
            <section class="overlay-task-body">
                <div>${task.description}</div>
                
                <div>
                    <span>Due date:</span>
                    <span>${task.date}</span>
                </div>
                <div>
                    <span>Priority:</span>
                    <span>${task.priority}
                        <img src="../assets/icons/${getPriorityIconForTaskOverlay(task)}"
                    </span>
                </div>
                <span>Assigned To:</span>
                    ${await getTaskAssignedUsers(task)}
            </section>
    
            `
}

function getPriorityIconForTaskOverlay(task){
    let iconSrc = "";
    switch (task.priority) {
        case "Urgent": iconSrc = "prio-urgent.svg";
            break;

        case "Medium": iconSrc = "prio-medium.svg"
            break;

        case "Low": iconSrc = "prio-low.svg"
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
                        initials = getInitialsForObjectContacts(element);
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


        // get assigned users to array
        // get alle users to array
        // check wich user is asigned
        // create an array
        // create initials for assigned user
        // assign checked user to content with a temp
        // pickup color class for initials background
        // return content


}

function getAssignedUserTemp(name, initials){
    return `<div class="task-user-wrapper">
                    <div class="task-overlay-initials">${initials}</div>
                    <span class="assigned-user-task-overlay">${name}</span>
            </div>`
}