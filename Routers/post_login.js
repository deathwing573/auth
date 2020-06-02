const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const register_user = require("../Model/registeruser")


router.post('/login', async(req, res) => {

    try{
        let user = await register_user.findOne( {email:req.body.email });
        console.log(user)
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        console.log(isMatch);
    
        if(isMatch){
        const token =  jwt.sign(
            {
              email: user.email,
            },
            'secret',
            {
              expiresIn: 3600 * 24 * 3
            }
          )
          res.redirect(`/token/${token}`)}}catch(e)
          {
              //console.log(e.message)
          }
    
});


module.exports = router;