const Task = require('../models/task');
const sequelize = require('../util/mysqlDatabase');


/*************************************************************
 * Route: GETLIST (Page Load)
 * RENDERS /list page
 * The main page for the users task list. 
 * Default behavior is to show tasks added in the last month
 *************************************************************/
exports.getList = (req, res, next) => {

    const queryStringIncompleteTasks = "SELECT * FROM tasks WHERE creationDate >= DATE_SUB(NOW(), INTERVAL 1 MONTH) AND complete = false";
    const queryStringCompleteTasks = "SELECT * FROM tasks WHERE complete = true ORDER BY completionDate ASC";
    let completeTasks;
    sequelize.query(queryStringCompleteTasks)
        .then(completes => {
            completeTasks = completes;
        })
        .then(result => {
            return sequelize.query(queryStringIncompleteTasks)
        })
        .then(incompleteTasks => {
                        res.render('pages/list', {
                incompleteTasks: incompleteTasks[0],
                completeTasks: completeTasks[0]
            })
        })
        .catch(err => console.log(err))
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
 * Route: INITIALLOADLIST (AJAX)
 * Descrption: Retrieve the user tasks from database and
 * loads two lists: Incomplete Tasks, Complete Tasks 
 ********************************************************/
exports.loadIncompleteTasksList = (req, res, next) => {
    const queryStringIncompleteTasks = "SELECT * FROM tasks WHERE creationDate >= DATE_SUB(NOW(), INTERVAL 1 MONTH) AND complete = false";
    
    return sequelize.query(queryStringIncompleteTasks)
    .then(result => {
        const incompleteTasks = result[0];
        res.render('pages/partials/incompleteList', {
            incompleteTasks: incompleteTasks,
        })
    })
    .catch(err => {console.log(err)})
}

exports.loadCompleteTasksList = (req, res, next) => {
    const queryStringCompleteTasks = "SELECT * FROM tasks WHERE complete";
    
    return sequelize.query(queryStringCompleteTasks)
    .then(result => {
        const completeTask = result[0];
        res.render('pages/partials/completeList', {
            completeTasks: completeTasks,
        })
    })
    .catch(err => {console.log(err)})
}