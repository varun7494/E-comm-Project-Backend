const UserSchema = require('../Schemas/UserSchema')
const ProductSchema = require('../Schemas/ProductSchema')
const bcrypt = require('bcrypt')
const CartSchema = require('../Schemas/CartSchema')

exports.getApi = (req,res)=>{
    console.log(req.query.number)
if(Number(req.query.number) % 2 == 0)
{

    res.send(`<h1>Hi || ${req.query.number} is Even Number</h1>`)

}
else
{
    res.send(`<h1>Hi || ${req.query.number} is Odd Number</h1>`)

}
}

exports.loginUser = (req,res ) =>{
    const {email , password} = req.body;
    
    UserSchema.find({email : email}).then((result) =>{
        console.log(result)
        if(result.length > 0)
        {
            
            bcrypt.compare(password ,result[0].password, function(err, status){

                if(err)
                {

                    res.status(500).send({status :  500 , message : "Something went wrong !!please try again"})

                }
                else
                {
                    if(status == true)
                    {
                        res.status(200).send({status :  200 , message : "Login Successfully" , data : result[0] })
                    }
                    else
                    {
                        res.status(400).send({status : 400 , message : "Incorrect Password"})

                    }

                }
            })
        }
        else
        {
            res.status(400).send({status :  400 , message : "User not Registerd !! Register"})
        }
        
    }).catch((err)=>{
        
        res.status(500).send({status :  500 , message : "Something went wrong !!please try again"})
        
    })






}

exports.RegisterUser =(req,res)=>{
    const {name , email , mobile , address, password, gender} =  req.body;
    
    bcrypt.genSalt(10, function(err , salt) {
        if(err)
        {
            req.status(400).send({status : 500, message : "Something went wrong !!please try again "})
        }
        else
        {
            bcrypt.hash(password, salt, function(err, hash){
                if(err)
                {
                    req.status(400).send({status : 500, message : "Something went wrong !!please try again "})
                }
                else
                {
                    UserSchema.insertMany({name  : name , address : address ,  email : email ,  mobile : mobile ,  password :  hash  , gender : gender}).then((result)=>{
        
                        if(result.length > 0)
                        {
                            res.status(200).send({status :  200 , message : "User Registered Successfully"})
                        }
                        else
                        {
                            res.status(400).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})
                        }
                
                    }).catch((err)=>{
                
                if(err.name == 'ValidationError')
                {
                
                    res.status(400).send({status :  400 , message : `${err.message.split('Path')[1]}`})
                }
                else if(err.name == 'MongoBulkWriteError' && err.code == 11000){
                
                    res.status(400).send({status :  400 , message : ` User Alreday exists with these details => ${err.message.split('{')[1].replace('}' , '')}`})
                
                }
                else
                {
                
                    res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})
                }
                
                    })
                }
            })
        }

    })

}

exports.addAddress =(req,res)=>{
    const {u_id, Addresses} = req.body;

    UserSchema.updateOne({_id : u_id }, {$set : { all_addresses : Addresses }}).then((data2)=>{

        if(data2.modifiedCount == 1)
        {
            res.status(200).send({status :  200 , message : "Updated Successfully"})
        }
        else
        {
            res.status(400).send({status :  400 , message : " Not Updated Successfully"})

        }

    
    }).catch((err)=>{
        res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})
    })
}

exports.getUserAddresses = (req,res)=>{

    const {u_id} = req.query;

    UserSchema.find({_id : u_id}).then((result1)=>{
        if(result1.length > 0)
        {
            if(result1[0].hasOwnProperty('all_addresses') && Array.isArray(result1[0]['all_addresses'].length > 0))
            {
                res.status(200).send({status : 200 , message : "address found",data : result1[0]['all_addresses'] })
            }
            else
            {
                res.status(400).send({status : 400 ,message : "No Address Found"})

            }
        }
        else
        {
            res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})
        }
    }).catch((err)=>{
        res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})
    })

}





exports.updateCartQuantity = (req,res) => {
    var {c_id , type} = req.body;

    CartSchema.find({_id : c_id}).then((data1)=>{

        if(data1.length > 0)
        {
            if (type == "INCRE")
            {
            CartSchema.updateOne({_id : c_id }, {$set : { quantity : data1[0].quantity  + 1 }}).then((data2)=>{

                if(data2.modifiedCount == 1)
                {
                    res.status(200).send({status :  200 , message : "Product Updated Successfully"})
                }
                else
                {
                    res.status(400).send({status :  400 , message : "Product Not Updated Successfully"})

                }

            
            }).catch((err)=>{
                res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})
            })

        }
        else
        {
            if(type == "DECRE" && data1[0].quantity > 1)
            {
            
            CartSchema.updateOne({_id : c_id }, {$set : { quantity : data1[0].quantity  - 1 }}).then((data2)=>{

                if(data2.modifiedCount == 1)
                {
                    res.status(200).send({status :  200 , message : "Product Updated Successfully"})
                }
                else
                {
                    res.status(400).send({status :  400 , message : "Product Not Updated Successfully"})

                }

            
            }).catch((err)=>{
                res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})
            })
        }
        else
        {
            CartSchema.deleteOne({_id : c_id}).then((data3)=>{
                console.log(data3)
                if(data3.deletedCount == 1){
                    res.status(200).send({status :  200 , message : "Product Removed Successfully"})
                }
                else
                {
                    res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})
                }
            }).catch((err)=>{
                res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})
            
            })
            
            
        }
        
        }
        }
        else
        {
        res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})
        
        }

    }).catch((err)=>{
        res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})
    
    })


}

exports.addToCart = (req,res)=>{
    const {u_id, p_id, quantity } = req.body;
    
    CartSchema.insertMany({u_id : u_id ,p_id : p_id, quantity : quantity}).then((result)=>{
        if(result.length > 0)
        {
        res.status(200).send({status :  200 , message : "Product Added Into Cart"})
        }
        else
        {
        res.status(400).send({status :  400 , message : "Product Not Added Into Cart|| try again"})
        }
    }).catch((err)=>{
        res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})
    
    })

}

async function getProductFromID(id){

    var pd = await ProductSchema.find({_id : id});
    console.log("PD",pd)
    return pd[0]
}

exports.getCartProducts = (req,res) =>{
    const {u_id} =req.query;
    CartSchema.find({u_id : u_id}).then((c_result)=>{
        var cart_arr = c_result;
        

        if(cart_arr.length > 0)
        {
            ProductSchema.find({}).then((pr_res)=>{
                var new_data =[]
                if(pr_res.length > 0)
                {
                    
                    for(let i = 0; i < c_result.length ; i++)
                    {
                        for(let j = 0; j< pr_res.length ; j++ )
                        {
                            if(c_result[i].p_id == pr_res[j]._id)
                            {
                                
                                new_data.push({...c_result[i]._doc , pro_data : pr_res[j]})
                                
                            }
                        }
                    }

                    res.status(200).send({status :  200 , data : new_data, count : cart_arr.length ,message: "Something Went Wrong !! Please Try Again"})
            }
            else
            {
                res.status(200).send({status :  200 , data : [], count : 0 ,message: "Products In Cart"})
            }            
            
        }).catch((err)=>{
            res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})
        })
        }
        else
        {
            res.status(200).send({status :  200 , data : [], count : 0 ,message: "Products In Cart"})
        }

    }).catch((err)=>{
        res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})
    })
}

exports.getCartCountByUserID = (req,res)=>{
    console.log(req.query)
    const {u_id} =req.query
    
    CartSchema.find({u_id : u_id }).then((result)=>{
        if(result.length > 0)
        {
        res.status(200).send({status :  200 , data : result, count : result.length , message : "Product Added Into Cart"})
        }
        else
        {
        res.status(200).send({status :  200 , data : result, count : result.length, message : "Product Not Added Into Cart|| try again"})
        }
    }).catch((err)=>{
        res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})
    
    })


}

exports.addProduct = (req,res)=>{
const{p_name, price, image, category, discount} = req.body;

ProductSchema.insertMany({p_name : p_name,price : price, image : image, category : category, discount : discount}).then((result)=>{
    if(result.length > 0)
    {
    res.status(200).send({status :  200 , message : "Product Added Successfull"})
    }
    else
    {
    res.status(400).send({status :  400 , message : "Product not Added || try again"})
    }
}).catch((err)=>{
    res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})

})


}

exports.getAllProducts = (req,res)=>{

    ProductSchema.find({}).then((result)=>{
        res.status(200).send({satus : 200 , data : result})
    }).catch((err)=>{

        res.status(500).send({status : 500 , data : []})

    })
}