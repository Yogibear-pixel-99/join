let userInfoList = [];


function initSummary() {
    getUserSummaryInfo();
}

async function getUserSummaryInfo() {
    await getDataFromServer("users", usersFromApi);
    await getDataFromServer('tasks', tasksFromApi);
    loadUserArray();
  }

function directToBoard() {
  window.location.href = "board.html";
}
function loadUserArray() {
    emailIndex = sessionStorage.getItem("indexOfUser");
    userInfoList = [];
  for (let index = 0; index < usersFromApi.length; index++) {
    userInfoList.push({
      name: usersFromApi[index].name,
      email: usersFromApi[index].email,
      password: usersFromApi[index].password,
    });
  }  
  loadSummary();
}

function loadSummary() {
    if (emailIndex === null) {
        sessionStorage.setItem("userLoggedIn", false)
        loadSummaryGuest();
    } else {
        summaryLoginData();
    }
}

function loadSummaryGuest() {
    let mainSummaryREF = document.getElementById("summary-main");
    mainSummaryREF.innerHTML += summaryTemplateGuest(getTime(), toDoCounter(), doneCounter(), inProgressCounter(), awaitFeedbackCounter(), urgentCounter(), getClosestDate());
}

function summaryLoginData() {  
  let mainSummaryREF = document.getElementById("summary-main");
  mainSummaryREF.innerHTML = summaryTemplate(userInfoList[emailIndex].name, getTime(), toDoCounter(), doneCounter(), inProgressCounter(), awaitFeedbackCounter(), urgentCounter(), getClosestDate())
}

function getTime() {
    let time = new Date().getHours();
    let greeting;
    if (time < 15) {
        greeting = "Good morning";
    } else if (time <20) {
        greeting = "Good afternoon"
    } else {
        greeting = "Good evening "
    }
    return greeting;
}

function toDoCounter() {
    let toDoCounter = 0;
    for (let index = 0; index < tasksFromApi.length; index++) {
        if (tasksFromApi[index].status == "todo") {
            toDoCounter++;
        }  
    }
    return toDoCounter;
}

function doneCounter() {
  let doneCounter = 0;
  for (let index = 0; index < tasksFromApi.length; index++) {
      if (tasksFromApi[index].status == "done") {
          doneCounter++;
      } 
  }
  return doneCounter;
}

function inProgressCounter() {
  let inProgressCounter = 0;
  for (let index = 0; index < tasksFromApi.length; index++) {
      if (tasksFromApi[index].status == "inprogress") {
        inProgressCounter++;
      } 
  }
  return inProgressCounter;
}

function awaitFeedbackCounter() {
  let awaitFeedbackCounter = 0;
  for (let index = 0; index < tasksFromApi.length; index++) {
      if (tasksFromApi[index].status == "awaitfeedback") {
        awaitFeedbackCounter++;
      } 
  }
  return awaitFeedbackCounter;
}

function urgentCounter() {
  let urgentCounter = 0;
  for (let index = 0; index < tasksFromApi.length; index++) {
      if (tasksFromApi[index].priority == "Urgent") {
        urgentCounter++;
      } 
  }
  return urgentCounter;
}

function summaryTemplateGuest(time, toDo, done, inProgress, awaitFeedback, urgent, closestDate) {
    return `  <header class="header-container">
        <span class="header-text">Kanban Project Management Tool</span>
        <div class="header-logos-right">
          <a href="../html/help.html">
          <img
            class="help-logo"
            src="../assets/icons/help.svg"
            alt="helplogo"
          />
        </a>
          <div onclick="toggleDropdown()" class="header-initials">G</div>
        </div>
      </header>
      <div class="dropdown-menu d-none" id="dropdown">
        <a href="./legalnotice.html">
          <div class="dropdown-text">Legal Notice</div>
        </a>
        <a href="./Privacypolicy.html">
          <div class="dropdown-text">Privacy Policy</div>
        </a>
        <a href="./login.html">
          <div class="dropdown-text">Log out</div>
        </a>
      </div>
    
      <div id="main-content" class="main-content summary">
        <div class="main-content-header">
          <h1>Join 360</h1>
          <div class="line"></div>
          <span class="header-text">Key Metrics at a Glance</span>
        </div>
        <div class="bottom-summary">
          <div class="bottom-top-summary">
            <div onclick="directToBoard()" class="to-do-summary">
              <svg
                width="69"
                height="70"
                viewBox="0 0 69 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  class="to-do-circle-summary"
                  cx="34.5"
                  cy="35"
                  r="34.5"
                  fill="#2B3647"
                />
                <mask
                  id="mask0_290159_6053"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="18"
                  y="19"
                  width="33"
                  height="32"
                >
                  <rect x="18.5" y="19" width="32" height="32" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_290159_6053)">
                  <path
                    class="to-do-path-summary"
                    d="M25.1667 44.3332H27.0333L38.5333 32.8332L36.6667 30.9665L25.1667 42.4665V44.3332ZM44.2333 30.8998L38.5667 25.2998L40.4333 23.4332C40.9444 22.9221 41.5722 22.6665 42.3167 22.6665C43.0611 22.6665 43.6889 22.9221 44.2 23.4332L46.0667 25.2998C46.5778 25.8109 46.8444 26.4276 46.8667 27.1498C46.8889 27.8721 46.6444 28.4887 46.1333 28.9998L44.2333 30.8998ZM42.3 32.8665L28.1667 46.9998H22.5V41.3332L36.6333 27.1998L42.3 32.8665Z"
                    fill="white"
                  />
                </g>
              </svg>
              <div class="content-summary">
                <h2 class="quantity-summary">${toDo}</h2>
                <h2 class="text-summary">To-do</h2>
              </div>
            </div>
            <div onclick="directToBoard()" class="done-summary">
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  class="done-circle-summary"
                  cx="35"
                  cy="35"
                  r="34.5"
                  fill="#2A3647"
                />
                <path
                  class="done-path-summary"
                  d="M20.0283 35.0001L31.2571 46.0662L49.9717 23.9341"
                  stroke="white"
                  stroke-width="7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="content-summary">
                <h2 class="quantity-summary">${done}</h2>
                <h2 class="text-summary">Done</h2>
              </div>
            </div>
          </div>

          <div class="bottom-middle-summary">
            <div onclick="directToBoard()" class="urgent-summary">
              <div class="urgent-left-summary">
                <img src="../assets/icons/urgent.svg" alt="" />
                <div class="content-summary">
                  <h2 class="quantity-summary">${urgent}</h2>
                  <h2 class="text-summary">Urgent</h2>
                </div>
              </div>
              <div class="urgent-line-summary"></div>
              <div class="content-summary">
                <h2 class="date-summary">${closestDate}</h2>
                <h2 class="deadline-summary">Upcomming Deadline</h2>
              </div>
            </div>
            <div class="welcome-summary">
              <h2 class="welcome-text-summary">${time}</h2>
            </div>
          </div>

          <div class="bottom-end-summary">
            <div onclick="directToBoard()" class="bottom-end-left-box-summary">
              <div class="content-summary">
                <h2 class="end-quantity-summary">${tasksFromApi.length}</h2>
                <h2 class="end-text-summary">Tasks in Board</h2>
              </div>
            </div>
            <div onclick="directToBoard()" class="bottom-end-middle-box-summary">
              <div class="content-summary">
                <h2 class="end-quantity-summary">${inProgress}</h2>
                <h2 class="end-text-summary">Tasks in Progress</h2>
              </div>
            </div>
            <div onclick="directToBoard()" class="bottom-end-right-box-summary">
              <div class="content-summary">
                <h2 class="end-quantity-summary">${awaitFeedback}</h2>
                <h2 class="end-text-summary">Awaiting Feedback</h2>
              </div>
            </div>
          </div>
        </div>
      </div>`
}


function summaryTemplate(name, time, toDo, done, inProgress, awaitFeedback, urgent, closestDate) {
    return `<header class="header-container">
        <span class="header-text">Kanban Project Management Tool</span>
        <div class="header-logos-right">
          <a href="../html/help.html">
          <img
            class="help-logo"
            src="../assets/icons/help.svg"
            alt="helplogo"
          />
        </a>
          <div onclick="toggleDropdown()" class="header-initials">${name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}</div>
        </div>
      </header>
      <div class="dropdown-menu d-none" id="dropdown">
        <a href="./legalnotice.html">
          <div class="dropdown-text">Legal Notice</div>
        </a>
        <a href="./Privacypolicy.html">
          <div class="dropdown-text">Privacy Policy</div>
        </a>
        <a href="./login.html">
          <div class="dropdown-text">Log out</div>
        </a>
      </div>

      <div id="main-content" class="main-content summary">
        <div class="main-content-header">
          <h1>Join 360</h1>
          <div class="line"></div>
          <span class="header-text">Key Metrics at a Glance</span>
        </div>
        <div class="bottom-summary">
          <div class="bottom-top-summary">
            <div onclick="directToBoard()" class="to-do-summary">
              <svg
                width="69"
                height="70"
                viewBox="0 0 69 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  class="to-do-circle-summary"
                  cx="34.5"
                  cy="35"
                  r="34.5"
                  fill="#2B3647"
                />
                <mask
                  id="mask0_290159_6053"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="18"
                  y="19"
                  width="33"
                  height="32"
                >
                  <rect x="18.5" y="19" width="32" height="32" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_290159_6053)">
                  <path
                    class="to-do-path-summary"
                    d="M25.1667 44.3332H27.0333L38.5333 32.8332L36.6667 30.9665L25.1667 42.4665V44.3332ZM44.2333 30.8998L38.5667 25.2998L40.4333 23.4332C40.9444 22.9221 41.5722 22.6665 42.3167 22.6665C43.0611 22.6665 43.6889 22.9221 44.2 23.4332L46.0667 25.2998C46.5778 25.8109 46.8444 26.4276 46.8667 27.1498C46.8889 27.8721 46.6444 28.4887 46.1333 28.9998L44.2333 30.8998ZM42.3 32.8665L28.1667 46.9998H22.5V41.3332L36.6333 27.1998L42.3 32.8665Z"
                    fill="white"
                  />
                </g>
              </svg>
              <div class="content-summary">
                <h2 class="quantity-summary">1</h2>
                <h2 class="text-summary">To-do</h2>
              </div>
            </div>
            <div onclick="directToBoard()" class="done-summary">
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  class="done-circle-summary"
                  cx="35"
                  cy="35"
                  r="34.5"
                  fill="#2A3647"
                />
                <path
                  class="done-path-summary"
                  d="M20.0283 35.0001L31.2571 46.0662L49.9717 23.9341"
                  stroke="white"
                  stroke-width="7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="content-summary">
                <h2 class="quantity-summary">${done}</h2>
                <h2 class="text-summary">Done</h2>
              </div>
            </div>
          </div>

          <div class="bottom-middle-summary">
            <div onclick="directToBoard()" class="urgent-summary">
              <div class="urgent-left-summary">
                <img src="../assets/icons/urgent.svg" alt="" />
                <div class="content-summary">
                  <h2 class="quantity-summary">${urgent}</h2>
                  <h2 class="text-summary">Urgent</h2>
                </div>
              </div>
              <div class="urgent-line-summary"></div>
              <div class="content-summary">
                <h2 class="date-summary">${closestDate}</h2>
                <h2 class="deadline-summary">Upcomming Deadline</h2>
              </div>
            </div>
            <div class="welcome-summary">
              <h2 class="welcome-text-summary">${time},</h2>
              <h2 class="welcome-name-summary">${name}</h2>
            </div>
          </div>

          <div class="bottom-end-summary">
            <div onclick="directToBoard()" class="bottom-end-left-box-summary">
              <div class="content-summary">
                <h2 class="end-quantity-summary">${tasksFromApi.length}</h2>
                <h2 class="end-text-summary">Tasks in Board</h2>
              </div>
            </div>
            <div onclick="directToBoard()" class="bottom-end-middle-box-summary">
              <div class="content-summary">
                <h2 class="end-quantity-summary">${inProgress}</h2>
                <h2 class="end-text-summary">Tasks in Progress</h2>
              </div>
            </div>
            <div onclick="directToBoard()" class="bottom-end-right-box-summary">
              <div class="content-summary">
                <h2 class="end-quantity-summary">${awaitFeedback}</h2>
                <h2 class="end-text-summary">Awaiting Feedback</h2>
              </div>
            </div>
          </div>
        </div>
      </div>`
}

function getClosestDate(){
  const months = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];
  let sortedDateArray = tasksFromApi.map(element => element.date.split('/').reverse()).sort((a, b) => a - b);
  console.log(sortedDateArray);
  let day = sortedDateArray[0][2];
  let year = sortedDateArray[0][0]
  let month = months[getMonthNumber(sortedDateArray[0][1])];
  return dateTemp(day, month, year);
}

function getMonthNumber(month){
    if (month.charAt(0) === '0') {
    month = month.replace('0', '');
    console.log(month)
    return parseInt(month);
  }
}

function dateTemp(day, month, year){
  return `<span>${month}</span>
          <span>${day},</span>
          <span>${year}</span>`
}


