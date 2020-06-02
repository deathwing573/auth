const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');
const register_user = require("../Model/registeruser")


router.post('/register', async(req, res) => {

    let user = new register_user();
    user.email = req.body.email
   const salt= await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(req.body.password, salt)

    
await user.save()


 console.log(user);
 res.redirect("/login")

});


module.exports = router;