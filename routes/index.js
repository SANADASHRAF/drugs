var express = require('express');
var router = express.Router();
const product=require('../model/product');


///خاص بالسشن ببعتة فاضى
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'drugs',success : req.session.success , error:req.session.error });
// });


/* GET home page. */
  router.get('/home', function(req, res, next) {

       ///to show all object in schama
   product.find({},(error,doc)=>{
     if (error) {
       console.log(error);
     } 

     var productgrid=[];
     var callgrid=3;
     for(var i=0;i<doc.length;i+=callgrid)
     {
       productgrid.push(doc.slice(i,i+callgrid))
     }

     res.render('index', { title: 'drugs',products :productgrid });
   })


 
 });

module.exports = router;
