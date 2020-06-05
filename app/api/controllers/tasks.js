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
     tasksList.push({id: task._id, name_from: task.name_from, name_to: task.name_to, department_to: task.department_to,department_from: task.department_from,date_on :task.date_on,approve:task.approve,pending:task.pending});
    }
    res.json({status:"success", message: "tasks list found!!!", data:{tasks: tasksList}});
       
   }
});
 },

 getByName: function(req, res, next) {
    let tasksList = [];
   
  taskModel.find({}, function(err, tasks){
   console.log(req.body.name)
     if (err){
        
      next(err);
     } else{
      
      for (let task of tasks) {
         if(task.name_to==req.body.name && task.pending==true)
         
       tasksList.push({task:task.task,id: task._id, name_from: task.name_from, name_to: task.name_to, department_to: task.department_to,department_from: task.department_from,date_on :task.date_on,approve:task.approve});
      }
      res.json({status:"success", message: "tasks list found!!!", data:{tasks: tasksList}});
         
     }
  });
   },

updateApprove: function(req, res, next) {
  taskModel.findByIdAndUpdate(req.body.id,{approve:req.body.approve,pending:false}, function(err, taskInfo){
if(err)
    next(err);
   else {
    res.json({status:"success", message: "task updated successfully!!!", data:null});
   }
  });
 },

create: function(req, res, next) {
  taskModel.create({ task:req.body.task,name_from: req.body.name_from, name_to: req.body.name_to, date_on:req.body.date_on, department_to:req.body.department_to,department_from:req.body.department_from }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "task added successfully!!!", data: null});
      
    });
 },
 removeAll: function(req, res, next) {
   
  taskModel.remove({}, function(err, tasks){
     if (err){
       console.log(err)
      //next(err);
     } else{
      res.json({status:"success", message: "Tasks deleted!", });
         
     }
  });
   },
getByApproved: function(req, res, next) {
    let tasksList = [];
   
  taskModel.find({}, function(err, tasks){
   console.log(req.body.name)
     if (err){
        
      next(err);
     } else{
      
      for (let task of tasks) {
         if(task.name_from==req.body.name  && task.approve==true)
         
       tasksList.push({task:task.task,id: task._id, name_from: task.name_from, name_to: task.name_to, department_to: task.department_to,department_from: task.department_from,date_on :task.date_on,approve:task.approve});
      }
      console.log(tasksList)
      res.json({status:"success", message: "tasks list found!!!", data:{tasks: tasksList}});
         
     }
  });
   },
   getByRejected: function(req, res, next) {
    let tasksList = [];
   
  taskModel.find({}, function(err, tasks){
   console.log(req.body.name)
     if (err){
        
      next(err);
     } else{
      
      for (let task of tasks) {
         if(task.name_from==req.body.name && task.approve==false && task.pending==false)
         
       tasksList.push({task:task.task,id: task._id, name_from: task.name_from, name_to: task.name_to, department_to: task.department_to,department_from: task.department_from,date_on :task.date_on,approve:task.approve});
      }
      res.json({status:"success", message: "tasks list found!!!", data:{tasks: tasksList}});
         
     }
  });
   },
getFive: function(req, res, next) {
    let tasksList = [];
   
  taskModel.find({}, function(err, tasks){
   console.log(req.body.name)
     if (err){
        
      next(err);
     } else{
      var i=5;
      
      for (let task of tasks) {
         if(task.name_from==req.body.name && task.pending==true) 
       tasksList.push({task:task.task,id: task._id, name_from: task.name_from, name_to: task.name_to, department_to: task.department_to,department_from: task.department_from,date_on :task.date_on,approve:task.approve});
      }
      var rev=tasksList.reverse();
      var result=[]
      var len=5
      if(rev.length<5){
        len=rev.length
      }
      for(var i=0;i<len;i++){
        result.push(rev[i])
      }
      res.json({status:"success", message: "tasks list found!!!", data:{tasks: result}});
         
     }
  });
   },
getByDepartment: function(req, res, next) {
    let tasksList = [];
   
  taskModel.find({}, function(err, tasks){
   console.log(req.body.name)
     if (err){
        
      next(err);
     } else{
      
      for (let task of tasks) {
         if(task.department_to==req.body.department )
         
       tasksList.push({task:task.task,id: task._id, name_from: task.name_from, name_to: task.name_to, department_to: task.department_to,department_from: task.department_from,date_on :task.date_on,approve:task.approve,pending:task.pending});
      }
      res.json({status:"success", message: "tasks list found!!!", data:{tasks: tasksList}});
         
     }
  });
   },

}