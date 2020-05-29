const express = require("express")
const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    email: {
      type: String,
      
    },
    password: {
      type: String,
    }
  });

  module.exports  = mongoose.model('register_user', registerSchema);
 