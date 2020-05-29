const express = require('express')
const app = express()
const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
mongoose.connect('mongodb+srv://mschan73:a97475729@contextkepper-qhq7g.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false},console.log("mongodb connected"));
const register_user = require("./Model/registeruser")
const PORT=5000;
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs');


app.get('/register', (req, res) => {

   
    res.render('index.ejs');
});

app.post('/register', async(req, res) => {

        let user = new register_user();
        user.email = req.body.email
       const salt= await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(req.body.password, salt)

        
    await user.save()
    
    
     console.log(user);
     res.redirect("/login")
    
 });

app.get('/login', (req, res) => {

    res.render('login.ejs',{token:[]});
});


app.post('/login', async(req, res) => {

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
  


app.get('/token/:id', (req, res) => {

    res.render('token.ejs',{token:req.params.id});
});

app.get('/change_password', (req, res) => {

    res.render('change_password.ejs')
});

app.post('/change_password', async(req, res) => {

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

app.listen(5000, () => {
    console.log('App listening on port 5000!');
});