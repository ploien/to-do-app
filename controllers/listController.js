const Task = require('../models/task')

exports.getList = (req, res, next) => {
    Task.findAll()
        .then(tasks => {
            res.render('pages/list', {
                tasks: tasks
            })
        })
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
    Task.update({complete: true, completionDate: Date.now()}, {where: {id: taskId}})
    .then(result => {
        res.redirect('/')
    })
    .catch(err => console.log(err))
}