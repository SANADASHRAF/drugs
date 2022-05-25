var express = require('express');
var router = express.Router();

const users=require('../model/user');
const product=require('../model/product');
const farmacy=require('../model/pharmacies');


///express validator (object) we will use it in array 
const { check, validationResult}=require('express-validator');
const { response } = require('express');
const user = require('../model/user');

const jwt=require('jsonwebtoken');

///secret key
const fs = require('fs')
let secret = fs.readFileSync('secret.key')

const bcrypt = require('bcrypt')

// /* GET users listing. */
// router.get('/signup', function(req, res, next) {
  
//   res.send('respond with a resource');
// });


//////////////////////////////////////////////////////////////////////////////////////////////////signup
/* POST users listing. */
router.post('/signup/',
///evry element in arrary are check
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




////////////////////////////////////////////////////////////////////////////////////////////////// profile
router.get('/profile/:email', async (req, res) => {
  let name = {email:req.params.email}
  console.log(name);
});
//////////////////////////////////////////////////////////////////////////////////////////show all product

router.get('/allproduct/', async (req, res) => {
    
  try{
    const pro='reem@gmail.com';
    const x = await users.findOne(pro);
    
   
     const pr = await product.find()
     res.json(pr)
   
   
  }catch(err){
       res.json({message:err})
  }
  })

///////////////////////////////////////////////////////////////////////////////////////////////////show all user
router.get('/alluser', async (req, res) => {
    
  try{
     const pr = await users.find()
     res.json(pr)
  }catch(err){
       res.json({message:err})
  }
  })

  //////////////////////////////////////////////////////////////////////////////////////////////////////////// show all farmacy
  router.get('/allfarmacy', async (req, res) => {
  
    try{
       const pr = await farmacy.find()
       res.json(pr)
    }catch(err){
         res.json({message:err})
    }
    })
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////delete user
    
    router.delete( '/deluser/:id', function( req, res ){
      // check the id if it is valid
      console.log(req.params.id)
     let query = {_id:req.params.id}
    
    users.deleteOne(query, function(err) {
      users.save;
      if(err){
     console.log(err);
     }
    res.send('Success');
   });
  });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////delete product
    
    router.delete( '/delpro/:id', async function( req, res ){
      // check the id if it is valid
      
       
      console.log(req.params.id)
     let query = {_id:req.params.id}
  
    product.deleteOne(query, function(err) {
      product.save;
      if(err){
     console.log(err);
     }
    res.send('Success');
    
   });
  });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////delete pharmacy

    router.delete( '/delfarm/:id', function( req, res ){
      // check the id if it is valid
      console.log(req.params.id)
     let query = {_id:req.params.id}
  
    farmacy.deleteOne(query, function(err) {
      farmacy.save;
      if(err){
     console.log(err);
     }
    res.send('Success');
   });
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////update product
  router.put('/uppro/:ID', (req, res) => {
    product.findOne({
      _id: req.params.ID
    }, (err, product) => {
  
      if (err) {
        return res.send(err);
      }
  
      if (product === null) {
        return res.send({
          msg: 'No matching product with name sam'
        });
      }
  
      console.log(req.body.productname);
      console.log(req.body.price);
      console.log(req.body.companyname); 
      console.log(req.body.Indications);
  
  
      product.productname = req.body.productname;
      product.price = req.body.price;
      product.companyname = req.body.companyname;
      product.Indications = req.body.Indications;
      product.productimg=req.body.productimg;

      product.save(err => {
        if (err) {
  
          res.send(err);
        }
        res.json({message : 'Updated '});
      });
  
    });
  });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////update pharmacy
router.put('/upfarm/:ID', (req, res) => {
  farmacy.findOne({
    _id: req.params.ID
  }, (err, farmacy) => {

    if (err) {
      return res.send(err);
    }

    if (farmacy === null) {
      return res.send({
        msg: 'No matching user with name sam'
      });
    }

    console.log(req.body.pharmacyname);
    console.log(req.body.location);

    farmacy.pharmacyname = req.body.pharmacyname;
    farmacy.location = req.body.location;
    
    farmacy.save(err => {
      if (err) {

        res.send(err);
      }
      res.json({message : 'Updated '});
    });

  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////update user


router.put('/upuser/:ID', (req, res) => {
  users.findOne({
    _id: req.params.ID
  }, (err, users) => {

    if (err) {
      return res.send(err);
    }

    if (users === null) {
      return res.send({
        msg: 'No matching user with that'
      });
    }

    console.log(req.body.email);
    console.log(req.body.password);

    users.email = req.body.email;
    users.password = req.body.password;
    
    users.save(err => {
      if (err) {

        res.send(err);
      }
      res.json({message : 'Updated '});
    });

  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////post(add)pharmacy
router.post('/addfarm',


async (req, res, next)=> {
  

  ///if there is no errors <<save

  const farm  = new farmacy({
        pharmacyname:req.body.pharmacyname,
        location:req.body.location,
       
    });

    console.log(req.body.pharmacyname);
    console.log(req.body.location);


    try{
        const savefarm=await farm.save();
        res.json('done');
       
        
    }
    catch{
        res.json("error")
    }  
});

///////////////////////////////////////////////////////////////////////////////////////////////////////post (add) product

router.post('/addpro',


async (req, res, next)=> {
  

  ///if there is no errors <<save

  const pro  = new product({
    productname:req.body.productname,
    price:req.body.price,
    productimg:req.body. productimg,
    companyname:req.body. companyname,
    Indications:req.body.Indications,
       
    });

    console.log(req.body.productname);
    console.log(req.body.price);
    console.log(req.body.companyname);
    console.log(req.body.Indications);
   

    try{
        const saveproduct=await pro.save();
        res.json('done');
       
        
    }
    catch{
        res.json("error")
    }  
});

module.exports = router;
