const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const register_user = require("../Model/registeruser")


router.post('/change_password', async(req, res) => {

    try{
        var decoded = jwt.verify(req.body.jwt, 'secret');
        console.log(decoded.email);
        if(!decoded.email===req.body.email){
            return console.log("wrong email password")
        }
       // let user = new register_user
        const filter = { email:req.body.email  };
        const update = { password: req.body.new_password };
        console.log(req.body.new_password)
    
        let doc = await register_user.findOneAndUpdate(filter, update, {
            new: true
          });
          console.log(doc)
        doc.save()}catch(e){console.log(e.message)}
    
});


module.exports = router;