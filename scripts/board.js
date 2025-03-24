



function searchForTask() {
 let inputTaskREF = document.getElementById("find-task");
 let inputTaskValue = inputTaskREF.value.toLowerCase();
 findTask(inputTaskValue);
}


function findTask(inputTaskValue) {
    for (let index = 1; index < 4; index++) {
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