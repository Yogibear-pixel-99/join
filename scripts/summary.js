function initSummary() {
    getUserSummaryInfo();
}


async function getUserSummaryInfo() {
    await getDataFromServer("users", usersFromApi);
    await getDataFromServer('tasks', tasksFromApi);
    loadSummary();
  }


function directToBoard() {
  window.location.href = "board.html";
}


function loadSummary() {  
  let mainSummaryREF = document.getElementById("summary-main");
  emailIndex = sessionStorage.getItem("indexOfUser");
  let userName;
    if (emailIndex === null) {
      userName = 'Guest';
    } else {
      userName = usersFromApi[emailIndex].name;
    }
  mainSummaryREF.innerHTML = summaryTemplate(userName, getTime(), toDoCounter(), doneCounter(), inProgressCounter(), awaitFeedbackCounter(), urgentCounter(), getClosestDate());
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
    let userIndex =sessionStorage.getItem("indexOfUser");
    let currentUser = usersFromApi[userIndex];
    let toDoCounter = 0;
    for (let task of tasksFromApi) {
      if(task.status === "todo" && task.assigned && task.assigned.some(user => user.email === currentUser.email))
         {
        toDoCounter++; 
    }
}
  return toDoCounter;
}


function doneCounter() {
  let userIndex =sessionStorage.getItem("indexOfUser");
  let currentUser = usersFromApi[userIndex];
  let doneCounter = 0;
  for (let task of tasksFromApi) {
      if (task.status == "done" && task.assigned && task.assigned.some(user => user.email === currentUser.email)) {
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


function summaryTemplate(name, time, toDo, done, inProgress, awaitFeedback, urgent, closestDate) {
    return `<header class="header-container">
        <span class="header-text">Kanban Project Management Tool</span>
                <svg class="header-logo-mobile" width="32" height="39" viewBox="0 0 101 122" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="join-logo-color-change" d="M71.6721 0H49.5143V25.4923H71.6721V0Z" fill="#2A3647"/>
          <path class="join-logo-color-change" d="M49.5142 46.2251H71.6721V82.1779C71.7733 90.8292 69.3112 99.3153 64.5986 106.557C59.9455 113.594 50.963 121.966 34.3446 121.966C16.2434 121.966 5.69286 113.406 0 108.715L13.9765 91.4743C19.533 96.0112 24.885 99.7435 34.4299 99.7435C41.6567 99.7435 44.5372 96.7988 46.2247 94.2307C48.5186 90.6637 49.7052 86.4923 49.6335 82.2464L49.5142 46.2251Z" fill="#2A3647"/>
          <path d="M38.2137 30.1318H16.0559V52.3884H38.2137V30.1318Z" fill="#29ABE2"/>
          <path class="join-logo-color-change" d="M83.2793 111.522C83.2793 116.265 80.8761 118.815 77.5183 118.815C74.1605 118.815 71.9618 115.785 71.9618 111.762C71.9618 107.739 74.2287 104.554 77.7058 104.554C81.1829 104.554 83.2793 107.687 83.2793 111.522ZM74.5355 111.711C74.5355 114.57 75.6775 116.675 77.6376 116.675C79.5977 116.675 80.7056 114.45 80.7056 111.539C80.7056 108.988 79.6829 106.592 77.6376 106.592C75.5923 106.592 74.5355 108.903 74.5355 111.711Z" fill="#2A3647"/>
          <path class="join-logo-color-change" d="M87.6768 104.76V118.593H85.2224V104.76H87.6768Z" fill="#2A3647"/>
          <path class="join-logo-color-change" d="M90.3358 118.593V104.76H93.0629L95.9946 110.461C96.7493 111.952 97.4207 113.483 98.0058 115.049C97.8524 113.337 97.7843 111.368 97.7843 109.177V104.76H100.034V118.593H97.4945L94.5288 112.772C93.7436 111.243 93.0437 109.671 92.4323 108.064C92.4323 109.776 92.5516 111.711 92.5516 114.09V118.576L90.3358 118.593Z" fill="#2A3647"/>
          </svg>
        <div class="header-logos-right">
          <a href="../html/help.html">
          <img
            class="help-logo"
            src="../assets/icons/help.svg"
            alt="helplogo"
          />
        </a>
          <div onclick="toggleDropdown()" class="header-initials">${returnInitials(name)}</div>
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
        <div class="summary-content-header">
          <h1>Join 360</h1>
          <div class="line"></div>
          <span class="summary-header-text">Key Metrics at a Glance</span>
        </div>
        <div class="bottom-summary">

          <div class="summary-wrapper">

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

                        <div class="welcome-summary">
              <h2 class="welcome-text-summary">${time},</h2>
              <h2 class="welcome-name-summary">${name}</h2>
            </div>

        </div>
      </div>`
}


function getClosestDate(){
  const months = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];
  let sortedDateArray = tasksFromApi.map(element => element.date.split('/').reverse().join());
      sortedDateArray = sortedDateArray.map(element => element.replace(/,/g, '')).sort((a, b) => a - b);
  let newestDate = sortedDateArray[0];
  let year = newestDate.slice(0, 4);
  let month = months[getMonthNumber(newestDate.slice(4, 6)) - 1];
  let day = newestDate.slice(6, 8);
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


