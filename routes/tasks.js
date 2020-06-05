const express = require('express');
const router = express.Router();
const taskController = require('../app/api/controllers/tasks');

router.get('/', taskController.getAll);
router.post('/', taskController.create);
router.post('/getByName', taskController.getByName);
router.get('/:taskId', taskController.getById);
router.post('/update', taskController.updateApprove);
router.get('/removeTasks', taskController.removeAll);
router.post('/getByApproved', taskController.getByApproved);
router.post('/getByRejected', taskController.getByRejected);
router.post('/getFive', taskController.getFive);
router.post('/getByDepartment', taskController.getByDepartment);

module.exports = router;