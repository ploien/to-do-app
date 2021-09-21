const Task = require('../models/task');
const sequelize = require('../util/mysqlDatabase');

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
        /*
        .then(results => {
            return Task.findAll()
        })
        .then(tasks => {
            res.render('pages/list', {
                tasks: tasks
            })
        })
        */
        .catch(err => console.log(err))
}

exports.addTask = (req, res, next) => {
    Task.create({ taskBody: req.body.new_task, creationDate: Date.now(), complete: false })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => { console.log(err) })
};

exports.completeTask = (req, res, next) => {
    taskId = req.body.taskId;
    Task.update({ complete: true, completionDate: Date.now() }, { where: { id: taskId } })
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
}