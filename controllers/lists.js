const Task = require('../models/task');
const sequelize = require('../util/mysqlDatabase');


/*************************************************************
 * Route: GETLIST (Page Load)
 * RENDERS /list page
 * The main page for the users task list. 
 * Default behavior is to show tasks added in the last month
 *************************************************************/
exports.getLists = (req, res, next) => {

        //retrieve lists from database

        res.render('pages/lists', {
            //pass list info
        });

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

//Get list info from database (just list title/id's at this point)
function getLists() {
    //get user info

    //get a list of lists and their id's

    return lists;
}

