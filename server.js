const express = require('express')
const app = express()
const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const register_user = require("./Model/registeruser")
const PORT= process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('App listening on port 5000!');
});
mongoose.connect('mongodb+srv://mschan73:a97475729@contextkepper-qhq7g.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false},console.log("mongodb connected"));
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs');


app.use('/', require('./Routers/get_register'))

app.use('/', require("./Routers/post_register"))

app.use('/',require("./Routers/get_login"))

app.use('/',require("./Routers/post_login"))

app.use('/',require("./Routers/get_token"))

app.use('/',require("./Routers/get_changepassword"))

app.use('/',require("./Routers/post_changepassword"))
