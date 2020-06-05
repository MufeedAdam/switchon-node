const mongoose = require('mongoose');

const uri = "mongodb+srv://mufeed:mufeed@cluster0-xn3ih.mongodb.net/test?retryWrites=true&w=majority";
const mongoDB = uri;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;