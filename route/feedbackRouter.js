'use strict';
var express = require('express');
var feedbackRouter = express.Router();
var feedback = require('../model/feedback.js');
var bodyParser = require('body-parser');
var verify = require('../verify/verify.js');
feedbackRouter.use(bodyParser.json());
console.log("router");

//feedbackRouter.route('/')
feedbackRouter.get('/read/:username',verify.verifyOrdinaryUser,function(req,res){
    console.log(req.params.username);
    feedback.find({username:req.params.username},function(err,feedback){
        if (err) {throw err;}
        res.json(feedback);
    });
});
feedbackRouter.post('/write',function(req,res){
    if(req.body.id){
        feedback.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true }, function(err,feedback) {
           if (err) throw err;
           res.json(feedback);
       });
    }else{
        feedback.create(req.body,function(err,feedback){
            if (err) {throw err;}
            res.json(feedback);
        });
    }

});

module.exports = feedbackRouter;
