var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var ctrlAuth = require('../controllers/authentication');
var user = require('../controllers/user');
var categories = require('../controllers/categories');
var task = require('../controllers/task');


// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/users/:userId', user.getUser);
router.get('/categories/:categoriesId', categories.getCategories);
router.post('/task', task.addingTask);
router.get('/tasks/:userId', user.getUserTasks);
router.get('/tasks/:userId/task/:taskId', user.updateTaskStatus);
router.get('/tasks/:userId/taskData/:taskId', user.getTaskData);
router.put('/tasks/:userId/updateTaskData/:taskId', user.updateTaskData);




module.exports = router;
