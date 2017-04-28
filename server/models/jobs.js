var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var JobSchema = new mongoose.Schema({
  company: {type: String, required: true},
  title: {type: String, required: true},
  url: {type: String, required: true},
  requirement: {type: String, default: ""},
  location: {type: String, default: ""},
  last_updated: {type: String, default: ""}
}, {timestamps: true})

var Job = mongoose.model('Job', JobSchema);
