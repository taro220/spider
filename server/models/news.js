var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NewsSchema = new mongoose.Schema({
  company: {type: String, require: true},
  title: {type: String, required: true},
  url: {type: String, required: true},
  date: {type:String}
}, {timestamps: true})

var News = mongoose.model('News', NewsSchema);
