const express = require("express");
const con = require("../../config/db");
const jwt = require('jsonwebtoken');
module.exports.userAuth = (req,res)=>{
 
    const {email,password} = req.body
     console.log(email,password)
    const sqlQuery = `SELECT * FROM users `;
    con.query(sqlQuery,(err,result)=>{
        if(email == result[0].email && password == result[0].password){
            console.log(process.env.SECRETKEY)
            let users = JSON.stringify(result[0])
            console.log(users)
         jwt.sign({users:users},process.env.SECRETKEY,(err,token)=>{
            res.status(200).json({token:token})
         })
        }else{
            res.status(200).json("Invalid login")
        }
    })
}