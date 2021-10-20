

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

function addNewTaskToList(task) {
    const htmlString = "<ul class=\"list_row\" id=\"" + task.id + "\"><li>" + task.taskBody + "</li>"
    + "<li>" + task.creationDate + "</li>"
     + "<li><form action=\"completeTask\" name=\"complete_task\" id=\"complete_task\" method=\"POST\"><input type=\"hidden\" name=\"taskId\" value=\"" + task.id +"\">"
    + "<button type=\"submit\" name=\"complete_check\">Completed</button></form></li>"
    + "<li><button name=\"delete_task_incomplete\" id=\"delete_task_incomplete\" onclick=\"deleteTask()\">Delete</button></li>"
    + "<li class=\"hide\"><input type=\"hidden\" name=\"taskId\" id=\"taskId\" value=\"" + task.id + "\"></li>"
    + "</ul>";

    console.log(task.creationDate);
    let incompleteTaskList = document.getElementById("to_do_list");

    let listItem = document.createElement("li");
    listItem.id = task.id + "outer"
    listItem.innerHTML = htmlString;

    incompleteTaskList.appendChild(listItem);

}

async function deleteTask() {
    const taskId = JSON.stringify({taskId: document.getElementById("taskId").value});

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: taskId
    }

    let response = await fetch('/deleteTask', options);


    //if(response.status == 200)
}

async function removeFromIncompleteList(taskId) {
    let list = await document.getElementById()
}