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
            console.log(incompleteTasks);
            res.render('pages/list', {
                incompleteTasks: incompleteTasks[0],
                completeTasks: completeTasks[0]
            })
        })
        .catch(err => console.log(err))
}

exports.addTask = (req, res, next ) => {
    const taskBody = req.body.taskBody
    return Task.create({ taskBody: taskBody, creationDate: Date.now(), complete: false })
    .then(newTask => {
        const jsonNewTask = JSON.stringify(newTask);
        res.json(jsonNewTask)
    })    
    .catch(err => { console.log(err) })
};

exports.deleteTask = (req, res, next) => {
    
    const id = JSON.parse(req.body.taskId);
    Task.destroy({where: {id: id}})
    .then(result => {
        res.send();
    })
    .catch(err => console.log(err))
}

exports.completeTask = (req, res, next) => {
    let taskId = req.body.taskId;
    Task.update({ complete: true, completionDate: Date.now() }, { where: { id: taskId } })
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

exports.initialLoadList = (req, res, next) => {
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
        .then(result => {
            const incompleteTasks = JSON.stringify(queryStringIncompleteTasks);
            const completeTasks = JSON.stringify(queryStringCompleteTasks);
            res.json({incompleteTasks, completeTasks});
        })
        .catch(err => {console.log(err)})
}