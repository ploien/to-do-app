import {createIncompleteList} from '../modules/incompleteList.js'
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

    let json = await response.json();
    let parsedJson = JSON.parse(json);
    console.log(parsedJson);
    addNewTaskToList(parsedJson);
}

function addTaskToList(task) {
    const htmlString = "<ul class=\"list_row\" id=\"" + task.id + "\">"
    + "<li>" + task.taskBody + "</li>"
    + "<li>" + task.creationDate + "</li>"
    + "<li>"
    + "<form action=\"completeTask\" name=\"complete_task\" id=\"complete_task\" method=\"POST\">"
    + "<input type=\"hidden\" name=\"taskId\" value=\"" + task.id +"\">"
    + "<button type=\"submit\" name=\"complete_check\">Completed</button>"
    + "</form></li>"
    + "<li>"
    + "<button name=\"delete_task_incomplete\" id=\"delete_task_incomplete\" onclick=\"deleteTask(" + task.id + ")\">Delete</button>"
    + "</li>"
    + "<li class=\"hide\">"
        + "<input type=\"hidden\" name=\"taskId\" id=\"taskId\" value=\"" + task.id + "\"></li>"
    + "</ul>";

    console.log(task.creationDate);
    let incompleteTaskList = document.getElementById("to_do_list");

    let listItem = document.createElement("li");
    listItem.id = task.id + "outer"
    listItem.innerHTML = htmlString;

    incompleteTaskList.appendChild(listItem);
}

async function createTaskListIncomplete(taskArray) {
    taskArray.foreach(task => {
        addTaskToList(task);
    })
}

async function deleteTask(taskId) {
    console.log("Deleted Task ID: " + taskId);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: taskId
    }

    let response = await fetch('/deleteTask', options);

    removeFromIncompleteList(taskId);


    //if(response.status == 200)
}

async function removeFromIncompleteList(taskId) {
    let taskListItem = await document.getElementById(taskId + "outer");
    taskListItem.remove();
}

async function listLoad() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    }

    let response = await fetch('/initialLoadList', options);
    let json = await response.json();
    const incompleteTasks = JSON.parse(json.incompleteTasks);

    createIncompleteList(incompleteTasks);
}

window.addEventListener('load', listLoad);