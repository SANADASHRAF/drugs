const express = require('express')
const router = express.Router();
const users=require('../model/user')


//a get route for adding a cookie
router.get('/setcookie', async(req, res) => {

  const user= await users.find()
    res.cookie("users",user);
    
    res.send('Cookie have been saved successfully');
  });


// get the cookie incoming request
router.get('/getcookie', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
    
});


// delete the saved cookie
router.get('/deletecookie', (req, res) => {
    //show the saved cookies
    res.clearCookie();
    res.send('Cookie has been deleted successfully');
});

  module.exports = router;