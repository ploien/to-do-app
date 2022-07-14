
//Import Statements
import {setDefaultDates, getTimeFrame, addAddTaskButton} from './listHelperScripts.js'


/*******************************************************
 * Attached to "Show Copmleted Tasks button", it changes
 * the display type from "none" to "inline".
 ****************************************************/
function showComplete() {
    let hiddenElements = document.getElementsByClassName("hidden");

    for (i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].style.display = "inline";
    }
}


/*******************************************************
 * Attached to "Show Copmleted Tasks button", it changes
 * the display type from "inline" to "none".
 ****************************************************/
function hideComplete() {
    let hiddenElements = document.getElementsByClassName("hidden");

    for (i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].style.display = "none";
    }
}

/***********************************************************************
 * This function is fired by the "Add New Task" button, adds a new task
 * to the database, and realods the list of incomplete items.
 ***********************************************************************/
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
    loadIncompleteTasksList();
}

/***********************************************************************
 * This function is fired by the "delete" button attached to each line. 
 * It adds a new task to the database, and realods the list of incomplete items.
 ***********************************************************************/
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
    loadIncompleteTasksList();
}

/*******************************************************************
 * Fetches list of "Incomplete Tasks" and populates the "to_do_List"
 * element
 *******************************************************************/
async function loadIncompleteTasksList() {

    let body = getTimeFrame();
    body = JSON.stringify(body);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: 
            body
    }

    let response = await fetch('/loadIncompleteTasksList', options);
    let html = await response.text();
    document.getElementById("to_do_list").innerHTML = html;
}

/********************************************************************************
 * Fetches list of "Incomplete Tasks" and populates the "to_do_List_complete"
 * element
 ******************************************************************************/
async function loadCompleteTasksList() {

    let body = getTimeFrame();
    body = JSON.stringify(body);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    }
    let response = await fetch('/loadCompleteTasksList', options);
    let html = await response.text();
    document.getElementById("to_do_list_complete").innerHTML = html;
}

/****************************************************************
 * Calls the functions needed to populate page with list info and 
 * set up any button events
 ****************************************************************/
function getLists() {
                                                                          
    loadIncompleteTasksList(); 
    loadCompleteTasksList();
    addAddTaskButton();
}

window.addEventListener('load', setDefaultDates);
window.addEventListener('load', getLists);

export {getLists, addNewTask};