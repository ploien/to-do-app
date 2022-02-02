const Task = require('../models/task');
const sequelize = require('../util/mysqlDatabase');


/*************************************************************
 * Route: GETLIST (Page Load)
 * RENDERS /list page
 * The main page for the users task list. 
 * Default behavior is to show tasks added in the last month
 *************************************************************/
exports.getList = (req, res, next) => {
    const date = new Date();
        res.render('pages/list', {
            date: date
        });

}

/**********************************************************
 * Route: ADDTASK (AJAX - no page reload)
 * Adds a task to the  database and reloads the task lists
 **********************************************************/
exports.addTask = (req, res, next ) => {
    const taskBody = req.body.taskBody
    return Task.create({ taskBody: taskBody, creationDate: Date.now(), complete: false })
    .then(newTask => {
        const jsonNewTask = JSON.stringify(newTask);
        res.json(jsonNewTask)
    })    
    .catch(err => { console.log(err) })
};

/****************************************************
 * Route: DELETETASK (AJAX)
 * Descrption: Deletes the selected task from
 * the database and removes it from the users list
 ***************************************************/
exports.deleteTask = (req, res, next) => {
    
    const id = JSON.parse(req.body.id);
    Task.destroy({where: {id: id}})
    .then(result => {
        res.send();
    })
    .catch(err => console.log(err))
}

/********************************************************
 * Route: COMPLETETASK (AJAX)
 * Descrption: Marks a task as complete in the database
 * Results in page reload because od redirect.
 * NOTE: Should be changed to only reload list
 ********************************************************/
exports.completeTask = (req, res, next) => {
    let taskId = req.body.taskId;
    Task.update({ complete: true, completionDate: Date.now() }, { where: { id: taskId } })
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
        
}

/********************************************************
 * ROUTE: Load Incomplete Task List (AJAX)
 * DESCRIPTION: Populates the list of incomplete tasks 
 * according to the user-selected timeframe.
 ********************************************************/
exports.loadIncompleteTasksList = async (req, res, next) => {

    let possibleTimeFrames = req.body
    const timeFrame = await getTimeFrame(possibleTimeFrames);

    //const queryStringIncompleteTasks = "SELECT * FROM tasks WHERE creationDate >= DATE_SUB(NOW(), INTERVAL 1 YEAR) AND complete = false";
    const queryStringIncompleteTasks = await queryForIncompleteTasks(timeFrame);

    return sequelize.query(queryStringIncompleteTasks)
    
    .then(result => {
        const incompleteTasks = result[0];
        res.render('pages/partials/incompleteList', {
            incompleteTasks: incompleteTasks,
        })
    })
    .catch(err => {console.log(err)})
}

/********************************************************
 * ROUTE: Load complete Task List (AJAX)
 * DESCRIPTION: Populates the list of complete tasks 
 * according to the user-selected timeframe.
 ********************************************************/
exports.loadCompleteTasksList = (req, res, next) => {
    const queryStringCompleteTasks = "SELECT * FROM tasks WHERE complete";
    
    return sequelize.query(queryStringCompleteTasks)
    .then(result => {
        const completeTasks = result[0];
        res.render('pages/partials/completeList', {
            completeTasks: completeTasks,
        })
    })
    .catch(err => {console.log(err)})
}


/********************************************************
 * ROUTE: Get Time Frame 
 * DESCRIPTION: Helper method to determine which time frame
 * radio button the user has selected.
 * PARAMETERS:
 *      timeArray: array sent from client side with button information                    
 * NOTES: The timeArray is the information of the radio buttons 
 ********************************************************/
async function getTimeFrame(timeArray) {

    let timeFrame;
    for(let i = 0; i < timeArray.length; i++) {
        if (timeArray[i].checked) {
            timeFrame = timeArray[i];
        }
    }       
    return timeFrame;
}

/**********************************************************************
 * ROUTE: Query For Incomplete Tasks
 * DESCRIPTION: Creates the database queries for appropriate time frame
 * PARAMETERS:
 *      dateRangeInfo: information returned from "getTimeFrame" function                  
 * NOTES: The timeArray is the information of the radio buttons 
 ************************************************************************/
async function queryForIncompleteTasks(dateRangeInfo) {

    let queryString;
    if (dateRangeInfo.value == "custom") {
        queryString = "SELECT * FROM tasks WHERE creationDate <= " + dateRangeInfo.end + " AND creationDate >=" + dateRangeInfo.start + " AND complete = false";
    }
    else {
        queryString = "SELECT * FROM tasks WHERE creationDate >= DATE_SUB(NOW(), INTERVAL 1 " + dateRangeInfo.value + ") AND complete = false";
    }
    return queryString;
}

/**********************************************************************
 * ROUTE: Query For complete Tasks
 * DESCRIPTION: Creates the database queries for appropriate time frame
 * PARAMETERS:
 *      dateRangeInfo: information returned from "getTimeFrame" function                  
 * NOTES: The timeArray is the information of the radio buttons 
 ************************************************************************/
async function queryForCompleteTasks(dateRangeInfo) {

    let queryString;
    if (dateRangeInfo.value == "custom") {
        queryString = "SELECT * FROM tasks WHERE creationDate <= " + dateRangeInfo.end + " AND creationDate >=" + dateRangeInfo.start + " AND complete = true";
    }
    else {
        queryString = "SELECT * FROM tasks WHERE creationDate >= DATE_SUB(NOW(), INTERVAL 1 " + dateRangeInfo.value + ") AND complete = true";
    }
    return queryString;
}
