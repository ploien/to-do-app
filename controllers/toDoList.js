const Task = require('../models/task');

//Add a task to an already existing task list 
//Get an indivdual list for display on a seperate page
exports.getToDoList = (req, res, next) => {
    //get listId from parameter

    // get list info from dataBase using listId
    return Task.findAll()
    .then(tasks => {
        res.render('pages/toDoList', {
            tasks: tasks
        })
    })
    .catch(err => {console.log(err)})


    //renders page containing the specific list
}

exports.addItem = (req, res, next ) => {
    const listId = '';
    const itemText = '';
    //create new task
    //add to database
    //re-render list
    
}

/****************************************************
 * Route: DELETETASK (AJAX)
 * Descrption: Deletes the selected task from
 * the database and removes it from the users list
 ***************************************************/
 exports.deleteItem = (req, res, next) => {
    
    const itemId = ''

    //delete item from database
    //re-render list
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