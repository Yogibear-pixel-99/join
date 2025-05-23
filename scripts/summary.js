/**
 * Initialize the whol summary, getting user data and show greeting message.
 */
async function initSummary() {
  setTimeout(() => {removeDisplayNone("loading-spinner");}, 100);
  await getUserSummaryInfo();
  showGreeting();
  setTimeout(() => {addDisplayNone("loading-spinner");}, 100);
}


/**
 * Get user and task data from the api and load the summary.
 */
async function getUserSummaryInfo() {
  await getDataFromServer("users", usersFromApi);
  await getDataFromServer("tasks", tasksFromApi);
  loadSummary();
}


/**
 * Link to the board html site.
 */
function directToBoard() {
  window.location.href = "../html/board.html";
}


/**
 * Checks if user is logged in and calls the template for the summary.
 */
function loadSummary() {
  let mainSummaryREF = document.getElementById("summary-main");

  mainSummaryREF.innerHTML = summaryTemplate(
    getUserName(),
    getTime(),
    toDoCounter(),
    doneCounter(),
    inProgressCounter(),
    awaitFeedbackCounter(),
    urgentCounter(),
    getClosestDate()
  );
}


/**
 * Check if a user is logged in.
 *
 * @returns - The name of the user or "guest" for the summary template.
 */
function getUserName() {
  emailIndex = sessionStorage.getItem("indexOfUser");
  let userName;
  if (emailIndex === null) {
    userName = "Guest";
  } else {
    userName = usersFromApi[emailIndex].name;
  }
  return userName;
}


/**
 * Checks the actuall time.
 *
 * @returns - A greeting message for the summary template, depending on the time.
 */
function getTime() {
  let time = new Date().getHours();
  let greeting;
  if (time < 15) {
    greeting = "Good morning";
  } else if (time < 20) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening ";
  }
  return greeting;
}


/**
 * Checks how many tasks are in the taskmenu todo.
 *
 * @returns - The number of all todo tasks for the summary template.
 */
function toDoCounter() {
  let toDoCounter = 0;
  for (let task of tasksFromApi) {
    if (task.status === "todo") {
      toDoCounter++;
    }
  }
  return toDoCounter;
}


/**
 * Checks how man tasks are finished.
 *
 * @returns - The number of all finished tasks for the summary template.
 */
function doneCounter() {
  let doneCounter = 0;
  for (let task of tasksFromApi) {
    if (task.status == "done") {
      doneCounter++;
    }
  }
  return doneCounter;
}


/**
 * Checks how many tasks are in progress.
 *
 * @returns - The number of all in progress tasks for the summary template.
 */
function inProgressCounter() {
  let inProgressCounter = 0;
  for (let index = 0; index < tasksFromApi.length; index++) {
    if (tasksFromApi[index].status == "inprogress") {
      inProgressCounter++;
    }
  }
  return inProgressCounter;
}


/**
 * Checks how many tasks are awaiting feedback.
 *
 * @returns - The number of all awaiting feedback tasks for the summary template.
 */
function awaitFeedbackCounter() {
  let awaitFeedbackCounter = 0;
  for (let index = 0; index < tasksFromApi.length; index++) {
    if (tasksFromApi[index].status == "awaitfeedback") {
      awaitFeedbackCounter++;
    }
  }
  return awaitFeedbackCounter;
}


/**
 * Checks how many tasks have the priority urgent.
 *
 * @returns - The number of all priority urgent tasks for the summary template.
 */
function urgentCounter() {
  let urgentCounter = 0;
  for (let index = 0; index < tasksFromApi.length; index++) {
    if (tasksFromApi[index].priority == "Urgent") {
      urgentCounter++;
    }
  }
  return urgentCounter;
}


/**
 * Gets all dates from the api, sort them and check the closest date for the next task to finish.
 *
 * @returns - The closest date as a string.
 */
function getClosestDate() {
  if (tasksFromApi.length != 0) {
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    let sortedDateArray = tasksFromApi.map((element) => element.date.split("/").reverse().join());
    sortedDateArray = sortedDateArray.map((element) => element.replace(/,/g, "")).sort((a, b) => a - b);
    let newestDate = sortedDateArray[0];
    let year = newestDate.slice(0, 4);
    let month = months[getMonthNumber(newestDate.slice(4, 6)) - 1];
    let day = newestDate.slice(6, 8);
    return dateTemp(day, month, year);
  } else {
    return "No task to finish";
  }
}


/**
 * Reduces the month to a integer, wich is used to get the month name from an array.
 *
 * @param {integer} month
 * @returns - A integer to use for an arrayposition.
 */
function getMonthNumber(month) {
  if (month.charAt(0) === "0") {
    month = month.replace("0", "");
    return parseInt(month);
  }
}


/**
 * Creates a date template for the summary.
 *
 * @param {integer} day
 * @param {string} month
 * @param {integer} year
 * @returns - Returns the date template.
 */
function dateTemp(day, month, year) {
  return `<span>${month}</span>
          <span>${day},</span>
          <span>${year}</span>`;
}


/**
 * Checks if a user is logged in and calls a greeting function.
 */
function showGreeting() {
  emailIndex = sessionStorage.getItem("indexOfUser");
  let userName;
  if (emailIndex === null) {
    userName = "Guest";
  } else {
    userName = usersFromApi[emailIndex].name;
  }
  addGreetingAnimation(userName);
}


/**
 * Checks the screen width and calls a greeting animation for the logged in user or a guest.
 *
 * @param {string} userName - The name of the logged in user.
 */
function addGreetingAnimation(userName) {
  if (window.innerWidth <= 1024) {
    let nameRef = document.getElementById("summary-greeting-text-overlay-user");
    let guestRefContent = document.getElementById("summary-greeting-overlay-guest");
    let userRefContent = document.getElementById("summary-greeting-overlay-user");
    let greeting = getTime();
    ref = document.querySelectorAll(".greeting-text");
    ref.forEach((element) => {element.innerText = greeting;});
    nameRef.innerText = userName;
    userName !== "Guest" && userName ? showGreetingAnimation(userRefContent) : showGreetingAnimation(guestRefContent);
  }
}


/**
 * Displays the greeting animation.
 *
 * @param {HTMLElement} userRef - The container to be displayed.
 */
function showGreetingAnimation(userRef) {
  userRef.classList.remove("d-none");
  userRef.classList.add("summary-greeting-animation");
  setTimeout(() => {
    userRef.classList.remove("summary-greeting-animation");
  }, 3000);
  setTimeout(() => {
    userRef.classList.add("d-none");
  }, 3000);
}
