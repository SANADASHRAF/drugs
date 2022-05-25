const pharmacy=require('../model/pharmacies');

const mongoose=require('mongoose');

//mongoose connect to db
mongoose.connect('mongodb://localhost/druggs' , {useNewUrlParser :true} ,(error)=>{
  if(error)
  {
  console.log(error);
  }else
  {
  console.log('connect to database ....');
  }
})




//object from schema to save product
const pharmacies=[
    new pharmacy({

        pharmacyname:'ddddddddddd',
        location:'menofia',
    }),

   
    new pharmacy({

        pharmacyname:'loratadine',
        location:'cairo',
    }),
    new pharmacy({

        pharmacyname:'loratadine',
        location:'giza',
    }),

    new pharmacy({

        pharmacyname:'loratadine',
        location:'behara',
    }),



]



//save that prodect with loop
var done=0;
for(var i=0;i<pharmacy.length;i++)
{
    pharmacies[i].save((error,doc)=>{
        if(error)
        {
            console.log(error);
        }
        console.log(doc);
        done ++
        if(done===pharmacies.length){
            //after finish disconnect to mongo as it connet in app.js
            mongoose.disconnect();
        }
    })
}

