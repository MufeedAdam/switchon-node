const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
 name_from: {
  type: String,
  trim: true,  
  required: true,
 },
 date_on: {
  type: Date,
  trim: true,
  required: true
 },
 name_to: {
    type: String,
    trim: true,  
    required: true,
   },
department_to: {
    type: String,
    trim: true,  
    required: true,
   },
department_from: {
       type: String,
       trim: true,  
       required: true,
      },
approve:{
    type:Boolean,
    trim:true,
    required:true,
    default:false
}
});
module.exports = mongoose.model('Task', TaskSchema)