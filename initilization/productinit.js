const product=require('../model/product');

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
const products=[
    new product({

    productname:'loratadine',
    productimg:'public\images\img1.jpg',
    price:270,
    companyname:'motaheda',
    Indications:'Symptomatic treatment of minor allergic reactions (urticaria, allergic conjunctivitis, etc.)'
    }),

    new product({

        productname:'comatrix',
        productimg:'public\images\img2.jpg',
        price:220,
        companyname:'motaheda',
        Indications:' Schedule due to rise, temperatures riseThe drug acts as an antipyretic'
     }),
     new product({

            productname:'glivec',
            productimg:'public\images\img3.jpg',
            price:150,
            companyname:'motaheda',
            Indications:'It is a tyrosine kinase inhibitor used to treat cancer, specifically chronic myelogenous leukemia, or chronic myeloid leukemia.'
      }),
      new product({

        productname:'norgesic',
        productimg:'public\images\img4.jpg',
        price:140,
        companyname:'motaheda',
        Indications:' Norgesic is used to relieve pain, which is considered a pain reliever.'
     }),

]



//save that prodect with loop
var done=0;
for(var i=0;i<product.length;i++)
{
    products[i].save((error,doc)=>{
        if(error)
        {
            console.log(error);
        }
        console.log(doc);
        done ++
        if(done===products.length){
            //after finish disconnect to mongo as it connet in app.js
            mongoose.disconnect();
        }
    })
}

