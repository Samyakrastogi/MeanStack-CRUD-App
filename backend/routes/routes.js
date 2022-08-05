const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Employee = require('../models/employee.js');

// GET, Post, Push and delete apis
// Base Path of route : https://localhost:3000/employees

// Get API
router.get('/',(req, res)=> {
    Employee.find( (err, doc) =>{
        if(err){
            console.log("Error in Get Data" + err)
        }
        else{
            res.send(doc);
        }
    });
});


// Get Single Employee API
router.get('/:id',(req, res)=> {

    if(ObjectId.isValid(req.params.id)){
        Employee.findById(req.params.id, (err, doc)=>{
            if(err){
                console.log("Error in Get Employee by Id" + err)
            }
            else{
                res.send(doc);
            }
        });
    }
    else{
        return res.status(400).send("No Record Found with id :" + req.params.id)
    }     
});


// Post API
router.post('/',(req, res)=> {
    let emp = new Employee ({
        name : req.body.name,
        position : req.body.position,
        dept : req.body.dept
    });

    emp.save( (err, doc)=>{
        if(err){
            console.log("Error in Post Data" + err)
        }
        else{
            res.send(doc);
        }
    });
});

// Put API
router.put('/:id',(req, res)=> {

    if(ObjectId.isValid(req.params.id)){

        let emp ={
            name : req.body.name,
            position : req.body.position,
            dept : req.body.dept
        };

        Employee.findByIdAndUpdate(req.params.id, {$set : emp}, {new: true}, (err, doc)=>{
            if(err){
                console.log("Error in update Employee by Id" + err)
            }
            else{
                res.send(doc);
            }
        });
    }
    else{
        return res.status(400).send("No Record Found with id :" + req.params.id)
    }
});

// Delete API
router.delete('/:id',(req, res)=> {

    if(ObjectId.isValid(req.params.id)){
        Employee.findByIdAndRemove(req.params.id, (err, doc)=>{
            if(err){
                console.log("Error in Deleing Employee by Id" + err)
            }
            else{
                res.send(doc);
            }
        });
    }
    else{
        return res.status(400).send("No Record Found with id :" + req.params.id)
    }
});

module.exports = router;

