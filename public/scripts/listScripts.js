/************************************************** 
* This function gets a task from the new 
* task user input, and adds it to the 'to_do_list'. 
***************************************************/

function showComplete() {
    let hiddenElements = document.getElementsByClassName("hidden");

    for (i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].style.display = "inline";
    }
}

function hideComplete() {
    let hiddenElements = document.getElementsByClassName("hidden");

    for (i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].style.display = "none";
    }
}

//Ajax request to add task to database. Rerequests task lists.
async function addNewTask() {

    const taskBody = JSON.stringify({ taskBody: document.getElementById("new_task").value });
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: taskBody
    }
    let response = await fetch('/addTask', options);
    listLoad();
}

//Ajax request to remove a task from the database/taskslists
async function deleteTask(taskId) {

    const id = JSON.stringify({id: taskId});
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: id
    }
    let response = await fetch('/deleteTask', options);
}

/***********
 * listLoad() 
 * RETURN: Void
 * SUMMARY: Sends an FETCH Post request for all
 * tasks for the current user. Tha data will be filtered
 * on the front-end.
 */
async function loadIncompleteTasksList() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html'
        },
        body: ''
    }
    let response = await fetch('/loadIncompleteTasksList', options);
    let html = await response.text();
    document.getElementById("to_do_list").innerHTML = html;
}

// async function loadCompleteTasksList() {
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'text/html'
//         },
//         body: ''
//     }
//     let response = await fetch('/loadCompleteTasksList', options);
//     let html = await response.text();
//     document.getElementById("to_do_list_complete").innerHTML = html;
// }

// function listLoad() {
//     loadIncompleteTasksList();
//     loadCompleteTasksList();
// }

window.addEventListener('load', loadIncompleteTasksList);

document.getElementById('add_task').addEventListener('click', addNewTask);

// function addDeleteTaskButtonFunction() {
    
//     let deleteTaskButtons = document.getElementsByName('delete_task_incomplete');
//     console.log(deleteTaskButtons);
//     deleteTaskButtons.forEach(button => {
//         const id = button.parentElement.parentElement.id;
//         button.onclick = () => {deleteTask(id)};
//     })
//     console.log(deleteTaskButtons);
// }

// async function removeFromIncompleteList(taskId) {
//     let taskListItem = await document.getElementById(taskId + "outer");
//     taskListItem.remove();
// }

// async function createTaskListIncomplete(taskArray) {
//     taskArray.foreach(task => {
//         addTaskToList(task);
//     })
// }

// function addTaskToList(task) {
//     const htmlString = "<ul class=\"list_row\" id=\"" + task.id + "\">"
//     + "<li>" + task.taskBody + "</li>"
//     + "<li>" + task.creationDate + "</li>"
//     + "<li>"
//     + "<form action=\"completeTask\" name=\"complete_task\" id=\"complete_task\" method=\"POST\">"
//     + "<input type=\"hidden\" name=\"taskId\" value=\"" + task.id +"\">"
//     + "<button type=\"submit\" name=\"complete_check\">Completed</button>"
//     + "</form></li>"
//     + "<li>"
//     + "<button name=\"delete_task_incomplete\" id=\"delete_task_incomplete\" onclick=\"deleteTask(" + task.id + ")\">Delete</button>"
//     + "</li>"
//     + "<li class=\"hide\">"
//         + "<input type=\"hidden\" name=\"taskId\" id=\"taskId\" value=\"" + task.id + "\"></li>"
//     + "</ul>";

//     console.log(task.creationDate);
//     let incompleteTaskList = document.getElementById("to_do_list");

//     let listItem = document.createElement("li");
//     listItem.id = task.id + "outer"
//     listItem.innerHTML = htmlString;

//     incompleteTaskList.appendChild(listItem);
// }
