



async function openTask(taskId){
    await getDataFromServer("tasks", tasksFromApi);
    console.log(tasksFromApi);
    let task = tasksFromApi.find(element => element.id === taskId);
    console.log(task);
    // render infos to overlay
    toggleOverlayMenu('task-overlay-menu', 'task-overlay-mask-container');
    // open overlay
    // close overlay
}

