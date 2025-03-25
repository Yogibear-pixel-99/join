




function initBoard() {
    loadAndRenderTasks();
   }
   
   async function loadAndRenderTasks() {
       await getDataFromServer('users', usersFromApi);
       await getDataFromServer('tasks', tasksFromApi);
       renderBoard();
   }
   

   function renderBoard() {
    let todo = document.getElementById('boardToDoCard');
    let prog = document.getElementById('boardInprogressCard');
    let feed = document.getElementById('boardAwaitFeedbackCard');
    let done = document.getElementById('boardDoneCard');

    clearBoardColums(todo, prog, feed, done);
    fillBoardColums(tasksFromApi,todo, prog, feed, done);
    checkEmptyColums(todo, prog, feed, done);

}

function clearBoardColums(todo, prog, feed, done) {
    todo.innerHTML = '';
    prog.innerHTML = '';
    feed.innerHTML = '';
    done.innerHTML = '';
}

function fillBoardColums(tasks, todo, prog, feed, done) {
    let input = -1;
      tasks.forEach(task => {
          input ++;
          let cardHtml = createTaskCard(task, input);
          if (task.status === 'toDo') todo.innerHTML += cardHtml;
          if (task.status === 'inProgress') prog.innerHTML += cardHtml;
          if (task.status === 'awaitFeedback') feed.innerHTML += cardHtml;
          if (task.status === 'done') done.innerHTML += cardHtml;
      })
  }

  function checkEmptyColums(todo, prog, feed, done) {
    if(!todo.innerHTML.trim()) {
        todo.innerHTML = `<div class="no-tasks">no-task in progress</div>`;
    }
    if(!prog.innerHTML.trim()) {
        prog.innerHTML = `<div class="no-tasks">no-task in progress</div>`;
    }
    if(!feed.innerHTML.trim()) {
        feed.innerHTML = `<div class="no-tasks">no-task in progress</div>`;
    }
    if(!done.innerHTML.trim()) {
        done.innerHTML = `<div class="no-tasks">no-task in progress</div>`;
    }
}


function getInitialsForName(fullName) {
    if (!fullName) return '';
    let parts = fullName.trim().split(' ');
    if (parts.length < 2) {
        return fullName.charAt(0).toUpperCase();
    }
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[1].charAt(0).toUpperCase()
    );
}


function renderAssignedUsers(task) {
    if (!task.assignTo || !task.assignTo.length) {
      return '';
    }
  
    return task.assignTo.map(email => {
      let user = usersFromApi.find(u => u.email === email);
  
      if (user) {
        let initials = getInitialsForName(user.name);
        return `<div class="contact-list-initals">${initials}</div>`;
      } else {
        return `<div class="contact-list-initals">??</div>`;
      }
    }).join('');
  }
  
  function getPriorityIconHTML(priority) {
    if (!priority) return '';
  
    let prio = priority.toLowerCase();
    if (prio === 'urgent') {
      return `<img src="../assets/icons/prio-urgent.svg" class="task-priority-icon" alt="Urgent" />`;
    } else if (prio === 'medium') {
      return `<img src="../assets/icons/prio-medium.svg" class="task-priority-icon" alt="Medium" />`;
    } else if (prio === 'low') {
      return `<img src="../assets/icons/prio-low.svg" class="task-priority-icon" alt="Low" />`;
    }
    return '';
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
        addtaskREF.classList.toggle("d-none")
        }, 3000);
      }





// SEARCH TASKS ----------------------------------------------------------
function searchForTask() {
 let inputTaskREF = document.getElementById("find-task");
 let inputTaskValue = inputTaskREF.value.toLowerCase();
 findTask(inputTaskValue);
}


function findTask(inputTaskValue) {
    for (let index = 0; index < tasksFromApi.length; index++) {
       let titleTaskREF = document.getElementById("titleTask" + index)
       let descriptionTaskREF = document.getElementById("titleDescription" + index)
       let titleTaskValue = titleTaskREF.innerText.toLowerCase();
       let descriptionValue = descriptionTaskREF.innerText.toLowerCase();
       if (titleTaskValue.includes(inputTaskValue) || inputTaskValue == " "  || descriptionValue.includes(inputTaskValue)) {
        titleTaskREF.parentElement.classList.remove("d-none");
       } else {
        titleTaskREF.parentElement.classList.add("d-none");
       }
    }
}


function createTaskCard(task, input) {
    let assignedHTML = renderAssignedUsers(task);
    let priorityHTML = getPriorityIconHTML(task.priority);
    
  
    return `
      <div class="task-card" id="task-${task.title.replace(/\s+/g, '-')}" onclick="openTask('${task.id}')" draggable="true" data-status="${task.status}">
      <div class="task-type-container">
      <div class="task-type">${task.task}</div>
      </div>
      <div class="task-title" id="titleTask${input}">${task.title}</div>
      <div class="task-description" id="titleDescription${input}">${task.description}</div>
      <div class="task-subtask-info">
        <div class="subtask-progressbar">
          <!-- width: 50% hier nur beispielhaft statisch -->
          <div class="subtask-progress" style="width: 50%;"></div>
        </div>
        <span class="subtask-count">1/2 Subtasks</span>
      </div>
      <div class="task-meta-assignend-user-container"> 
      <div class="task-meta">
        ${priorityHTML}
      </div>
      <div class="task-assigned-users">
        ${assignedHTML}
      </div>
      </div>
      
    </div>

    `;
  }