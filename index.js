const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const users = require('./routes/users');
const tasks = require('./routes/tasks');
var jwt = require('jsonwebtoken');
const mongoose = require('./config/database');
var cors = require('cors')
const http = require("http");
const socketIo = require("socket.io");
app.use(cors())

app.set('secretKey', 'nodeRestApi');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(logger('dev'));
app.use(bodyParser.json()); 
//app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res){
 res.json({"Test" : "Working"});
});

const server = http.createServer(app);

const io = socketIo(server);



io.on("connection", (socket) => {

  socket.on('create', function (room) {
    socket.join(room);
    console.log(io.sockets.adapter.rooms)
  });
  socket.on('notify', function (room) {
    io.to(room.dept).emit('notify',room.msg);
    console.log("True")
  });
  socket.on('notifyfalse', function (room) {
    io.to(room.dept).emit('notifyfalse',room.msg);
    console.log("False")
  });
  socket.on('task', function (room) {
    io.to(room.dept).emit('task',room.msg);
    console.log("False")
  });

  socket.on("disconnect", () => {
   
    console.log("Client disconnected : ");
    
  });
});



app.use('/users', users);

app.use('/tasks', validateUser, tasks);

function validateUser(req, res, next) {
    jwt.verify(req.headers['xaccesstoken'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
}

app.use(function(req, res, next) {
    let err = new Error('Not Found');
       err.status = 404;
       next(err);
   });


app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

 app.use(function(err, req, res, next) {
    console.log(err);
    
     if(err.status === 404)
      res.status(404).json({message: "Not found"});
     else 
       res.status(500).json({message: "Something looks wrong :( !!!"});
   });

   
server.listen(process.env.PORT || 3001, function(){ console.log('Node server listening on port 3001');});
