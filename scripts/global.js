


let sortedContactsArrayByFirstLetter = [];
MAIN_URL = "https://join-e2ac8-default-rtdb.europe-west1.firebasedatabase.app/";
let contactsFromApi = [];
let tasksFromApi = [];
let usersFromApi = [];
let subtasksFromApi = [];
let collectedFormInfos = {};
let collectedStatusInfo = {};


let assignedUsersArray = [];




const emailREF = document.getElementById("email");
const passwordREF = document.getElementById("password");
const inputLogoREF = document.getElementById("input-logo");
const guestLoginREF = document.getElementById("guest-login");


let emailIndex = -1;


const staticCategories = ["Technical Task", "User Story"];
let selectedCategory = null;
let collectSubTask = []
let savedCategory;
let addTaskStatus = "todo";
let allSubtasks = [];
