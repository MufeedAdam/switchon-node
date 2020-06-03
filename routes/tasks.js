const express = require('express');
const router = express.Router();
const taskController = require('../app/api/controllers/tasks');

router.get('/', taskController.getAll);
router.post('/', taskController.create);
router.get('/getByName', taskController.getByName);
router.get('/:taskId', taskController.getById);
router.put('/:taskId', taskController.updateApprove);

module.exports = router;