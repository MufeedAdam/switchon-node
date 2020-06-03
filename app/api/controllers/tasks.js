const taskModel = require('../models/tasks');
module.exports = {

 getById: function(req, res, next) {
  console.log(req.body);
  taskModel.findById(req.params.taskId, function(err, taskInfo){
   if (err) {
    next(err);
   } else {
    res.json({status:"success", message: "task found!!!", data:{tasks: taskInfo}});
   }
  });
 },

getAll: function(req, res, next) {
  let tasksList = [];
taskModel.find({}, function(err, tasks){
   if (err){
    next(err);
   } else{
    for (let task of tasks) {
     tasksList.push({id: task._id, name_from: task.name_from, name_to: task.name_to, department_to: task.department_to,department_from: task.department_from,date_on :task.date_on,approve:task.approve});
    }
    res.json({status:"success", message: "tasks list found!!!", data:{tasks: tasksList}});
       
   }
});
 },

 getByName: function(req, res, next) {
    let tasksList = [];
  taskModel.find({name_from:req.body.name}, function(err, tasks){
     if (err){
      next(err);
     } else{
      for (let task of tasks) {
       tasksList.push({id: task._id, name_from: task.name_from, name_to: task.name_to, department_to: task.department_to,department_from: task.department_from,date_on :task.date_on,approve:task.approve});
      }
      res.json({status:"success", message: "tasks list found!!!", data:{tasks: tasksList}});
         
     }
  });
   },

updateApprove: function(req, res, next) {
  taskModel.findByIdAndUpdate(req.params.taskId,{approve:req.body.approve}, function(err, taskInfo){
if(err)
    next(err);
   else {
    res.json({status:"success", message: "task updated successfully!!!", data:null});
   }
  });
 },

create: function(req, res, next) {
  taskModel.create({ name_from: req.body.name_from, name_to: req.body.name_to, date_on:req.body.date_on, department_to:req.body.department_to,department_from:req.body.department_from }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "task added successfully!!!", data: null});
      
    });
 },
}