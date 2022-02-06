//this will will be the initial home page with the navigation menu

const path = require('path'); 
const express = require('express');

//Passing in the path declared in path.js which will provide the complete path to this folder
const router = express.Router();
const listController = require("../controllers/listController");
const { route } = require('express/lib/application');

router.get('/', listController.getLists);

router.get('/list/:listId', listController.getToDoList)

router.post('/addTask', listController.addTask);

router.post('/completeTask', listController.completeTask);

router.post('/deleteTask', listController.deleteTask);

module.exports = router;