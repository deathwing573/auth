const express = require('express')
const router = express.Router();


router.get('/token/:id', (req, res) => {

    

    res.render('token.ejs',{token:req.params.id});

    
});


module.exports = router;