var express = require('express');
var router = express.Router();

const users=require('../model/user');

//express validator (object) we will use it in array 
const { check, validationResult}=require('express-validator');
const { response } = require('express');
const user = require('../model/user');

/* sign up  users method */
router.post('/signup/',

//evry element in arrary are check
[
  check('email').not().isEmpty().withMessage('please enter your email'),
  check('email').isEmail().withMessage('please enter valid email'),
  check('password').not().isEmpty().withMessage('please enter your pasword'),
  check('password').isLength({min:5}).withMessage('please enter passwword more than 5 char'),
]

,async (req, res, next)=> {
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {
    console.log(errors);
    return;
  }

  ///if there is no errors <<save
  
  const user  = new users({
        email:req.body.email,
        password:req.body.password,
       
    });
    
    
    try{
        const saveusers=await user.save();
        res.json('successfull add')
        res.json(saveusers)

    }
    catch{
        res.json("error")
    }  
});


module.exports = router;
