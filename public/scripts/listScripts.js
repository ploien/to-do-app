

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
    //console.log(response);

    let json = await response.json();
    let parsedJson = JSON.parse(json);
    console.log(parsedJson);

    addNewTaskToList(parsedJson);
}

function addNewTaskToList(taskJson) {
    const htmlString = "<ul class=\"list_row\"><li>" + taskJson.taskBody + "</li>" +
        "<li>" + taskJson.creationDate + "</li><li><form action=\"completeTask\"name=\"complete_task\" id=\"complete_task\" method=\"POST\">" +
        "<input type=\"hidden\" name=\"taskId\" value=\"" + taskJson.id + "\"> <button type=\"submit\" name=\"complete_check\">Completed</button></form></li></ul>";

    let incompleteTaskList = document.getElementById("to_do_list");

    let listItem = document.createElement("li");
    listItem.innerHTML = htmlString;

    incompleteTaskList.appendChild(listItem);

}