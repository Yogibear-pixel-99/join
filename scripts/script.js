

MAIN_URL = "https://join-e2ac8-default-rtdb.europe-west1.firebasedatabase.app/";

// GLOBAL ARRAYS ---------------------------------------
let contactsFromApi = [];
let tasksFromApi = [];
let usersFromApi = [];
let collectedFormInfos = {};
// GLOBAL ARRAYS ---------------------------------------


/**
 * Fetches data from Firebase to specified arrays.
 * 
 * @param {string} objName - The name of the needed object in firebase.
 * @param {array} destination - Storage place of the fetched array.
 */
async function getDataFromServer(objName, destination) {
    try {
        let response = await fetch (MAIN_URL + objName + ".json");
        if (!response.ok) {
            throw new Error('no answer from server');
        } else {
            let data = await response.json();
            let dataArray = [];
            dataArray.splice(0, destination.length, ...Object.values(data));
            destination.splice(0, destination.length, ...dataArray.filter(element => element != null));
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Create the initials from the full name element and add them to the object.
 * 
 * @param {object} user - The user of the needed data in the array.
 * @returns - Returns the first letter of the first and last name. The initials.
 */

function getInitialsForObjectContacts(user){
    const name = user.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const regExp = /\b\p{L}/gu;
    const initialsArray = name.match(regExp);
    return initialsArray.join("");
}

/**
 * Iterate through the whole object and calls a function to create the initials.
 * 
 */
function createInitialsForEachName(destinationArray){
    destinationArray.forEach(element => { 
        element['initials'] = getInitialsForObjectContacts(element);
    })
}

// GLOBALE FUNKTION
function toggleDropdown() {
    let dropdownREF = document.getElementById("dropdown");
    dropdownREF.classList.toggle("d-none");
}


function toggleAddTaskOverlay() {
    let addtaskREF = document.getElementById("addtask-overlay");
    let maskREF = document.getElementById("mask-container");
    let addtaskHideREF = document.getElementById("addtask-content");
    addtaskHideREF.classList.toggle("addtask-content-hide")
    maskREF.classList.toggle("d-none")
    addtaskREF.classList.toggle("d-none")
}


function noClose(event) {
    event.stopPropagation();
}



  // drag and drop 

document.addEventListener("DOMContentLoaded", () => {
    let columns = document.querySelectorAll(".board-single-task-container");

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
    let column = event.currentTarget;

    if (taskCard && column) {
        let newStatus = column.querySelector("span").innerText.toLowerCase().replace(" ", "");
        taskCard.dataset.status = newStatus;

        console.log(`Task ${taskId} moved to ${newStatus}`);
    }

    taskCard.classList.remove("dragging");
}

function dragend(event) {
    event.target.classList.remove("dragging");
}


// assigned to

function toggleAssignedDropdown() {
    const dropdown = document.getElementById("dropdownContent");
    dropdown.classList.toggle("d-none");
    renderDropdown();
  }
function renderDropdown() {
    let dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.innerHTML = '';

    usersFromApi.forEach(user => {
        let userItem = document.createElement("div");
        userItem.classList.add("dropdown-item");
        userItem.innerHTML = `
            <div class="user-item">
                <div class="contact-list-initals flex-ctr-ctr initials-bg-color-A">${getInitialsForObject(user)}</div>
                <span>${user.name}</span>
                <input type="checkbox" data-user-id="${user.email}" class="user-checkbox" onclick="handleCheckboxChange(event)">
            </div>
        `;
        dropdownContent.appendChild(userItem);
    });
}


function getInitialsForObject(user) {
    let name = user.name.split(' ');
    return name[0].charAt(0).toUpperCase() + name[1].charAt(0).toUpperCase();
}


function startSearchingContacts() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let filteredUsers = usersFromApi.filter(user => user.name.toLowerCase().includes(searchInput));
    renderDropdownWithSearchResults(filteredUsers);
}
function renderDropdownWithSearchResults(filteredUsers) {
    let dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.innerHTML = ''; 

    filteredUsers.forEach(user => {
        let userItem = document.createElement("div");
        userItem.classList.add("dropdown-item");
        userItem.innerHTML = `
            <div class="user-item">
                <div class="contact-list-initals flex-ctr-ctr initials-bg-color-A">${getInitialsForObject(user)}</div>
                <span>${user.name}</span>
                <input type="checkbox" data-user-id="${user.email}" class="user-checkbox" onclick="handleCheckboxChange(event)">
            </div>
        `;
        dropdownContent.appendChild(userItem);
    });
}

function handleCheckboxChange(event) {
    const userEmail = event.target.getAttribute("data-user-id");
    const user = usersFromApi.find(u => u.email === userEmail); 
    const addSelectedContactsDiv = document.getElementById("addSelectedContacts");
    if (event.target.checked) {
        const selectedDiv = document.createElement("div");
        selectedDiv.classList.add("selected-contact");
        selectedDiv.innerHTML = `
            <div class="initials-circle">${getInitialsForObjectContacts(user)}</div>
        `;
        addSelectedContactsDiv.appendChild(selectedDiv);

    } else {
        const selectedDivs = addSelectedContactsDiv.querySelectorAll(".selected-contact");
        selectedDivs.forEach(div => {
            let divCheckbox = div.querySelector("input");
            if (divCheckbox.getAttribute("data-user-id") === userEmail) {
                div.remove();
            }
        });
    }
  }
  

function userLoggedIn() {
  let userNavbarREF = document.getElementById("user-navbar");
  let questNavbarREF = document.getElementById("quest-navbar");
  let checkUserLoggedIn = sessionStorage.getItem("userLoggedIn");
  
  if (checkUserLoggedIn == "true") {
    userNavbarREF.classList.toggle("d-none");
  } else {
    questNavbarREF.classList.toggle("d-none");
  }
}