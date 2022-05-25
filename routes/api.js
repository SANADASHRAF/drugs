// const express = require('express')
// const router = express.Router();
// const user = require("../../Users");
// const product = require('../model/product');

// //*******to get all users in the array*******
// router.get('/', async (req, res) => {
    
//     try{
//        const users = await user.find()
//        res.json(users)
//     }catch(err){
//          res.json({message:err})
//     }
//     })



// //******* to search for a user by username*******
// router.get('/:userId', async  (req, res) => {
//     try{
//         const serusers = await user.findById(req.params.userId)
//         res.json(serusers)
//      }catch(err){
//           res.json({message:err})
//      }
//         //var apppp = req.params.userName;
//         //var user = users.find((obj)=> obj.username == apppp)
//         //if(user == undefined)
//         //{
//         //    res.send("user is not found")  
//         //}else{
//            // console.log(user);
//       //      res.send(user)  
//      //   }


// })




// // *******add new user*******

// router.post('/', async (req, res) => {
    
//     //res.json(
// //req.body
//    // );
     
//     const users = new user({
//         name:req.body.name,
//         username:req.body.username,
//         password:req.body.password
//     });
//     try{
//         const saveusers=await users.save();
//         res.json(saveusers)
//     }
//     catch{
//         res.json("error")
//     }
//     })


//     //*******to Update a user********


// router.put('/:userId' ,async( req ,res )=>
//     {
//         try{
//             const updusers = await user.updateOne({_id : req.params.userId},
//                 {$set:{name:req.body.name,
//                 password:req.body.password } })
//             res.json(updusers)
//          }catch(err){
//               res.json({message:err})
//          }
//     })


//     //*******to delete a user******

// router.delete('/:userId' ,async ( req ,res ,next)=>
// {
    
//     try{
        
//         const removeusers = await user.remove({price : req.params.userId}
//              );
//         res.json(removeusers );
        
//      }catch(err){
//           res.json({message:err})
//      }
// });
// module.exports=router;
///خاص بالسشن ببعتة فاضى
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'drugs',success : req.session.success , error:req.session.error });
// });


/* GET home page. */
// router.get('/home', function(req, res, next) {
//   ///to show all object in schama
//   product.find({},(error,doc)=>{
//     if (error) {
//       console.log(error);
//     } 

//     var productgrid=[];
//     var callgrid=3;
//     for(var i=0;i<doc.length;i+=callgrid)
//     {
//       productgrid.push(doc.slice(i,i+callgrid))
//     }

//     res.render('index', { title: 'drugs',products :productgrid });
//   })


 
// });
