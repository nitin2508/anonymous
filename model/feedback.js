var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Feedback',feedbackSchema);
