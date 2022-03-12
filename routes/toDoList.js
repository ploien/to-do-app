const path = require('path'); 
const express = require('express');


const router = express.Router();
const toDoListController = require("../controllers/toDoList");

router.get('/list', toDoListController.getToDoList);

router.post('/addItem', toDoListController.addItem);

router.post('/deleteItem', toDoListController.deleteItem);

module.exports = router;