const express = require('express')
const router = express.Router();


router.get('/change_password', (req, res) => {

    res.render('change_password.ejs')
    
});


module.exports = router;