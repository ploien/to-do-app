function createIncompleteList(taskArray) {


    console.log("Creating List");
    console.log(typeof taskArray);

    
    let incompleteTaskList = document.getElementById("to_do_list");

    createHeaders(incompleteTaskList);

    console.log(taskArray);

    taskArray.forEach(task => {
        addTask(incompleteTaskList, task);
    });
        

};

function createHeaders(parentNode) {

    let listItem = document.createElement("li");

    const htmlHeaderString = "<ul class=\"list_row\">" 
           + "<li><h3>Task</h3></li>"
           + "<li><h3>Created</h3></li>"
           + "<li><h3>Complete</h3></li>"
           + "<li><h3>Delete</h3></li>"
        + "</ul>";
    
    listItem.innerHTML = htmlHeaderString;
    parentNode.appendChild(listItem);
};

function addTask(parentNode, task) {

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

    let listItem = document.createElement("li");
    listItem.id = task.id + "outer"
    listItem.innerHTML = htmlString;

    parentNode.appendChild(listItem);
};

export {createIncompleteList, createHeaders, addTask};