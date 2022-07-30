import { getLists, addNewTask, deleteTask } from "./listScripts.js";

/*******************************************************
 * Attached to "Show Copmleted Tasks button", it changes
 * the display type from "none" to "inline".
 ****************************************************/
 function showComplete() {
    let hiddenElements = document.getElementsByClassName("hidden");

    for (let i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].style.display = "inline";
    }
}


/*******************************************************
 * Attached to "Show Copmleted Tasks button", it changes
 * the display type from "inline" to "none".
 ****************************************************/
function hideComplete() {
    let hiddenElements = document.getElementsByClassName("hidden");

    for (let i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].style.display = "none";
    }
}

/*****************************************************
 * Adds an event listener to the "add_task" button that
 * calls the "addNewTask" function
 ******************************************************/
 function addAddTaskButton() {
    let addTaskButton = document.getElementById('add_task');
    console.log(addTaskButton);

    addTaskButton.addEventListener('click', addNewTask);
}

function addDeleteTaskButtons() {
    console.log("in delete button method");
    let deleteButtons = document.getElementsByName("delete_task_incomplete");
    deleteButtons.forEach(button => {
        console.log("Adding delete button event listener");
        button.addEventListener('click', deleteTask(button.id));
    })
}


/**********************************************************************
 * Sets the custome date selection fields to today's date as a default
 ***********************************************************************/
 function setDefaultDates() {

    const today = new Date().toJSON().slice(0,10);
    document.getElementById('start_date').value = today;
    document.getElementById('end_date').value = today;

}

/*****************************************************************
 * Checks for and returns the timeFrame selected by the user in 
 * order to display the relevant results.
 *****************************************************************/
 function getTimeFrame() {
    let dateRangeSelectButtonValues = document.getElementsByName("date_range_select");
    let checkedArray = [];

    let customStart = JSON.stringify(document.getElementById("start_date").value);
    let customEnd = JSON.stringify(document.getElementById("end_date").value);

    dateRangeSelectButtonValues.forEach(button => {
        if (button.value == "custom" ) {
            checkedArray.push({value: button.value, checked: button.checked, start: customStart, end: customEnd});
        } else {
checkedArray.push({value: button.value, checked: button.checked});
        }
    })

    return checkedArray;
}


//set button events
let timeRange_radio_buttons = document.getElementsByName('date_range_select');
let showCompleteButton = document.getElementById("show_complete_tasks");
let hideCompleteButton = document.getElementById("hide_complete_tasks");

timeRange_radio_buttons.forEach(button =>
    {
        button.addEventListener('click', getLists);
    });

showCompleteButton.addEventListener('click', showComplete);
hideCompleteButton.addEventListener('click', hideComplete);


export {setDefaultDates, getTimeFrame, addAddTaskButton, addDeleteTaskButtons};